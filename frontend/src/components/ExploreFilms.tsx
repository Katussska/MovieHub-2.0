import { useEffect, useState } from 'react';
import { Film } from '../types';
import FilmContainer from './FilmContainer';
import { fetchFilms } from '../services/fetchFilms';
import { useParams } from 'react-router';

const ExploreFilms = () => {
  const { name } = useParams<{ name: string }>();
  const [data, setData] = useState<Array<Film>>([]);

  useEffect(() => {
    const getData = async () => setData(await fetchFilms(`/films/${name}`));
    void getData();
  }, [name]);

  return <FilmContainer films={data} />;
};

export default ExploreFilms;
