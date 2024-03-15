import { centralPointLat, centralPointLng } from './map.js';
import { Prices, RERENDER_DELAY, FilterType } from './constants.js';
import { debounce } from './utils.js';

const mapFilters = document.querySelector('.map__filters');
const housingFeatures = mapFilters.querySelectorAll('.map__checkbox');

const filteredAds = [];
const selectedFilters = {
  features: []
};

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


const getFeatures = () => Array.from(housingFeatures).
  reduce((acc, item) => item.checked ? [...acc, item.value] : acc, []);

const changeSelectedFilters = (filterName, value) => {
  if (filterName === 'features') {
    selectedFilters.features.length = 0;
    selectedFilters.features.push(...getFeatures());
  } else {
    selectedFilters[filterName] = value;
  }
};

const getPriceFork = (pricesArray, value) => pricesArray.find((priceFork) => priceFork.id === value);


const ispriceFork = (priceId, price) => {
  const priceObject = getPriceFork(Prices, priceId);
  return price < priceObject.max && price >= priceObject.min;
};


const filter = {
  [FilterType.type]: (ads) => ads.filter((ad) => selectedFilters[FilterType.type] !== 'any' ? ad.offer.type === selectedFilters[FilterType.type] : ad),

  [FilterType.price]: (ads) => ads.filter((ad) => selectedFilters[FilterType.price] !== 'any' ? ispriceFork(selectedFilters[FilterType.price], ad.offer.price) : ad),

  [FilterType.rooms]: (ads) => ads.filter((ad) => selectedFilters[FilterType.rooms] !== 'any' ? ad.offer.rooms === parseInt(selectedFilters[FilterType.rooms], 10) : ad),

  [FilterType.guests]: (ads) => ads.filter((ad) => selectedFilters[FilterType.guests] !== 'any' ? ad.offer.guests === parseInt(selectedFilters[FilterType.rooms], 10) : ad),

  [FilterType.features]: (ads) => selectedFilters[FilterType.features].length
    ? selectedFilters[FilterType.features].reduce((acc, item) => acc.filter((ad) => ad.offer.features?.includes(item)), ads)
    : ads,
};

const resetfilteredAds = (ads) => {
  filteredAds.length = 0;
  filteredAds.push(...ads);
};

const filterPoints = () => Object.keys(selectedFilters)
  .reduce((acc, item) => filter[item](acc), filteredAds);

// mapFilters.addEventListener('change', debounce((e) => {
//   changeSelectedFilters(e.target.name, e.target.value);
//   showAdsMarkers(filterPoints());
// }, RERENDER_DELAY));

// const getFilteredAds = (ads) => {
//   resetfilteredAds(ads);
//   showAdsMarkers(filterPoints());
//   setMainMarkerMoveend(debounce(
//     () => showAdsMarkers(filterPoints()),
//     RERENDER_DELAY
//   ));
// };


const getFilteredAds = (ads) => {
  resetfilteredAds(ads);
  const filteredAdsFragment = [];
  filteredAdsFragment.push(...filterPoints());
  filteredAds.length = 0;
  filteredAds.push(...filteredAdsFragment);
};

const getFilteredData = (ads, createMainMarker, createAdsMarker) => {
  resetfilteredAds(ads);
  createAdsMarker(filteredAds);
  createMainMarker(() => createAdsMarker(filteredAds));

  mapFilters.addEventListener('change', debounce((e) => {
    changeSelectedFilters(e.target.name, e.target.value);
    getFilteredAds(ads);
    createAdsMarker(filteredAds);
  }, RERENDER_DELAY));
};

export { compareMarkers, getFilteredData };
