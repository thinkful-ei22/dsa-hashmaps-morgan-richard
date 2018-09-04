'use strict';
const LinkedList = require('./linkedList');

class HashMapChain {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
      // return undefined;
    }
    if (this._slots[index].find(key).value.deleted) {
      throw new Error('Key error');
    }
    // console.log(this._slots[index].find(key).value.value);
    return this._slots[index].find(key).value.value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMapChain.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMapChain.SIZE_RATIO);
    }
    

    const index = this._findSlot(key);
    // fixed how length works
    // this._slots[index] === undefined ? this.length++ : null;
    if (this._slots[index]) {
      let oldNode = this._slots[index].find(key);
      if (oldNode) {
        this._slots[index].insertAfter({
          key,
          value,
          deleted: false
        }, oldNode.value);
        this._slots[index].remove(oldNode.value);
      } else {
        this.length++;
        this._slots[index].insertLast({
          key,
          value,
          deleted: false
        });
      }
    } else {
      this.length++;
      let linkedList = new LinkedList();
      linkedList.insertLast({
        key,
        value,
        deleted: false
      });
      this._slots[index] = linkedList;
    }
   
    

    // this.length++;
    
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];

    if (slot === undefined) {
      throw new Error('Key error');
    }
    let currentNode = slot.head;
    while(currentNode) {
      if (currentNode.value.key === key) {
        if (currentNode.value.deleted === true) {
          throw new Error('Key error');
        } else {
          currentNode.value.deleted = true;
        }
      }
      currentNode = currentNode.next;
    }

    // slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMapChain._hashString(key);
    // console.log(key, 'HASH', hash);
    const start = hash % this._capacity;

    return start;
    // console.log(start);

    // for (let i=start; i<start + this._capacity; i++) {
    //   // console.log(i, '----', key);
    //   const index = i % this._capacity;
    //   const slot = this._slots[index];
    //   if (slot === undefined || (slot.key == key && !slot.deleted)) {
    //     return index;
    //   }
    // }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        let currentNode = slot.head;
        while (currentNode) {

          if (!currentNode.value.deleted) {
            this.set(currentNode.value.key, currentNode.value.value);
          }
          currentNode = currentNode.next;
        }
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMapChain.MAX_LOAD_RATIO = 0.9;
HashMapChain.SIZE_RATIO = 3;

module.exports = HashMapChain;