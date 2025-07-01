export function sleep(timeout: number) {
  return new Promise(function (resolve, reject) {
    try {
      setTimeout(resolve, timeout);
    } catch (error) {
      reject(error);
    }
  });
}
