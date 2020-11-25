function getRandom(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
}

function randArr(arr) {
  let step = 1;

  if (arr.length > step)
    for (let i = 0; i < arr.length; i += step) {
      let to = getRandom(0, arr.length - 1);

      let tmp = arr[to];
      arr[to] = arr[i];
      arr[i] = tmp;
    }

  return arr;
}

export default randArr;
