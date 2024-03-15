const DATA_URL = 'https://28.javascript.htmlacademy.pro/keksobooking';
const Route = {
  GET_DATA_URL: '/data',
  POST_DATA_URL: '/'
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const Сoordinates = {
  LAT: 35.681729,
  LNG: 139.753927,
};
const SCALE_MAP = 13;
const MAX_ADS_MARKERS = 10;
const ErrorText = {
  MAP: 'Ошибка загрузки карыты. Попробуйте обновить страницу',
  GET_DATA: 'Ошибка загрузки данных с сервера. Попробуйте обновить страницу',
};
const RERENDER_DELAY = 500;
const TypeHousing = [
  { id: 'flat', type: 'Квартира' },
  { id: 'bungalow', type: 'Бунгало' },
  { id: 'house', type: 'Дом' },
  { id: 'palace', type: 'Дворец' },
  { id: 'hotel', type: 'Отель' },
];

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const Prices = [
  {
    id: 'middle',
    min: 10000,
    max: 50000,
  },
  {
    id: 'low',
    min: 0,
    max: 10000,
  },
  {
    id: 'high',
    min: 50000,
    max: Infinity,
  }
];
const FilterType = {
  type: 'housing-type',
  price: 'housing-price',
  rooms: 'housing-rooms',
  guests: 'housing-guests',
  features: 'features',
};

export {
  DATA_URL,
  Route,
  Method,
  Сoordinates,
  SCALE_MAP,
  MAX_ADS_MARKERS,
  ErrorText,
  RERENDER_DELAY,
  TypeHousing,
  FEATURES,
  Prices,
  FilterType,
};

