export function ValueType() {
  "null" | "number";
}

export function RuntimeVal() {
  return {
    type: "ValueType",
  };
}

export function NullVal() {
  return {
    type: "null",
    value: "null",
  };
}

export function NumberVal(value) {
  return {
    type: "number",
    value,
  };
}

// export function NullVal() {
//   return {
//     type: "null",
//     value: null,
//   };
// }

export function MK_NULL() {
  return NullVal;
  // return { type: "null", value: null };
}

export function BooleanVal(value) {
  return {
    type: "boolean",
    value,
  };
}

export function MK_BOOL(b = true) {
  return BooleanVal(b)
  //  return { type: "boolean", value: b };
}
