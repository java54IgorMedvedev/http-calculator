export const operations = new Map([
    ['add', (op1, op2) => op1 + op2],
    ['subtract', (op1, op2) => op1 - op2],
    ['multiply', (op1, op2) => op1 * op2],
    ['divide', (op1, op2) => (op2 !== 0 ? op1 / op2 : "Error: division by zero")],
  ]);
  