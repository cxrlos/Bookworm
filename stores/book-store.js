import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import requests from "../api/requests";

class BookStore {
  constructor() {
    makeAutoObservable(this);
  }

  // Observables
  library = {
    0: [],
    2: [],
    3: [],
    4: [],
  };

  // Actions
  getLibrary = async () => {
    try {
      const library = await requests.getLibrary();
      Object.keys(library).forEach((shelf) => {
        shelf.forEach((book) => {
          this.library[shelf].push(book);
        });
      });
    } catch (e) {
      alert(e);
    }
  };
}

export default createContext(new BookStore());
