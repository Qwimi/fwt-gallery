export interface Image {
  _id: string
  src: string
  webp: string
  src2x: string
  webp2x: string
  original: string
}

export interface MainPainting {
  _id: string
  name: string
  yearOfCreation: string
  image: Image
  artist: string
}

export interface Artist {
  genres: string[]
  _id: string
  name: string
  description: string
  yearsOfLife: string
  __v: number
  mainPainting: MainPainting
}

export interface Painting {
  _id: string
  name: string
  yearOfCreation: string
  image: Image
  artist: string
}

export interface CardInterface {
  id: string
  name: string
  date: string
  image: string | null
}

export interface ArtistPage {
  paintings: Painting[]
  genres: Genre[]
  _id: string
  name: string
  description: string
  yearsOfLife: string
  avatar: Image
  __v: number
  mainPainting: Painting
}

export interface Genre {
  _id: string
  name: string
}
