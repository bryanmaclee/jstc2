// import { NullVal, NumberVal, RuntimeVal } from "./values.js";
// import { BinaryExpr, NumericLiteral, Program, Stmt } from "../frontend/ast.js";
import { eval_program, eval_var_declaration } from "./eval/statements.js";
import {
  eval_assignment,
  eval_binary_expr,
  eval_identifier,
  eval_keyword,
} from "./eval/expressions.js";

export function evaluate(astNode, env) {
  switch (astNode.kind) {
    case "Keyword":
      return eval_keyword(astNode);
    case "Identifier":
      return eval_identifier(astNode, env);
    case "NumericLiteral":
      return {
        value: astNode.value,
        type: "number",
      };
    case "NullLiteral":
      return { value: "null", type: "null" };
    case "AssignmentExpr":
      console.log("we in an assignment expr")
      return eval_assignment(astNode, env);
    case "BinaryExpr":
      return eval_binary_expr(astNode, env);
    case "Program":
      return eval_program(astNode, env);
    case "VarDeclaration":
      return eval_var_declaration(astNode, env);
    default:
      console.error(
        "This AST Node has not yet been setup for interpretation.",
        astNode
      );
      process.exit(0);
  }
}
