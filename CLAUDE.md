# Tar & Bam's Wedding Website - Claude Context

## Project Overview

This is a Next.js wedding website for Tar and Bam featuring:
- **Hero section** with couple illustration and wedding details
- **Countdown timer** to the wedding date
- **Timeline** showing wedding day schedule
- **Pre-wedding photo gallery** with swipe functionality
- **Venue information** with location details
- **RSVP functionality** integrated with Google Sheets

## Technical Stack

- **Framework**: Next.js 15+ with TypeScript
- **Styling**: Tailwind CSS 3.4+ with custom color palette
- **Animations**: Framer Motion 12+
- **Gallery**: Swiper 11+ for photo carousel
- **Additional**: Canvas Confetti, React Intersection Observer

## Design System & Conventions

### Color Palette (Brown/Cream Theme)
```css
'paper-cream': '#F6F1EA',    /* Background */
'suit-brown': '#8A6A52',     /* Primary brown */
'hair-brown': '#6B4E3B',     /* Secondary brown */
'deep-brown': '#4A3428',     /* Dark accent */
'mid-brown': '#7A5A42',      /* Medium accent */
'light-brown': '#E6D7CC',    /* Light accent */
```

### Typography
- **Headers**: Playfair Display (serif) - elegant, romantic
- **Body text**: Lato (sans-serif) - clean, readable

### Visual Elements
- Paper texture overlay with subtle diagonal patterns
- Floating flower background (`/images/flowers.png`)
- Rounded cards with custom brown-tinted shadows
- Soft animations with Framer Motion

## Project Structure

```
/app/
  ├── globals.css        # Global styles and font imports
  ├── layout.tsx         # Root layout with metadata
  └── page.tsx           # Main page with all sections

/components/
  ├── Hero.tsx              # Main header with couple names
  ├── Countdown.tsx         # Wedding countdown timer
  ├── Timeline.tsx          # Wedding day schedule
  ├── PreWeddingGallery.tsx # Photo gallery with Swiper
  ├── Venue.tsx            # Location information
  └── RSVP.tsx             # Google Sheets integration

/lib/
  └── photos.ts         # Photo metadata and configuration

/public/images/
  ├── couple_illustration_transparent_clean.png
  ├── flowers.png
  └── prewedding/       # Wedding photos (Git LFS tracked)
```

## Photo Management

- **Storage**: `/public/images/prewedding/` directory
- **Git LFS**: All `.jpg` files in prewedding folders are tracked with Git LFS
- **Configuration**: Photos defined in `/lib/photos.ts`
- **Format**: Optimized JPG files for web display

### Git LFS Setup
```gitattributes
prewedding/** filter=lfs diff=lfs merge=lfs -text
public/images/prewedding/*.jpg filter=lfs diff=lfs merge=lfs -text
```

## RSVP Integration

- Uses Google Sheets as backend (see `RSVP_SETUP.md`)
- Collects: Name, Email, Attendance, Guest Count, Dietary Restrictions, Message
- Form validation and submission handling in `RSVP.tsx`

## Development Commands

```bash
# Development server
npm run dev

# Production build (run before commits)
npm run build

# Linting (run before commits)
npm run lint

# Production server
npm run start
```

## Pre-Commit Checklist

Before making commits, ensure:
1. ✅ `npm run build` completes successfully
2. ✅ `npm run lint` passes without errors
3. ✅ All components render correctly in browser
4. ✅ Photo gallery loads properly
5. ✅ RSVP form submits successfully
6. ✅ Responsive design works on mobile/desktop

## Key Implementation Notes

- **Client-side rendering**: Main page uses `'use client'` directive
- **Image optimization**: Next.js Image component for couple illustration
- **Responsive design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Semantic HTML structure and ARIA labels
- **Performance**: Lazy loading for images and components
- **SEO**: Metadata configured in layout.tsx

## Common Tasks for Claude

1. **Photo updates**: Modify `/lib/photos.ts` and ensure files are in `/public/images/prewedding/`
2. **Content changes**: Update component files for text modifications
3. **Styling adjustments**: Use existing color palette and maintain design consistency
4. **Component additions**: Follow existing pattern with Framer Motion animations
5. **Layout changes**: Respect the card-based design and z-index layering

## Important Files to Check

- `tailwind.config.js` - Color palette and font definitions
- `app/globals.css` - Global styles and font imports
- `components/` - All UI components
- `.gitattributes` - Git LFS configuration
- `RSVP_SETUP.md` - Google Sheets integration guide