import { expect, test } from "vitest";
import { testJsEngine_ } from "@/Sample/code";
import { BuildWithMe_ } from "@/Sample/constructor";

const message = "Hello";
const engine = new BuildWithMe_(message);

test("Engine counts executions", () => {
  expect(engine.getCounter()).toBe(0);
  engine.test();
  expect(engine.getCounter()).toBe(1);
  engine.test();
  engine.test();
  console.log("we are in test!");
  expect(engine.getCounter()).toBe(3);
});

test("Engine returns correct message", () => {
  const res = engine.test();
  expect(res.message).toBe(message);
});
