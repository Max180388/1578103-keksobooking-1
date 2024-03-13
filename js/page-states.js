const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('fieldset');
const mapFilers = document.querySelector('.map__filters');
const mapFilersElements = mapFilers.querySelectorAll('select, fieldset');


const disabledElements = (listElements) => {
  for (const element of listElements) {
    element.setAttribute('disabled', '');
  }
};

const activateElements = (listElements) => {
  for (const element of listElements) {
    element.removeAttribute('disabled');
  }
};

const makePageInactive = () => {
  disabledElements(adFormElements);
  disabledElements(mapFilersElements);
  adForm.classList.add('ad-form--disabled');
  mapFilers.classList.add('map__filters--disabled');
};

const activateMapFilers = () => {
  activateElements(mapFilersElements);
  mapFilers.classList.remove('map__filters--disabled');
};

const activateadForm = () => {
  activateElements(adFormElements);
  adForm.classList.remove('ad-form--disabled');
};

export { makePageInactive, activateMapFilers, activateadForm };
