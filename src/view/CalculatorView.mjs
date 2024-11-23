export default class CalculatorView {
    constructor() {
      this.config = {
        fontSize: "40px",
        textAlign: "center",
        errorColor: "red",
        resultColor: "green",
      };
    }
  
    getHtml(res, isError) {
      const { fontSize, textAlign, errorColor, resultColor } = this.config;
      return `<label style="font-size:${fontSize}; display:block; text-align:${textAlign}; color:${
        isError ? errorColor : resultColor
      }">${res}</label>`;
    }
  }
  