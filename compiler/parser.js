import {
  stmt,
  Program,
  Expr,
  BinaryExpr,
  NumericLiteral,
  Identifier,
} from "./ast.js";
import { tokenize, Token, TokenType } from "./lexer.js";

export function Parser(sc) {
  const tokens = tokenize(sc);
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
    return tokens[it - 1].value;
  }

  function at() {
    return tokens[it].value;
  }

  function parseStmt() {
    return parseExpr();
  }

  function parseExpr() {
    return parseAdditiveExpr();
  }

  function parseAdditiveExpr() {
    let left = parsePrimaryExpr();
    // console.log(left);

    while (at() === "+" || at() === "-") {
      // console.log("we are in an additive expr");
      const opperator = eat();
      const right = parsePrimaryExpr();

      left = BinaryExpr(opperator, left, right);
      // left = {
      //   kind: "BinaryExpr",
      //   left,
      //   right,
      //   opperator,
      // }
    }
    return left;
  }

  function parsePrimaryExpr() {
    const tk = tokens[it].type;

    switch (tk) {
      case "Identifier":
        // return { kind: 'Identifier', symbol: eat() };
        return Identifier(eat());
      case "Number":
        return {
          kind: "NumericLiteral",
          value: parseFloat(eat()),
        };
      case "Equals":
        return {
          kind: tk,
          value: eat(),
        };
      case "SemiColon":
        return {
          kind: tk,
          value: eat(),
        };
      // case "BinaryOperator":
      //   return {

      //   }
      case "EOF":
        return {
          kind: "EndOfFile",
          value: eat(),
        };
      default:
        console.error(`parser error: Unexpected token ${eat()}`);
        it = tokens.length;
    }
  }
  
  return produceAST();
}

