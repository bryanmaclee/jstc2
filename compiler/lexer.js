// possibly useless////////////////////

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

////////////////////////////////

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
    tokens.push(new Token(val, tok));
  }

  while (itter < src.length) {
    const char = c();
    if (char === "(") {
      addAndInc(char, "OpenParen");
    } else if (char === ")") {
      addAndInc(char, "CloseParen");
    } else if (
      char === "+" ||
      char === "-" ||
      char === "*" ||
      char === "/" ||
      char === "%"
    ) {
      addAndInc(char, "BinaryOperator");
    } else if (char === "=") {
      addAndInc(char, "Equals");
    } else if (char === ".") {
      addAndInc(".", "Dot");
    } else {
      if (isNum(char)) {
        let num = char;
        itter++;
        while (itter < src.length && (isNum(c()) || c() === '.')) {
          num = num + c();
          itter++;
        }
        console.log(`the nume is ${num}`)
        add(num, "Number");
      } else if (isAlpha(c())) {
        let str = char;
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
      } else if (skippable(char)) {
        itter++;
      } else {
        console.log(
          `unrecognized character: ${char} found in source at position: ${itter}`
        );
        return tokens;
      }
    }
  }
  add("EOF", 'EOF')
  console.log(tokens)
  return tokens;
}

// const testFile = "test.txt"
// console.log(tokenize("+ - * / 123 = alpha"));
// console.log(tokenize("alph"));
// console.log(/[a-zA-Z0-9_$]/.test(" "));
// const source = await Bun.file(testFile).text();
// for (const token of tokenize(source)) {
//   console.log(token);
// }
