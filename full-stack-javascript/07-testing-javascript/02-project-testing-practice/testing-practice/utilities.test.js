import { capitalise, reverseString, Calculator } from "./utilities";

describe("capitalise()", () => {
  it(`processes null as ""`, () => expect(capitalise(null)).toBe(""));
  it(`processes "" as ""`, () => expect(capitalise("")).toBe(""));
  it(`processes "a" as "A"`, () => expect(capitalise("a")).toBe("A"));
  it(`processes "A" as "A"`, () => expect(capitalise("A")).toBe("A"));
  it(`processes "anna" as "Anna"`, () =>
    expect(capitalise("anna")).toBe("Anna"));
  it(`processes "Anna" as "Anna"`, () =>
    expect(capitalise("Anna")).toBe("Anna"));
  it(`processes "hello, my name is Anna!" as "Hello, my name is Anna!"`, () =>
    expect(capitalise("hello, my name is Anna!")).toBe(
      "Hello, my name is Anna!"
    ));
});

describe("reverseString()", () => {
  it(`processes null as ""`, () => expect(reverseString(null)).toBe(""));
  it(`processes "" as ""`, () => expect(reverseString("")).toBe(""));
  it(`processes "a" as "a"`, () => expect(reverseString("a")).toBe("a"));
  it(`processes "Anna" as "annA"`, () =>
    expect(reverseString("Anna")).toBe("annA"));
  it(`processes "Hello, my name is Anna! as "!annA si eman ym ,olleH"`, () =>
    expect(reverseString("Hello, my name is Anna!")).toBe(
      "!annA si eman ym ,olleH"
    ));
});

describe("Calculator", () => {
  describe("add()", () => {
    it("adds 0 and 0", () => expect(Calculator.add(0, 0)).toBe(0));
    it("adds 0 and a positive integer", () =>
      expect(Calculator.add(0, 1)).toBe(1));
    it("adds 0 and a negative integer", () =>
      expect(Calculator.add(0, -1)).toBe(-1));

    it("adds a positive integer and 0", () =>
      expect(Calculator.add(1, 0)).toBe(1));
    it("adds a positive integer and a positive integer", () =>
      expect(Calculator.add(1, 1)).toBe(2));
    it("adds a positive integer and a negative integer", () =>
      expect(Calculator.add(1, -1)).toBe(0));

    it("adds a negative integer and 0", () =>
      expect(Calculator.add(-1, 0)).toBe(-1));
    it("adds a negative integer and a positive integer", () =>
      expect(Calculator.add(-1, 1)).toBe(0));
    it("adds a negative integer and a negative integer", () =>
      expect(Calculator.add(-1, -1)).toBe(-2));
  });

  describe("subtract()", () => {
    it("subtracts 0 and 0", () => expect(Calculator.subtract(0, 0)).toBe(0));
    it("subtracts 0 and a positive integer", () =>
      expect(Calculator.subtract(0, 1)).toBe(-1));
    it("subtracts 0 and a negative integer", () =>
      expect(Calculator.subtract(0, -1)).toBe(1));

    it("subtracts a positive integer and 0", () =>
      expect(Calculator.subtract(1, 0)).toBe(1));
    it("subtracts a positive integer and a positive integer", () =>
      expect(Calculator.subtract(1, 1)).toBe(0));
    it("subtracts a positive integer and a negative integer", () =>
      expect(Calculator.subtract(1, -1)).toBe(2));

    it("subtracts a negative integer and 0", () =>
      expect(Calculator.subtract(-1, 0)).toBe(-1));
    it("subtracts a negative integer and a positive integer", () =>
      expect(Calculator.subtract(-1, 1)).toBe(-2));
    it("subtracts a negative integer and a negative integer", () =>
      expect(Calculator.subtract(-1, -1)).toBe(0));
  });

  describe("divide()", () => {
    it("does not divide 0 and 0", () =>
      expect(Calculator.divide(0, 0)).toBeUndefined());
    it("divides 0 and a positive integer", () =>
      expect(Calculator.divide(0, 1)).toBe(0));
    it("divides 0 and a negative integer", () =>
      expect(Calculator.divide(0, -1)).toBe(0));

    it("does not divide a positive integer and 0", () =>
      expect(Calculator.divide(1, 0)).toBeUndefined());
    it("divides a positive integer and a positive integer, returning a positive integer", () =>
      expect(Calculator.divide(1, 1)).toBe(1));
    it("divides a positive integer and a positive integer, returning a positive non-recurring decimal", () =>
      expect(Calculator.divide(1, 2)).toBe(0.5));
    it("divides a positive integer and a positive integer, returning a positive recurring decimal", () =>
      expect(Calculator.divide(1, 3)).toBeCloseTo(0.3, 1));
    it("does not divide a negative integer and 0", () =>
      expect(Calculator.divide(-1, 0)).toBeUndefined());

    it("divides a negative integer and a positive integer, returning a negative integer", () =>
      expect(Calculator.divide(-1, 1)).toBe(-1));
    it("divides a negative integer and a positive integer, returning a negative non-recurring decimal", () =>
      expect(Calculator.divide(-1, 2)).toBe(-0.5));
    it("divides a negative integer and a positive integer, returning a negative recurring decimal", () =>
      expect(Calculator.divide(-1, 3)).toBeCloseTo(-0.3, 1));
  });

  describe("multiply()", () => {
    it("multiplies 0 and 0", () => expect(Calculator.multiply(0, 0)).toBe(0));
    it("multiplies 0 and a positive number", () =>
      expect(Calculator.multiply(0, 1)).toBe(0));
    it("multiplies 0 and a negative number", () =>
      expect(Calculator.multiply(0, -1)).toBe(0));

    it("multiplies a positive number and 0", () =>
      expect(Calculator.multiply(1, 0)).toBe(0));
    it("multiplies a positive number and a positive number", () =>
      expect(Calculator.multiply(2, 3)).toBe(6));
    it("multiplies a positive number and a negative number", () =>
      expect(Calculator.multiply(2, -3)).toBe(-6));

    it("multiplies a negative number and 0", () =>
      expect(Calculator.multiply(-1, 0)).toBe(0));
    it("multiplies a negative number and a positive number", () =>
      expect(Calculator.multiply(-2, 3)).toBe(-6));
    it("multiplies a negative number and a negative number", () =>
      expect(Calculator.multiply(-2, -3)).toBe(6));
  });
});
