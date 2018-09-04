'use strict';

const HashMap = require('./hashmap');

const main = () => {
  const lor = new HashMap();
  
  lor.set('Hobbit', 'Bilbo');
  lor.set('Hobbit', 'Frodo');
  lor.set('Wizard', 'Gandolf');
  lor.set('Human', 'Aragon');
  lor.set('Elf', 'Legolas');
  lor.set('Maiar', 'The Necromancer');
  lor.set('Maiar', 'Sauron');
  lor.set('RingBearer', 'Gollum');
  lor.set('LadyOfLight', 'Galadriel');
  lor.set('HalfElven', 'Arwen');
  lor.set('Ent', 'Treebeard');
  

  console.log(lor.get('Hobbit'));
  // console.log(lor);
};

// main();



/* --------------- Palindrome Permutation Drill ----------------- */

const permPalin = str => {
  const alphaHash = new HashMap(26);
  const palinReq = str.length % 2;
  let odd = 0;
  let count;
  for (let i=0; i < str.length; i++) {
    try {
      count = alphaHash.get(str[i]);
    } catch(e) { 
      count = 0;
    }
    count ++;
    // odd in the first for
    if (count % 2 === 0) {
      odd --;
    } else {
      odd ++;
    }
    // end of addin
    alphaHash.set(str[i], count);
  }
  
  let oddCount=0;
  for (const slot of alphaHash._slots) {
    // I am cheating :(
    slot ? oddCount += slot.value % 2 : '';
  }

  // console.log(alphaHash);

  if (palinReq === 0) {
    return odd === 0;
  } else {
    return odd === 1;
  }

};

// console.log(permPalin('acecarree'));
// console.log(permPalin('test'));
// console.log(permPalin('aaa'));






/* --------------- Anagram Grouping Drill ----------------- */

//input: array of strings
// ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']

//output: array of arrays of strings
// [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']]


//HASH:
// {
//   'aest': ['east', 'teas', ...],
//   'acrs': ['cars', 'acre', ...]
// }

//for east --> aest,  hashmap.get('aest'), push into solution, hashmap.remove('aest')

// {
//   'e': true,
//   'a': true,
//   's': true,
//   't': true
// }

//input: east  OR  teas
//output: aest
// function sameWord(str1, str2){
//   if(str1.length !== str2.length){
//     return false;
//   }  

//   let counter = 0;
//   let same = true; //eatts  eatss
//   while(counter < str1.length && same){
//     if(!str2.includes(str1[counter])){
//       same = false;
//     }

//     counter++;
//   }

//   return same;
// }


  //'eats'
// function abcOrder(str){
//   let arrangedWord = '';
//   for(let i = 0; i < str.length; i++){
//     let letter = str[i];
//     if (arrangedWord[0] > letter){
//       arrangedWord = letter + arrangedWord;
//     } else if (arrangedWord[arrangedWord.length] < letter){

//     }
//     for(let j = 0; j < arrangedWord.length; j++){
//       if(letter >= arrangedWord[j] && letter < arrangedWord[j+1]){
//         arrangedWord = arrangedWord.splice(0, j) + letter + arrangedWord.splice(j, arrangedWord.length);
//       }
//     }
//   }

  // const wordHash = new HashMap(26);

  // for (let i=0; i < str.length; i++) {
  //   let count;
  //   try {
  //     count = wordHash.get(str[i]);
  //   } catch(e){
  //     count = 0;
  //   }
  //   count += 1;

  //   wordHash.set(str[i], count);
  // }

  // console.log(wordHash);

function sort(str){
  return str.split('').sort().join('');
}

function anagramGrouping(wordArr){
  const anagramHash = new HashMap();

  for(let i = 0; i < wordArr.length; i++){
    const sorted = sort(wordArr[i]);
    try {
      //if it's in there already
      const anagramArray = anagramHash.get(sorted);
      anagramHash.set(sorted, [...anagramArray, wordArr[i]]);
    } catch (e) {
      //not in there yet
      anagramHash.set(sorted, [wordArr[i]])
    }
  }
  //for east --> aest,  hashmap.get('aest'), push into solution, hashmap.remove('aest')


  console.log(anagramHash.get('acer'));
  console.log(anagramHash.get('aest'));
  console.log(anagramHash.get('acrs'));
}

anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']);
