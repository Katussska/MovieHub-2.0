import FilmContainer from './FilmContainer';
import { fetchFilms } from '../services/fetchFilms';
import { useState } from 'react';
import { Film } from '../types';
import { IonSearchbar } from '@ionic/react';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState<Array<Film>>([]);

  const handleSearch = async (event: CustomEvent) => {
    setSearchValue(event.detail.value);
    const result = await fetchFilms(
      `/films/search?query=${event.detail.value}`,
    );
    setData(result);
  };

  return (
    <>
      <IonSearchbar
        className="search-bar"
        value={searchValue}
        onIonChange={handleSearch}
      />
      <FilmContainer films={data} />
    </>
  );
};

export default Search;
