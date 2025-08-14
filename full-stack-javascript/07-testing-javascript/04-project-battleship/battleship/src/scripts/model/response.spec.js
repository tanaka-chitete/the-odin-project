"use strict";

import { Response } from "./response";

describe("Response", () => {
  describe("constructor()", () => {
    describe("if the message is not a string", () => {
      it("does not construct an object", () => {
        expect(() => new Response(null, {})).toThrow();
        expect(() => new Response(undefined, {})).toThrow();
        expect(() => new Response(true, {})).toThrow();
        expect(() => new Response(false, {})).toThrow();
        expect(() => new Response(1, {})).toThrow();
        expect(() => new Response(1n, {})).toThrow();
        expect(() => new Response(new Symbol(), {})).toThrow();
      });
    });

    describe("if the message is a string", () => {
      it("constructs an object", () => {
        const message = "Start placement, Admiral 1";
        const data = {};
        const response = new Response(message, data);
        expect(response.getMessage()).toBe(message);
        expect(response.getData()).toBe(data);
      });
    });
  });
});
