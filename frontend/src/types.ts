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
