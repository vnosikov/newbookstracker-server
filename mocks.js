const mocks = {
  Query: () => ({
    books: () => [...new Array(6)],
  }),
  Book: () => ({
    id: () => 'just an id',
    authors: () => [{
      ru: 'Джеймс Скотт',
      en: 'James Scott',
    }],
    title: () => ({
      ru: 'Глазами государства',
      en: 'Seeing like a state',
    }),
    mainLang: () => 'en',
    refsNumber: () => 2,
    read: () => true,
    marked: () => true,
  }),
};

module.exports = mocks;
