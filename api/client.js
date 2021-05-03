import library from '../data/library';

const client = {
  getLibrary: () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(library);
      }, 1000);
    });
  },
};

export default client;
