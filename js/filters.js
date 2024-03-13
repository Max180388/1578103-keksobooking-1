import { centralPointLat, centralPointLng } from './map.js';
import { Price } from './constants.js';

const mapFilters = document.querySelector('.map__filters');

const setFilters = {};


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
  console.log(setFilters)
  console.log(setFilters['housing-type'])
});

const getFilteredAds = (ads) => {
  if ('housing-type' in setFilters) {
    ads.filter((ad) => ad.offer.type === setFilters['housing-type']);
  }// нужно ли записать в константы ключи setFilters?
  if ('housing-price' in setFilters) {

  }

};

export { compareMarkers };
