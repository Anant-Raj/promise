class MyPromise {
  static all(promises) {
    let results = []; // to be resolved array of values
    // return a promise
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        resolve([]);
      } else {
        let resolveCount = 0;
        promises.forEach((promise, index) => {
          if (promise instanceof Promise) {
            promise
              .then((value) => {
                results[index] = value;
                resolveCount++;
                if (resolveCount === promises.length) {
                  resolve(results);
                }
              })
              .catch(function (error) {
                reject(error);
              });
          } else {
            results[index] = promise;
            resolveCount++;
            if (resolveCount === promises.length) {
              resolve(results);
            }
          }
        });
      }
    });
  }
}
function getPromise(i) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(i), (15 - i) * 5000);
  });
}
const arr = [];
for (let i = 1; i < 11; i++) {
  arr.push(getPromise(i));
}
function printInOrder(arr) {
  MyPromise.all(arr).then((value) => console.log(value));
}
printInOrder(arr);
