import { Console } from "@woowacourse/mission-utils";

const OutputView = {
    printStartMessage() {
        Console.print('점심 메뉴 추천을 시작합니다.\r');
    },

    printError(error) {
        Console.print(error.message);
    }
}

export default OutputView;
