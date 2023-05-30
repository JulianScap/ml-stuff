function max(array) {
  return array.reduce((max, current) => {
    if (typeof max === 'undefined' || current > max) {
      return current;
    } else {
      return max;
    }
  });
}

function sum(array) {
  return array.reduce((sum, current) => sum + current, 0);
}

function mean(array) {
  return sum(array) / array.length;
}

function randomEntry(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

function diff(array) {
  const result = [];
  if (array.length <= 1) {
    return result;
  }

  for (let index = 0; index < array.length - 1; index++) {
    const element1 = array[index];
    const element2 = array[index + 1];
    result.push(Math.abs(element1 - element2));
  }

  return result;
}

export { max, diff, sum, mean, randomEntry };
