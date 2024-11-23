import http from "node:http";
import CalculatorService from "./service/CalculatorService.mjs";
import { operations } from "./config/operations.mjs";
import CalculatorView from "./view/CalculatorView.mjs";

const server = http.createServer();
const PORT = 3500;

server.listen(PORT, () =>
  console.log(`Server is listening on port ${server.address().port}`)
);

new CalculatorService(server, operations);
const view = new CalculatorView();

server.on("request", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const error = validateRequest(req.url);
  if (error) {
    res.end(view.getHtml(error, true));
    return;
  }

  const [operation, operands] = parseRequest(req.url);
  server.emit(operation, operands, res);
});

function validateRequest(url) {
  const urlTokens = url.split("/");
  const operation = urlTokens[1];

  if (!operations.has(operation)) {
    return `Method "${operation}" is not supported`;
  }

  const operands = getOperands(urlTokens);
  if (!operands) {
    return "Invalid operands";
  }

  if (operation === "divide" && operands[1] === 0) {
    return "Division by zero is not allowed";
  }

  return "";
}

function parseRequest(url) {
  const urlTokens = url.split("/");
  const operation = urlTokens[1];
  const operands = getOperands(urlTokens);
  return [operation, operands];
}

function getOperands(urlTokens) {
  const op1 = parseFloat(urlTokens[2]);
  const op2 = parseFloat(urlTokens[3]);
  if (!isNaN(op1) && !isNaN(op2)) {
    return [op1, op2];
  }
  return null;
}
