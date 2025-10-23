import {Parser} from "./compiler/parser.js";

const testFile = "test.txt"
const source = await Bun.file(testFile).text();
repl();

function repl() {
  const parser = Parser;

  const word = process.argv[2];
  if (word === 'test'){
    const program = parser.produceAST(source);
    console.log(`the source is: ${source}`)
    console.log(program)
    return
  }
  while (true) {
    const input = prompt(`> `);
    if (!input || input.includes("exit")) {
      process.exit(1);
    }

    const program = parser.produceAST(input);
    console.log(program);
  }
}