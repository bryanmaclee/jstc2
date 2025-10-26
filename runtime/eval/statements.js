// import  { varDeclaration } from "../../compiler/ast";
// import { Environment } from "../environment.js"
import { evaluate } from "../interpreter";

export function eval_program(program, env) {
  let lastEvaluated = { type: "null", value: "null" };
  for (const statement of program.body) {
    lastEvaluated = evaluate(statement, env);
  }
  return lastEvaluated;
}

export function eval_var_declaration(dec, env){
  const value = dec.value ? evaluate(dec.value, env) : {kind: "Null", value: "null"};
  return env.declareVar(dec.identifier, value, dec.constant);
  // return varDeclaration(

  // )  
}