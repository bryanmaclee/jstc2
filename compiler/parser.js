import {
  stmt,
  Program,
  Expr,
  BinaryExpr,
  NumericLiteral,
  Identifier,
  NullLiteral,
  varDeclaration,
  AssignmentExpr,
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
    const program = Program();
    function notEOF() {
      return tokens[it].value !== "EOF";
    }
    while (notEOF()) {
      program.body.push(parseStmt());
    }
    return program;
  }

  function eat() {
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
    switch (at()) {
      case "let":
      case "const":
        return parseVarDeclaration();
      default:
        return parseExpr();
    }
  }

  function parseVarDeclaration() {
    const isConstant = eat().type === "Const";
    const identifier = expect("Identifier", "expected identifier!").value;
    if (at().type === "SemiColon") {
      eat();
      if (isConstant) {
        console.error("must assing value to constant");
      }
      return varDeclaration(false, identifier, undefined);
    }
    expect("Equals", "need an equals here yo");
    const val = parseExpr();
    if (at() === ";") eat();
    return varDeclaration(isConstant, identifier, val);
  }

  function parseExpr() {
    // return parseAdditiveExpr();
    return parseAssignmentExpr();
  }

  function parseAssignmentExpr(){
    const left = parseAdditiveExpr();

    if (at().type === "Equals"){
      eat();
      const value = parseAssignmentExpr();
      // return {value, assigne: left, kind: "AssignmentExpr" }
      return AssignmentExpr(left, value)
    }
    return left;
  }

  function parseAdditiveExpr() {
    let left = parseMultiplicitiveExpr();
    while (at() === "+" || at() === "-") {
      const opperator = eat().value;
      const right = parseMultiplicitiveExpr();
      left = BinaryExpr(opperator, left, right);
    }
    return left;
  }

  function parseMultiplicitiveExpr() {
    let left = parsePrimaryExpr();
    while (at() === "*" || at() === "/" || at() === "%") {
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
