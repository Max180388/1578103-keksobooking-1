import { makePageInactive, activateMapFilers, activateadForm } from './page-states.js';
import { getData } from './api.js';
import { loadingMap, showAdsMarkers, setMainMarkerMoveend } from './map.js';
import { createErrorLoad } from './message.js';
import { ErrorText, RERENDER_DELAY } from './constants.js';
import { setMapFiltersChange, getFilteredAds, filteredAds } from './filters.js';
import { debounce } from './utils.js';

const pageLoading = new Promise((resolve, rejec) => {
  makePageInactive();
  if (loadingMap) {
    activateadForm();
    resolve();
  } else {
    createErrorLoad(ErrorText.MAP);
    rejec();
  }
});

pageLoading
  .then(() => {
    const ads = getData();
    console.log(ads);
    return ads;
  })
  .then((ads) => {
    showAdsMarkers(ads);
    activateMapFilers();
    setMapFiltersChange(debounce(() => {
      getFilteredAds(ads);
      showAdsMarkers(filteredAds);
      setMainMarkerMoveend(debounce(
        () => showAdsMarkers(ads),
        RERENDER_DELAY,
      ));
    }, RERENDER_DELAY,
    ));
    setMainMarkerMoveend(debounce(
      () => showAdsMarkers(ads),
      RERENDER_DELAY,
    ));
  });
