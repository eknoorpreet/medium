class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //Add a 'message' property to the obj
    this.code = errorCode; //Add a code to the obj
  }
}

module.exports = HttpError;
