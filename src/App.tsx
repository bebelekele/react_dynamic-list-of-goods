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

  useEffect(() => {
    switch (selectLoad) {
      case Load.All:
        getAll().then(goods => setGoodsList(goods));
        break;
      case Load.Five:
        get5First().then(goods => setGoodsList(goods));
        break;
      case Load.Red:
        getRedGoods().then(goods => setGoodsList(goods));
        break;
      default:
        setGoodsList([]);
    }
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

      {selectLoad !== null && <GoodsList goods={goodsList} />}
    </div>
  );
};
