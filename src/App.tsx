import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';
import { Good } from './types/Good';

import { getAll, get5First, getRedGoods } from './api/goods';

enum Load {
  All,
  Five,
  Red,
}

export const App: React.FC = () => {
  const [goodsList, setGoodsList] = useState<Good[]>([]);
  const [selectLoad, setLoad] = useState<Load | null>(null);
  const [loadingMsg, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMessage('');
    setGoodsList([]);

    setTimeout(() => {
      switch (selectLoad) {
        case Load.All:
          getAll()
            .then(goods => setGoodsList(goods))
            .catch(() => setErrorMessage('Failed to load goods.'));
          break;
        case Load.Five:
          get5First()
            .then(goods => setGoodsList(goods))
            .catch(() => setErrorMessage('Failed to load goods.'));
          break;
        case Load.Red:
          getRedGoods()
            .then(goods => setGoodsList(goods))
            .catch(() => setErrorMessage('Failed to load goods.'));
          break;
        default:
          setGoodsList([]);
      }

      if (goodsList.length > 0) {
        setErrorMessage('');
      }

      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectLoad]);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button
        type="button"
        data-cy="all-button"
        onClick={() => {
          setLoad(Load.All);
        }}
      >
        Load all goods
      </button>

      <button
        type="button"
        data-cy="first-five-button"
        onClick={() => {
          setLoad(Load.Five);
        }}
      >
        Load 5 first goods
      </button>

      <button
        type="button"
        data-cy="red-button"
        onClick={() => {
          setLoad(Load.Red);
        }}
      >
        Load red goods
      </button>

      {loadingMsg && <p>Loading...</p>}
      {selectLoad !== null && <GoodsList goods={goodsList} />}
      {errorMessage.length > 0 && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
    </div>
  );
};
