import moreToLove from '../data/moreToLove.js'
const { resultList } = moreToLove


// to display random data on every request
const shuffleArray = (array) => {
  let shuffledArray = array.slice(); 
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};


export const getMoreToLove = (req, res) => {
  let result = shuffleArray(resultList)
  res.json(result);
};


