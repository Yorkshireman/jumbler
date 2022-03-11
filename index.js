const form = document.getElementById('form');
const outputContainer = document.getElementById('outputContainer');

const getInnerText = text => {
  return text.substring(1, text.length - 1);
};

const shuffleArray = array => {
  let arr = [...array];
  let counter = arr.length;

  // While there are elements in the arr
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
};

const jumble = originalText => {
  const words = originalText.split(' ');
  const jumbledWords = words.map(word => {
    if (word.length < 5) {
      return word;
    }

    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(word)) {
      return word;
    }

    const innerText = getInnerText(word);
    const arr = innerText.split('');

    let shuffledArray;
    while (true) {
      shuffledArray = shuffleArray(arr);
      if (shuffledArray.join('') !== arr.join('')) {
        break;
      }
    }

    const lastLetter = word.charAt(word.length - 1);
    const result = `${word[0]}${shuffledArray.join('')}${lastLetter}`;
    return result;
  });

  return jumbledWords.join(' ');
};

const onSubmit = e => {
  const inputText = form.querySelector('#inputText').value;
  outputContainer.textContent = jumble(inputText);
  e.preventDefault();
};

form.addEventListener('submit', onSubmit);
