import InputView from "./InputView.js";
import OutputView from "./OutputView.js";
import ERROR from "./ERROR.js";
import MENU from "./MENU.js";

class RecommendMenu {
  #coachs;
  #coachsInedibleMenus;

  constructor() {
    this.#coachsInedibleMenus = [];
  }

  async start() {
    OutputView.printStartMessage();
    this.#coachs = await this.userCoachInput();
    this.userInedibleMenuInput();
  }

  async userCoachInput() {
    while (true) {
      try {
        const inputCoach = await InputView.readCoach();
        this.validateIsEmpty(inputCoach);
        const coachs = inputCoach.split(',');
        this.validateCoach(coachs);
        return coachs;
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  async userInedibleMenuInput() {
    const coachIterator = this.#coachs[Symbol.iterator]();
    let result = coachIterator.next();

    while (!result.done) {
      await this.inedibleMenuInput(result.value);
      result = coachIterator.next();
    }
  }

  async inedibleMenuInput(coach) {
    while (true) {
      try {
        const inputInedibleMenu = await InputView.readInedibleMenu(coach);
        return this.validateMenuInput(inputInedibleMenu);       
        //console.log(this.#coachsInedibleMenus);
      } catch (error) {
        OutputView.printError(error);
      }
    }
  }

  validateMenuInput(input) {
    if(this.validateMenuIsEmpty(input)) return;   
    const inedibleMenu = input.split(',');
    this.validateMenuCount(inedibleMenu); // 2개이상인지 확인
    this.validateMenu(inedibleMenu);

    console.log(this.#coachsInedibleMenus);
  }

  validateNotInMenuList(menu) {
    if (!MENU.ALL_MENUS.includes(menu)) {
      throw new Error(ERROR.INVALIDATE_MENU);
    }
  }

  validateMenuCount(menus) {
    if (menus.length > 2) {
      throw new Error(ERROR.INVALIDATE_MENU);
    }
  }

  validateMenuIsEmpty(menu) {
    if (!menu.trim()) {
      this.#coachsInedibleMenus.push([]);
      return true;
    }
    return false;
  }

  validateMenu(menus) {
    if (menus.length === 1) {
      this.validateInedibleMenu(menus[0]);
      this.#coachsInedibleMenus.push([menus]);
      return;
    } 
    if (menus.length === 2) {
      console.log(menus);
      menus.forEach(menu => {
        this.validateIsEmpty(menu);
        this.validateInedibleMenu(menu);
      });
      this.#coachsInedibleMenus.push([menus]);
    }
  }

  validateInedibleMenu(menu) {
    const menuName = this.removeWhitespace(menu);
    this.validateNotInMenuList(menuName);
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
    if (name.length < 2 || name.length > 4) {
      throw new Error(ERROR.INVALIDATE_COACH);
    }
  }

  validateCoachLength(coachs) {
    if (coachs.length < 2 || coachs.length > 5) {
      throw new Error(ERROR.INVALIDATE_COACH);
    }
  }

  validateCoach(coachs) {
    this.validateCoachLength(coachs);
    coachs.forEach(coach => {
      this.validateIsEmpty(coach);
      this.removeWhitespace(coach);
      this.validateNameLength(coach);
    })
  }
}

export default RecommendMenu;
