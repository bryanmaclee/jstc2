import {
  stmt,
  Program,
  Expr,
  BinaryExpr,
  NumericLiteral,
  Identifier,
} from "./ast.js";
import { tokenize, Token, TokenType } from "./lexer.js";

export const Parser = {
  produceAST(sourceCode) {
    const tokens = tokenize(sourceCode);
    if (tokens[tokens.length-1].type !== `EOF`) return "no file";
    const program = Program();
    let it = 0;
    while (it < tokens.length) {
      program.body.push(parseStmt(it));
    }

    function eat(tk) {
      it++;
      return tokens[it - 1].value;
    }

    function at(tk){
      return tokens[it];
    }

    function parseStmt() {
      return parseExpr();
    }

    function parseExpr() {
      return parsePrimaryExpr();
    }
    
    function parseAdditiveExpr(){
      const left = parsePrimaryExpr()
      while (at() === "+" || at() === "-"){
        const opperator = eat();
        const right = parsePrimaryExpr();
      }
    }

    function parsePrimaryExpr() {
      const tk = tokens[it].type;

      switch (tk) {
        case 'Identifier':
          return { kind: 'Identifier', symbol: eat() };
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
            }
        case "EOF":
          return {
            kind: "EndOfFile",
            value: eat(),
          };
        default:
          it = tokens.length;
          console.error(`parser error: Unexpected token ${eat()}`);
      }
    }
    return program;
  },
};
