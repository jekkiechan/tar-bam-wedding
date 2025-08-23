export interface Photo {
  filename: string
  orientation: 'portrait' | 'landscape'
  aspectRatio?: string
}

// Static photo list - update this when adding new photos
// Photos are served from /images/prewedding/
export const preweddingPhotos: Photo[] = [
  { filename: 'photo1.jpg', orientation: 'portrait' },
  { filename: 'photo2.jpg', orientation: 'portrait' },
  { filename: 'photo3.jpg', orientation: 'portrait' },
  { filename: 'photo4.jpg', orientation: 'portrait' },
  { filename: 'photo5.jpg', orientation: 'portrait' },
  { filename: 'photo6.jpg', orientation: 'portrait' },
  { filename: 'photo7.jpg', orientation: 'portrait' },
  { filename: 'photo8.jpg', orientation: 'portrait' },
  // Add new photos here with appropriate orientation
  // For landscape photos, change orientation to 'landscape'
]