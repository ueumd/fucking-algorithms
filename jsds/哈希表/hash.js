function hash(h) {
  // This function ensures that hashCodes that differ only by
  // constant multiples at each bit position have a bounded
  // number of collisions (approximately 8 at default load factor).
  h ^= (h >>> 20) ^ (h >>> 12);
  return h ^ (h >>> 7) ^ (h >>> 4);
}

console.log(hash(10))

console.log(hash(12))
