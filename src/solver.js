const memoize = require("./memoize");
const { min } = Math;

/**
 * 2つの0以上の整数i, jに対して整数を返す関数fによって定義される集合。
 * ただし、fはi,jに対して単調増加とする。
 */
class Set {
  constructor(f) {
    this.f = f;
    this.includes = memoize(this.includes.bind(this));
  }

  /** 整数 k が集合に包含されているかを判定する。 */
  includes(k) {
    for (let i = 0; ; i += 1) {
      let j = 0;
      const y0 = this.f(i, j);
      if (y0 > k) {
        break;
      } else if (y0 === k) {
        return true;
      }
      for (j = 1; ; j += 1) {
        const yj = this.f(i, j);
        if (yj > k) {
          break;
        } else if (yj === k) {
          return true;
        }
      }
    }
    return false;
  }
}

/** 条件 criteria を満たす最小の整数を探索する。 */
function minimumNumberThatSatisfies(criteria) {
  for (let i = 1; ; i += 1) {
    if (criteria(i)) {
      return i;
    }
  }
}

/** [start, end] の範囲の数がいずれも述語関数predを満たすかどうかを判定する。 */
function all(start, end, pred) {
  for (let i = start; i <= end; i += 1) {
    if (!pred(i)) {
      return false;
    }
  }
  return true;
}

/** 0より大きい2つの整数n, m に対し、その倍数の和で表せない最大の整数を求める。*/
function solve(n, m) {
  /* nの倍数とmの倍数の和で表される整数の集合Sを定義する */
  const S = new Set((i, j) => n * i + m * j);
  /* 求める数 k は、
   * k <- S
   * k + i <-S (1 <= i <= n, m)
   * であるような最小の整数である。*/
  const isInS = k => S.includes(k);
  const criteria = k => !isInS(k) && all(k + 1, k + min(n, m), isInS);
  const solution = minimumNumberThatSatisfies(criteria);
  return solution;
}

module.exports = solve;
