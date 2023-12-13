import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import ERROR from "./ERROR.js";

class RecommendMenu {

  constructor() {}

  async start() {
    OutputView.printStartMessage();
    const coachs = await this.userCoachInput();
  }

  async userCoachInput() {
    while(true) {
      try {
        const inputCoach = await InputView.readCoach();
        this.validateIsEmpty(inputCoach);
        const coachs = inputCoach.split(',');
        this.validateCoach(coachs);
        return coachs;
      } catch(error) {
        OutputView.printError(error);
      }
    }
  }

  removeWhitespace(input) {
    return input.trim();
  }

  validateIsEmpty(input) {
    if (!input.trim()) {
      throw new Error(ERROR.EMPTY);
    }
  }

  validateNameLength(name) {
    if(name.length < 2 || name.length > 4) {
      throw new Error(ERROR.INVALIDATE_COACH);
    }
  }

  validateCoachLength(coachs) {
    if(coachs.length < 2 || coachs.length > 5) {
      throw new Error(ERROR.INVALIDATE_COACH);
    }
  }

  validateCoach(coachs) {
    this.validateCoachLength(coachs);
    coachs.forEach( coach => {
      this.validateIsEmpty(coach);
      this.removeWhitespace(coach);
      this.validateNameLength(coach);
    })
  }
}

export default RecommendMenu;
