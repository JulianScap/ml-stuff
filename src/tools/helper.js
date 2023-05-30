function getHighestKey(object) {
  let highest;
  for (const key in object) {
    if (!Object.hasOwnProperty.call(object, key)) {
      continue;
    }
    const value = object[key];
    if (!highest || value > object[highest]) {
      highest = key;
    }
  }

  return highest;
}

export { getHighestKey };
