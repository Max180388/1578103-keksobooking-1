const range = document.querySelector('.ad-form__slider');
const valuePrice = document.querySelector('#price');

noUiSlider.create(range, {
  range: {
    min: 0,
    max: 100000
  },
  step: 1,
  start: '5000',
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },

});


range.noUiSlider.on('update', () => {
  valuePrice.value = range.noUiSlider.get();
});

valuePrice.addEventListener('change', () => {
  range.noUiSlider.set(valuePrice.value);
});
