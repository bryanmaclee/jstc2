import { Parser } from "./compiler/parser.js";
import { evaluate } from "./runtime/interpreter.js";
import Environment from "./runtime/environment.js";
import { MK_BOOL, MK_NULL } from "./runtime/values.js";

const testFile = "test.txt";
const Prog = "./program.txt";
const lex = "./lexed.txt";
const source = await Bun.file(testFile).text();
repl();

async function repl() {
  // const parser = Parser;
  const env = new Environment();
  const word = process.argv[2];
  env.declareVar("true", MK_BOOL(true), true);
  env.declareVar("false", MK_BOOL(false), true);
  env.declareVar("null", MK_NULL(), true);
  if (word === "test") {
    const program = Parser(source);
    console.log(`the source is: ${source}`);
    console.log(program);
    await Bun.write(Prog, JSON.stringify(program, null, 2));
    const result = evaluate(program);
    console.log(result);
    return;
  }
  while (true) {
    const input = prompt(`> `);
    if (!input || input.includes("exit")) {
      process.exit(1);
      return;
    }

    const program = Parser(input);
    // console.log(program);

    const result = evaluate(program, env);
    console.log("the result is", result);
  }
}
