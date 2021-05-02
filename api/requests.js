import volumes from '../data/volumes';

const requests = {
  getLibrary: () => ({
    0: volumes.map(book => ({
      author: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      id: book.id,
      pageCount: book.volumeInfo.pageCount,
      publisher: book.volumeInfo.publisher,
      shelf: '0',
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
      title: book.volumeInfo.title,
    })),
    2: volumes.map(book => ({
      author: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      id: book.id,
      pageCount: book.volumeInfo.pageCount,
      publisher: book.volumeInfo.publisher,
      shelf: '2',
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
      title: book.volumeInfo.title,
    })),
    3: volumes.map(book => ({
      author: book.volumeInfo.authors,
      currentPage: book.currentPage,
      description: book.volumeInfo.description,
      id: book.id,
      pageCount: book.volumeInfo.pageCount,
      publisher: book.volumeInfo.publisher,
      shelf: '3',
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
      title: book.volumeInfo.title,
    })),
    4: volumes.map(book => ({
      author: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      id: book.id,
      pageCount: book.volumeInfo.pageCount,
      publisher: book.volumeInfo.publisher,
      shelf: '4',
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
      title: book.volumeInfo.title,
    })),
  }),
};

export default requests;
