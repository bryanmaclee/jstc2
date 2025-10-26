export default function Environment(parent) {
  return {
    parent,
    vars: new Map(),
    constants: new Set(),

    declareVar: function (name, val, constant) {
      // console.log(name, val)
      if (this.vars.has(name)) {
        console.error(`${name} has alreadey been declared`);
        process.exit(1);
      }
      this.vars.set(name, val);
      if (constant) this.constants.add(name);
      return val;
    },

    assignVar: function (name, value) {
      const env = this.resolveVar(name);
      if (env.constants.has(name)){
        console.error(`Cannot reasign to variable ${name}`)
        process.exit(1)
      }
      env.vars.set(name, value);
      return value;
    },

    lookupVar: function (name) {
      const env = this.resolveVar(name);
      return env.vars.get(name);
    },
    resolveVar: function (name) {
      if (this.vars.has(name)) return this;
      if (this.parent == undefined) {
        console.error(`cannot resolve ${name}. it is undefined`);
        process.exit(1)
      }
      return this.parent.resolveVar(name);
    },
  };
}
