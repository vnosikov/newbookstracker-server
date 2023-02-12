const B1 = {
  id: 'b1',
  authors: [{
    ru: 'Джеймс Скотт',
    en: 'James Scott',
  }],
  title: {
    ru: 'Глазами государства',
    en: 'Seeing like a state',
  },
  mainLang: 'en',
  refsNumber: 2,
  read: true,
  marked: true,
};
const B2 = {
  id: 'b2',
  authors: [{
    ru: null,
    en: 'Theodore M. Porter',
  }],
  title: {
    ru: null,
    en: 'Trust in Numbers',
  },
  mainLang: 'en',
  refsNumber: 1,
  read: false,
  marked: false,
};
const B3 = {
  id: 'b3',
  authors: [{
    ru: 'Владимир Ленин',
    en: 'Vladimir Lenin',
  }],
  title: {
    ru: 'Государство и революция',
    en: 'The State and Revolution',
  },
  mainLang: 'ru',
  refsNumber: 3,
  read: true,
  marked: false,
};
const B4 = {
  id: 'b4',
  authors: [{
    ru: 'Дмитрий Травин',
    en: null,
  }],
  title: {
    ru: 'Почему Россия отстала',
    en: null,
  },
  mainLang: 'ru',
  refsNumber: 0,
  read: false,
  marked: false,
};

const mocks = {
  Query: () => ({
    // books: [B1, B2, B3, B4],
    books: [...new Array(4)],
  }),
  Book: () => B1,
};

module.exports = mocks;
