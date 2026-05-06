import { tokenize } from "../utils/parser";

test("a", () => expect(tokenize("a")).toEqual(["a"]));

test("abc", () => expect(tokenize("abc")).toEqual(["abc"]));

test(" a b  c ", () => expect(tokenize(" a b  c ")).toEqual(["a", "b", "c"]));

test("a=b", () => expect(tokenize("a=b")).toEqual(["a", "=", "b"]));

test("a= b", () => expect(tokenize("a= b")).toEqual(["a", "=", "b"]));

test("a = b", () => expect(tokenize("a = b")).toEqual(["a", "=", "b"]));

test("a  =  b", () => expect(tokenize("a  =  b")).toEqual(["a", "=", "b"]));

test("a == b", () => expect(tokenize("a == b")).toEqual(["a", "=", "=", "b"]));

test("a = = b", () =>
  expect(tokenize("a = = b")).toEqual(["a", "=", "=", "b"]));

test("a=b=c", () =>
  expect(tokenize("a=b=c")).toEqual(["a", "=", "b", "=", "c"]));

test("a= b =c", () =>
  expect(tokenize("a= b =c")).toEqual(["a", "=", "b", "=", "c"]));
