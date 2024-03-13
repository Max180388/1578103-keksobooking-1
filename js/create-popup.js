import { TypeHousing, FEATURES } from './constants.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const getTypeHousing = (arrayTypes, type) => arrayTypes.find((item) => item.id === type);

const getFeatures = (features, element) => {
  if (!features) {
    element.querySelector('.popup__features').classList.add('hidden');
  } else {
    FEATURES.forEach((item) => {
      if (!features.includes(item)) {
        element.querySelector(`.popup__feature--${item}`).classList.add('hidden');
      }
    });
  }
};

const getPhotos = (photos, element) => {
  const photoContainer = element.querySelector('.popup__photos');
  if (!photos) {
    photoContainer.classList.add('hidden');
  } else {
    const photoFragment = document.createDocumentFragment();
    photos.forEach((url) => {
      const photoElement = element.querySelector('.popup__photo').cloneNode(true);
      photoElement.src = url;
      photoFragment.append(photoElement);
    });
    photoContainer.innerHTML = '';
    photoContainer.append(photoFragment);
  }
};


const getOptionalFields = (value, element, selector) => {
  if (!value) {
    element.querySelector(selector).classList.add('hidden');
  } else {
    element.querySelector(selector).src = value;
  }
};

const createPopup = ({ author, offer }) => {
  const popupElement = cardTemplate.cloneNode(true);
  getOptionalFields(author.avatar, popupElement, '.popup__avatar');
  getOptionalFields(offer.description, popupElement, '.popup__description');
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = offer.address;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = getTypeHousing(TypeHousing, offer.type).type;
  popupElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  getFeatures(offer.features, popupElement);
  getPhotos(offer.photos, popupElement);

  return popupElement;
};


export { createPopup };
