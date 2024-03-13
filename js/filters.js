import { centralPointLat, centralPointLng } from './map.js';
import { Prices } from './constants.js';

const mapFilters = document.querySelector('.map__filters');

const setFilters = {};
let filteredAds = [];

const getMarkerRank = (ad) => {
  let rank = 0;
  rank = rank + Math.abs(centralPointLat - ad.location.lat);
  rank = rank + Math.abs(centralPointLng - ad.location.lng);
  return rank;
};

const compareMarkers = (adA, adB) => {
  const rankA = getMarkerRank(adA);
  const rankB = getMarkerRank(adB);
  return rankA - rankB;
};


const setMapFiltersChange = (cd) => {
  mapFilters.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      if (e.target.checked) {
        setFilters[e.target.id] = e.target.value;
      } else {
        delete setFilters[e.target.id];
      }
    } else {
      if (e.target.value === 'any') {
        delete setFilters[e.target.id];
      } else {
        setFilters[e.target.id] = e.target.value;
      }
    }
    cd();
  });
};

const getPriceFork = (pricesArray, id) => pricesArray.find((priceFork) => priceFork.id === id);

const getFilteredAds = (ads) => {
  filteredAds = ads.slice();
  if ('housing-type' in setFilters) {
    filteredAds = filteredAds.filter((ad) => ad.offer.type === setFilters['housing-type']);
  }// нужно ли записать в константы ключи setFilters?
  if ('housing-price' in setFilters) {
    const priceFork = getPriceFork(Prices, setFilters['housing-price']);
    filteredAds = filteredAds.filter((ad) => ad.offer.price >= priceFork.min && ad.offer.price < priceFork.max);
  }
  if ('housing-rooms' in setFilters) {
    filteredAds = filteredAds.filter((ad) => ad.offer.rooms === parseInt(setFilters['housing-rooms'], 10));
  }
  if ('housing-guests' in setFilters) {
    filteredAds = filteredAds.filter((ad) => ad.offer.rooms === parseInt(setFilters['housing-guests'], 10));
  }
  if ('filter-wifi' in setFilters) {
    filteredAds = filteredAds.filter((ad) => ad.offer.features);
    filteredAds = filteredAds.filter((ad) =>
      ad.offer.features.includes(setFilters['filter-wifi']));
  }
  if ('filter-dishwasher' in setFilters) {
    filteredAds = filteredAds.filter((ad) => ad.offer.features);
    filteredAds = filteredAds.filter((ad) =>
      ad.offer.features.includes(setFilters['filter-dishwasher']));
  }
  if ('filter-parking' in setFilters) {
    filteredAds = filteredAds.filter((ad) => ad.offer.features);
    filteredAds = filteredAds.filter((ad) =>
      ad.offer.features.includes(setFilters['filter-parking']));
  }
  if ('ffilter-washer' in setFilters) {
    filteredAds = filteredAds.filter((ad) => ad.offer.features);
    filteredAds = filteredAds.filter((ad) =>
      ad.offer.features.includes(setFilters['ffilter-washer']));
  }
  if ('filter-elevator' in setFilters) {
    filteredAds = filteredAds.filter((ad) => ad.offer.features);
    filteredAds = filteredAds.filter((ad) =>
      ad.offer.features.includes(setFilters['filter-elevator']));
  }
  if ('filter-conditioner' in setFilters) {
    filteredAds = filteredAds.filter((ad) => ad.offer.features);
    filteredAds = filteredAds.filter((ad) =>
      ad.offer.features.includes(setFilters['filter-conditioner']));
  }
  return filteredAds;
};

export { compareMarkers, setMapFiltersChange, getFilteredAds, filteredAds };
