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
    const program = Program();
    let it = 0;
    while (it < tokens.length) {
      program.body.push(parseStmt(it));
    }

    function eat(tk) {
      it++;
      return tokens[it - 1];
    }

    function parseStmt(i) {
      return parseExpr(i);
    }

    function parseExpr(i) {
      return parsePrimaryExpr(i);
    }

    function parsePrimaryExpr(i) {
      const tk = tokens[i].type;

      switch (tk) {
        case 'Identifier':
          return { kind: 'Identifier', symbol: eat().value };
        case "Number":
          return {
            kind: "NumericLiteral",
            value: parseFloat(eat().value),
          };
        case "EOF":
          return {
            kind: "EndOfFile",
            value: eat().value,
          };
        default:
          it = tokens.length;
          console.error(`parser error: Unexpected token ${tokens[i].value}`);
      }
    }
    return program;
  },
};
