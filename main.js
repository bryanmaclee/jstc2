import {Parser} from "./compiler/parser.js";

const testFile = "test.txt"
const source = await Bun.file(testFile).text();
repl();

function repl() {
  const parser = Parser;
  // console.log("\nRepl v0.1");

  const word = process.argv[2];
  if (word === 'test'){
    const program = parser.produceAST(source);
    console.log(`the source is: ${source}`)
    console.log(program)
    return
  }
  // Continue Repl Until User Stops Or Types `exit`
  while (true) {
    const input = prompt(`> `);
    // Check for no user input or exit keyword.
    if (!input || input.includes("exit")) {
      process.exit(1);
    }

    // Produce AST From sourc-code
    const program = parser.produceAST(input);
    console.log(program);
  }
}