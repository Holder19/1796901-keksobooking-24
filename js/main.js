const getIntegerFromRange = function (min, max) {
  if (min < 0 || max <= min) {
    getIntegerFromRange('Недопустимое значение диапазона');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getIntegerFromRange(1, 100);

const getFloatFromRange = function (min, max, numberOfDecimalPlaces) {
  if (min < 0 || max <= min) {
    return false;
  }
  const randomNumber = (Math.random() * (max - min + 1)) + min;
  return +randomNumber.toFixed(numberOfDecimalPlaces);
};

getFloatFromRange(0, 1, 3);
