export function runMiddleware(req, res, fn) {
  return new Promise(async (resolve, reject) => {
    await fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
