

const map = document.querySelector('.map');

const createErrorLoad = (errorText) => {
  const errorBanner = document.createElement('div');
  errorBanner.style.zIndex = '50';
  errorBanner.style.position = 'absolute';
  errorBanner.style.left = '0';
  errorBanner.style.bottom = '0';
  errorBanner.style.right = '0';
  errorBanner.style.height = '50px';
  errorBanner.style.padding = '6px';
  errorBanner.style.fontSize = '28px';
  errorBanner.style.textAlign = 'center';
  errorBanner.style.backgroundColor = '#ff8a8a';
  errorBanner.style.color = '#000000';
  errorBanner.textContent = errorText;
  map.append(errorBanner);
};

export { createErrorLoad };
