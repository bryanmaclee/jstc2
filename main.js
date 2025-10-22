import {Parser} from "./compiler/parser.js";

repl();

function repl() {
  const parser = Parser;
  console.log("\nRepl v0.1");

  const word = process.argv;
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