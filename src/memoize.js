/** 関数fをメモ化する */
module.exports = function memoize(f) {
  const cache = [];
  return function(k) {
    if (k >= cache.length) {
      for (let i = cache.length; i <= k; i += 1) {
        cache.push(f(i));
      }
    }
    return cache[k];
  };
};
