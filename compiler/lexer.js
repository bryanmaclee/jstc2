export const TokenType = [
  "Number",
  "Identifier",
  "Equals",
  "OpenParen",
  "CloseParen",
  "BinaryOperator",
  "Let",
  "Dot",
  "Keyword",
  "EOF",
];

const KEYWORDS = {
  let: TokenType.indexOf("Let"),
};

function isAlpha(src) {
  const rx = /[a-zA-Z]/;
  return rx.test(src);
}

function isAlphaNum(src) {
  // const rx = /[a-zA-Z_$][a-zA-Z0-9_$]*/;
  const rx = /[a-zA-Z0-9_$]/;
  return rx.test(src);
}

function isNum(src) {
  // const rx = /[0-9]+(\.[0-9]+)?/;
  const rx = /[0-9]/;
  return rx.test(src);
}

function skippable(str) {
  return str == " " || str == "\n" || str == "\t" || str == "\r";
}

export function Token(value, type) {
  return {
    value,
    type,
  };
}

export function tokenize(src) {
  const tokens = [];
  let itter = 0;

  function c() {
    return src[itter];
  }

  function addAndInc(val, tok) {
    add(val, tok)
    itter++;
  }

  function add(val, tok) {
    tokens.push(new Token(val, TokenType.indexOf(tok)));
  }

  while (itter < src.length) {
    if (c() === "(") {
      addAndInc(c(), "OpenParen");
    } else if (c() === ")") {
      addAndInc(c(), "CloseParen");
    } else if (
      c() === "+" ||
      c() === "-" ||
      c() === "*" ||
      c() === "/" ||
      c() === "%"
    ) {
      addAndInc(c(), "BinaryOperator");
    } else if (c() === "=") {
      addAndInc(c(), "Equals");
    } else if (c() === ".") {
      addAndInc(".", "Dot");
    } else {
      if (isNum(c())) {
        let num = c();
        itter++;
        while (itter < src.length && isNum(c())) {
          num = num + c();
          itter++;
        }
        add(num, "Number");
      } else if (isAlpha(c())) {
        let str = c();
        itter++;
        while (itter < src.length && isAlphaNum(c())) {
          str += c();
          itter++;
        }
        const reserved = KEYWORDS[str];
        if (reserved === undefined) {
          add(str, "Identifier");
        } else {
          add(str, "Keyword");
        }
      } else if (skippable(c())) {
        itter++;
      } else {
        console.log(
          `unrecognized character: ${c()} found in source at position: ${itter}`
        );
        return tokens;
      }
    }
  }
  add("EOF", 'EOF')
  return tokens;
}

// console.log(tokenize("+ - * / 123 = alpha"));
// console.log(tokenize("alph"));
console.log(/[a-zA-Z0-9_$]/.test(" "));
const source = await Deno.readTextFile("test.txt");
for (const token of tokenize(source)) {
  console.log(token);
}
