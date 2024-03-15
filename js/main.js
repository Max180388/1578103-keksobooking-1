import { makePageInactive, activateMapFilers, activateadForm } from './page-states.js';
import { getData } from './api.js';
import { loadingMap, showAdsMarkers, setMainMarkerMoveend } from './map.js';
import { createErrorLoad } from './message.js';
import { ErrorText } from './constants.js';
import { getFilteredData } from './filters.js';
import './slider.js';

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
    getData()
      .then((ads) => {
        activateMapFilers();
        getFilteredData(ads, setMainMarkerMoveend, showAdsMarkers);
      });
  });

// pageLoading
// .then(() => {
//   getData()
//     .then((ads) => {
//       activateMapFilers();
//       console.log(filterPoints());
//       getFilteredAds(ads);
//     });
// });
