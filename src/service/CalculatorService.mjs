import CalculatorView from "../view/CalculatorView.mjs";

const view = new CalculatorView();

export default class CalculatorService {
  constructor(emitter, operations) {
    operations.forEach((operation, method) => {
      emitter.addListener(method, (operands, response) => {
        const result = operation(operands[0], operands[1]);
        response.end(view.getHtml(result, false));
      });
    });
  }
}
