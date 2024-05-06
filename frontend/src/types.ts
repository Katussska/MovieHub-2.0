export type Film = {
  filmId: number;
  title: string;
  posterPath: string;
  description: string;
  genres: string[];
};

export type FilmDetail = {
  adult: boolean;
  release: string;
  rating: number;
} & Film;

export type Genre = {
  id: number;
  name: string;
};

export type User = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type Review = {
  username: string;
  content: string;
  date: string;
};
