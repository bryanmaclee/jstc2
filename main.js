import {Parser} from "./compiler/parser.js";
import { evaluate } from "./runtime/interpreter.js";

const testFile = "test.txt";
const Prog = "./program.txt"
const lex = "./lexed.txt";
const source = await Bun.file(testFile).text();
repl();

async function repl() {
  // const parser = Parser;

  const word = process.argv[2];
  if (word === 'test'){
    const program = Parser(source);
    console.log(`the source is: ${source}`)
    console.log(program)
    await Bun.write(Prog, JSON.stringify(program, null, 2));
    const result = evaluate(program)
    console.log(result);
    return
  }
  while (true) {
    const input = prompt(`> `);
    if (!input || input.includes("exit")) {
      process.exit(1);
      return;
    }

    const program = Parser(input);
    console.log(program);

    const result = evaluate(program)
    console.log(result);
    
  }
}