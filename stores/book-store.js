import { makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';

import requests from '../api/requests';

class BookStore {
  constructor() {
    makeAutoObservable(this);
  }

  library = { 0: [], 2: [], 3: [], 4: [] };
  loading = false;

  getLibrary = async () => {
    try {
      this.loading = true;
      const library = await requests.getLibrary();
      runInAction(() => {
        Object.keys(library).forEach(shelf => {
          library[shelf].forEach(book => {
            this.library[shelf].push(book);
          });
        });
        this.loading = false;
      });
    } catch (e) {
      runInAction(() => {
        this.loading = false;
      });
      alert(e);
    }
  };
}

export default createContext(new BookStore());
