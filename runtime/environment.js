export default function Environment(parent) {
  return {
    parent,
    vars: new Map(),

    declareVar: function (name, val) {
      if (this.vars.has(name)) {
        console.error(`${name} has alreadey been declared`);
        process.exit(1);
      }
      this.vars.set(name,val)
    },
  };
}
