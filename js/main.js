import { makePageInactive, activateMapFilers, activateadForm } from './page-states.js';
import { getData } from './api.js';
import { loadingMap, showAdsMarkers, setMainMarkerMoveend } from './map.js';
import { createErrorLoad } from './message.js';
import { ErrorText, RERENDER_DELAY } from './constants.js';
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
    console.log(ads.filter((ad) => ad.offer.type === 'bungalow'))
    console.log(ads.filter((ad) => ad.offer.features))
    console.log(ads[2].offer.features.includes('wifi'))
    console.log(ads);
    showAdsMarkers(ads);
    activateMapFilers();
    setMainMarkerMoveend(debounce(
      () => showAdsMarkers(ads),
      RERENDER_DELAY,
    ));

  });
