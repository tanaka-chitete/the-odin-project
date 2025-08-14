export class Response {
  #message;
  #data;

  constructor(message, data) {
    if (!(typeof message === "string")) {
      throw new Error("message must be a string");
    }

    if (data == null || data.constructor.name !== "Object") {
      throw new Error("data must be an object");
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
