import { evaluate } from "../interpreter";

export function eval_numeric_binary_expr(lhs, rhs, operator) {
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

export function eval_binary_expr(binop, env) {
  const lhs = evaluate(binop.left, env);
  const rhs = evaluate(binop.right, env);

  if (lhs.type == "number" && rhs.type == "number") {
    return eval_numeric_binary_expr(lhs, rhs, binop.operator);
  }

  return { type: "null", value: "null" };
}

export function eval_keyword(kw) {
  return kw;
}

export function eval_identifier(id, env) {
  console.log(`evaluating ${id.symbol} in environment ${env}`);
  const val = env.lookupVar(id.symbol);
  return val;
}

export function eval_assignment(node, env){
  if (node.assigne.kind !== 'Identifier'){
    console.error(`invalid assignment ${JSON.stringify(node.assigne)}`)
  }
  const varName = node.assigne.symbol;
  return env.assignVar(varName, evaluate(node.value))
}