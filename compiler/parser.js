import {
  stmt,
  Program,
  Expr,
  BinaryExpr,
  NumericLiteral,
  Identifier,
  NullLiteral,
} from "./ast.js";
import { tokenize, Token, TokenType } from "./lexer.js";

async function writeLex(lex) {
  await Bun.write("./lexed.txt", JSON.stringify(lex, null, 2));
}

export function Parser(sc) {
  const tokens = tokenize(sc);
  writeLex(tokens);
  let it = 0;
  function produceAST() {
    // if (tokens[tokens.length - 1].type !== `EOF`) return "no file";
    const program = Program();
    function notEOF() {
      // console.log("you yo you yo ", tokens[it].value !== "EOF");

      return tokens[it].value !== "EOF";
    }
    while (notEOF()) {
      program.body.push(parseStmt());
    }
    // console.log(program);

    return program;
  }

  function eat() {
    // console.log(tokens[it]);

    it++;
    return tokens[it - 1];
  }

  function at() {
    return tokens[it].value;
  }

  function expect(type, err) {
    const prev = eat();
    if (!prev || prev.type !== type) {
      console.log(err, "got:", prev.value);
      process.exit(1);
    }
    return prev;
  }
  function parseStmt() {
    return parseExpr();
  }

  function parseExpr() {
    return parseAdditiveExpr();
  }

  function parseAdditiveExpr() {
    // let left = parsePrimaryExpr();
    let left = parseMultiplicitiveExpr();
    // console.log(left);

    while (at() === "+" || at() === "-") {
      // console.log("we are in an additive expr");
      const opperator = eat().value;
      const right = parseMultiplicitiveExpr();

      left = BinaryExpr(opperator, left, right);
    }
    return left;
  }

  function parseMultiplicitiveExpr() {
    let left = parsePrimaryExpr();
    // console.log(left);

    while (at() === "*" || at() === "/" || at() === "%") {
      // console.log("we are in an additive expr");
      const opperator = eat().value;
      const right = parsePrimaryExpr();

      left = BinaryExpr(opperator, left, right);
    }
    return left;
  }

  function parsePrimaryExpr() {
    const tk = tokens[it].type;

    switch (tk) {
      case "Identifier":
        return Identifier(eat().value);
      case "Keyword":
        eat();
        return NullLiteral();
      case "Number":
        return NumericLiteral(parseFloat(eat().value));
      case "OpenParen":
        eat().value;
        const value = parseExpr();
        expect("CloseParen", "expected closing parenthase");
        return value;
      case "Equals":
        return {
          kind: tk,
          value: eat().value,
        };
      case "SemiColon":
        return {
          kind: tk,
          value: eat().value,
        };
      default:
        console.error(`parser error: Unexpected token ${eat().value}`);
        it = tokens.length;
        process.exit(1);
    }
  }

  return produceAST();
}
