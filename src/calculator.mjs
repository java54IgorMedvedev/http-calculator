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

  const urlTokens = req.url.split("/");
  const operation = urlTokens[1];
  let html;

  if (!operations.has(operation)) {
    html = view.getHtml(`Method "${operation}" is not supported`, true);
    res.end(html);
  } else {
    const operands = getOperands(urlTokens);
    if (!operands) {
      html = view.getHtml("Invalid operands", true);
      res.end(html);
    } else {
      server.emit(operation, operands, res);
    }
  }
});

function getOperands(urlTokens) {
  const op1 = parseFloat(urlTokens[2]);
  const op2 = parseFloat(urlTokens[3]);
  if (!isNaN(op1) && !isNaN(op2)) {
    return [op1, op2];
  }
  return null;
}
