export class Response {
  #message;
  #data;

  constructor(message, data) {
    if (!(typeof message === "string")) {
      throw new Error("name must be a String");
    }

    this.#message = message;
    this.#data = data;
  }

  getMessage() {
    return this.#message;
  }

  getData() {
    return this.#data;
  }
}
