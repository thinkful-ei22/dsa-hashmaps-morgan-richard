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
  let count;
  for (let i=0; i < str.length; i++) {
    try {
      count = alphaHash.get(str[i]);
    } catch(e) { 
      count = 0;
    }
    alphaHash.set(str[i], count+1);
  }
  let oddCount=0;
  // for (let i=0; i < str.length; i++) {
  for (const slot of alphaHash._slots) {
    // oddCount += alphaHash.get(str[i]) % 2;
    slot ? oddCount += slot.value % 2 : '';
  }

  if (palinReq === 0) {
    return oddCount === 0;
  } else {
    return oddCount === 1;
  }

  // console.log(alphaHash);

};

console.log(permPalin('acecarree'));
console.log(permPalin('test'));
console.log(permPalin('aaa'));
