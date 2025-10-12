'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Wish = {
  id: string
  name: string
  message: string
  timestamp?: Date
}

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_ID
const SHEET_TAB = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_TAB ?? 'Sheet1'
const SHEET_RANGE = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_RANGE ?? 'A2:G'

const buildFeedUrl = () => {
  if (!SHEET_ID) return ''
  const params = new URLSearchParams({
    tqx: 'out:json',
    sheet: SHEET_TAB,
    range: SHEET_RANGE,
  })
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?${params.toString()}`
}

const feedUrl = buildFeedUrl()

function parseGvizResponse(text: string) {
  const match = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?/)
  if (!match) {
    throw new Error('Unexpected response format from Google Sheets')
  }

  const payload = JSON.parse(match[1])
  const rows: Wish[] = (payload?.table?.rows ?? [])
    .map((row: { c: Array<{ v: string | null }> }, index: number) => {
      const rawTimestamp = row.c?.[0]?.v
      const rawName = row.c?.[1]?.v
      const rawMessage = row.c?.[6]?.v

      const message = (rawMessage ?? '').toString().trim()
      if (!message) return null

      const name = (rawName ?? '').toString().trim() || 'Anonymous Guest'
      const timestamp = rawTimestamp ? new Date(rawTimestamp) : undefined

      return {
        id: `${rawTimestamp ?? `${index}-${name}`}`,
        name,
        message,
        timestamp: timestamp && !Number.isNaN(timestamp.getTime()) ? timestamp : undefined,
      }
    })
    .filter((wish: Wish | null): wish is Wish => Boolean(wish))

  return rows.sort((a, b) => {
    const aTime = a.timestamp?.getTime() ?? 0
    const bTime = b.timestamp?.getTime() ?? 0
    return bTime - aTime
  })
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
    .padEnd(2, '·')
}

function formatRelativeTime(timestamp?: Date) {
  if (!timestamp) return 'Moments ago'

  const now = Date.now()
  const diff = now - timestamp.getTime()

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) return 'Just now'
  if (diff < hour) {
    const minutes = Math.round(diff / minute)
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  }
  if (diff < day) {
    const hours = Math.round(diff / hour)
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  }
  if (diff < day * 7) {
    const days = Math.round(diff / day)
    return `${days} day${days === 1 ? '' : 's'} ago`
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(timestamp)
}

export default function WeddingWishes() {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const isPausedRef = useRef(isAutoScrollPaused)

  useEffect(() => {
    isPausedRef.current = isAutoScrollPaused
  }, [isAutoScrollPaused])

  useEffect(() => {
    if (!feedUrl) {
      setError('Wedding wishes feed is not configured yet.')
      return
    }

    let isMounted = true

    const fetchWishes = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(feedUrl, { cache: 'no-store' })
        if (!response.ok) {
          throw new Error(`Google Sheets returned ${response.status}`)
        }
        const text = await response.text()
        const parsed = parseGvizResponse(text)
        if (isMounted) {
          setWishes(parsed)
          setError(null)
        }
      } catch (err) {
        console.error('Unable to load wedding wishes:', err)
        if (isMounted) {
          setError('We had trouble loading the latest wishes. Please try again later.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchWishes()

    const handleRefresh = () => fetchWishes()
    window.addEventListener('refresh-wishes', handleRefresh)

    return () => {
      isMounted = false
      window.removeEventListener('refresh-wishes', handleRefresh)
    }
  }, [feedUrl])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    container.scrollTop = 0
  }, [wishes])

  useEffect(() => {
    const container = scrollRef.current
    if (!container || !wishes.length) {
      if (container) {
        container.scrollTop = 0
      }
      return
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReducedMotion) {
      return
    }

    let animationFrame: number | null = null
    let lastTimestamp: number | null = null
    let pendingFraction = 0

    const step = (timestamp: number) => {
      const activeContainer = scrollRef.current
      if (!activeContainer) {
        animationFrame = requestAnimationFrame(step)
        return
      }

      if (isPausedRef.current) {
        lastTimestamp = null
        pendingFraction = 0
        animationFrame = requestAnimationFrame(step)
        return
      }

      if (lastTimestamp !== null) {
        const elapsed = timestamp - lastTimestamp
        const pixelsPerSecond = 24
        const distance = (elapsed / 1000) * pixelsPerSecond + pendingFraction
        const wholePixels = Math.floor(distance)
        pendingFraction = distance - wholePixels

        const maxScrollTop = Math.max(activeContainer.scrollHeight - activeContainer.clientHeight, 0)
        if (maxScrollTop <= 0) {
          activeContainer.scrollTop = 0
        } else if (wholePixels > 0) {
          const wrapAt = maxScrollTop + 1
          const nextTop = (activeContainer.scrollTop + wholePixels) % wrapAt
          activeContainer.scrollTop = nextTop
        }
      }

      lastTimestamp = timestamp
      animationFrame = requestAnimationFrame(step)
    }

    animationFrame = requestAnimationFrame(step)

    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [wishes])

  return (
    <section className="my-14">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mx-auto max-w-2xl"
      >
        {!feedUrl ? (
          <p className="rounded-2xl border border-light-brown/60 bg-paper-cream/60 p-5 text-sm text-mid-brown/80">
            Add your Google Sheet ID to <code className="font-mono text-xs">NEXT_PUBLIC_GOOGLE_SHEETS_ID</code> to display wishes here.
          </p>
        ) : (
          <div className="space-y-4">
            {isLoading && (
              <div className="rounded-2xl border border-light-brown/60 bg-paper-cream/60 p-5 text-sm text-mid-brown/80">
                Loading the latest wishes...
              </div>
            )}

            {error && !isLoading && (
              <div className="rounded-2xl border border-light-brown/60 bg-paper-cream/60 p-5 text-sm text-mid-brown/80">
                {error}
              </div>
            )}

            {!error && !isLoading && wishes.length === 0 && (
              <div className="rounded-2xl border border-light-brown/60 bg-paper-cream/60 p-5 text-sm text-mid-brown/80">
                No wishes yet — be the first to leave a heartfelt note!
              </div>
            )}

            <div
              ref={scrollRef}
              className="max-h-80 overflow-y-auto pr-1"
              tabIndex={0}
              onPointerEnter={() => setIsAutoScrollPaused(true)}
              onPointerLeave={() => setIsAutoScrollPaused(false)}
              onFocus={() => setIsAutoScrollPaused(true)}
              onBlur={() => setIsAutoScrollPaused(false)}
              onTouchStart={() => setIsAutoScrollPaused(true)}
              onTouchEnd={() => setIsAutoScrollPaused(false)}
              onTouchCancel={() => setIsAutoScrollPaused(false)}
            >
              <div className="space-y-4">
                <AnimatePresence>
                  {wishes.map((wish) => (
                    <motion.article
                      key={wish.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-4 rounded-2xl border border-light-brown/60 bg-white/70 p-5 shadow-sm"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-mid-brown text-lg font-semibold text-white">
                        {getInitials(wish.name)}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h3 className="text-base font-semibold text-mid-brown">{wish.name}</h3>
                          <span className="text-xs uppercase tracking-wide text-mid-brown/70">
                            {formatRelativeTime(wish.timestamp)}
                          </span>
                        </div>
                        <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-deep-brown">{wish.message}</p>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}
