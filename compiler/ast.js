export function stmt(nodeType) {
  return nodeType;
}

export function Program() {
  return {
    kind: stmt("Program"),
    body: [],
  };
}

export function Expr() {}

export function BinaryExpr(operator,left, right) {
  return {
    kind: stmt("BinaryExpr"),
    left,
    right,
    operator,
  };
}

export function NullLiteral(){
  return {
    kind: "NullLiteral",
    value: "null",
  }
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
    value,
  }
}