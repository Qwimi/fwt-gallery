// auth

export interface AuthRequest {
  username: string;
  password: string;
  fingerprint: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RefreshRequest {
  fingerprint: string | null;
  refreshToken: string | null;
}

export interface AuthForm {
  emailValue: string;
  passwordValue: string;
}

// paintings

export interface Image {
  _id: string;
  src: string;
  webp: string;
  src2x: string;
  webp2x: string;
  original: string;
}

export interface Painting {
  _id: string;
  name: string;
  yearOfCreation: string;
  image: Image;
  artist: string;
}

export interface PaintingRequestForm {
  name: string;
  yearOfCreation: string;
  image?: File | Image;
}

// artists

export interface Artist {
  genres: string[];
  _id: string;
  name: string;
  description: string;
  yearsOfLife: string;
  __v: number;
  mainPainting: Painting;
}

export interface ArtistPage {
  _id: string;
  paintings: Painting[];
  genres: Genre[];
  name: string;
  description: string;
  yearsOfLife: string;
  avatar: Image;
}

export interface ArtistRequestForm {
  genres: string[];
  name: string;
  description: string;
  yearsOfLife: string;
  avatar?: File | Image;
}

export interface ArtistRequest extends Omit<ArtistRequestForm, 'avatar'> {
  avatar: string | null;
}

// cards

export interface CardInterface {
  id: string;
  name: string;
  date: string;
  image: string | null;
  image2x: string | null;
}

// genres

export interface Genre {
  _id: string;
  name: string;
}
