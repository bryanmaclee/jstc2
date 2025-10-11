export function stmt(nodeType) {
  return nodeType;
}

export function Program(stmt) {
  return {
    kind: stmt("Program"),
    body: [],
  };
}

export function Expr() {}

export function BinaryExpr(operator) {
  return {
    kind: stmt("BinaryExpr"),
    left: Expr(),
    right: Expr(),
    operator,
  };
}

export function Identifier(symbol){
  return {
    kind: "Identifier",
    symbol,
  }
}

export function NumericLiteral(value){
  return {
    kind: "NumericLiteral",
    value
  }
}