import { makePageInactive, activateMapFilers, activateadForm } from './page-states.js';
import { getData } from './api.js';
import { loadingMap } from './map.js';
import { createErrorLoad } from './message.js';
import { ErrorText } from './constants.js';
import { getFilteredAds, } from './filters.js';

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
        getFilteredAds(ads);
      });
  });
