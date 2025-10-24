// import { NullVal, NumberVal, RuntimeVal } from "./values.js";
// import { BinaryExpr, NumericLiteral, Program, Stmt } from "../frontend/ast.js";

function eval_program(program) {
  let lastEvaluated = { type: "null", value: "null" };
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement);
  }
  return lastEvaluated;
}

function eval_numeric_binary_expr(lhs, rhs, operator) {
  let result;
  if (operator == "+") {
    result = lhs.value + rhs.value;
  } else if (operator == "-") {
    result = lhs.value - rhs.value;
  } else if (operator == "*") {
    result = lhs.value * rhs.value;
  } else if (operator == "/") {
    // TODO: Division by zero checks
    result = lhs.value / rhs.value;
  } else {
    result = lhs.value % rhs.value;
  }

  return { value: result, type: "number" };
}

function eval_binary_expr(binop) {
  const lhs = evaluate(binop.left);
  const rhs = evaluate(binop.right);

  if (lhs.type == "number" && rhs.type == "number") {
    return eval_numeric_binary_expr(lhs, rhs, binop.operator);
  }

  return { type: "null", value: "null" };
}

function eval_keyword(kw) {
  return kw;
}

function eval_identifier(id){
  return id;
}

export function evaluate(astNode) {
  switch (astNode.kind) {
    case "Keyword":
      return eval_keyword(astNode);
    case "Identifier":
      return eval_identifier(astNode);
    case "NumericLiteral":
      return {
        value: astNode.value,
        type: "number",
      };
    case "NullLiteral":
      return { value: "null", type: "null" };
    case "BinaryExpr":
      return eval_binary_expr(astNode);
    case "Program":
      return eval_program(astNode);

    default:
      console.error(
        "This AST Node has not yet been setup for interpretation.",
        astNode
      );
      process.exit(0);
  }
}
