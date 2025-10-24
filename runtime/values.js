export function ValueType(){
 "null" | "number";
} 

export function RuntimeVal() {
  return {
    type: "ValueType",
  }
}

export function NullVal() {
  return{
    type: "null",
    value: "null",
  }
}

export  function NumberVal(value) {
  return {
    type: "number",
    value
  }
}