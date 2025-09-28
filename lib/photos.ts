export interface Photo {
  filename: string
  aspectRatio?: string
}

const TOTAL_PREWEDDING_PHOTOS = 27

// Photos are served from /images/prewedding/
export const preweddingPhotos: Photo[] = Array.from(
  { length: TOTAL_PREWEDDING_PHOTOS },
  (_, index) => ({ filename: `photo${index + 1}.jpg` })
)
