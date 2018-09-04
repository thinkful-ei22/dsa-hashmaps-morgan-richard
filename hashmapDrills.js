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

console.log(permPalin('acecarree'));
console.log(permPalin('test'));
console.log(permPalin('aaa'));
