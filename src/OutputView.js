import { Console } from "@woowacourse/mission-utils";
import MENU from "./MENU.js";

const OutputView = {
    printStartMessage() {
        Console.print('점심 메뉴 추천을 시작합니다.\n');
    },

    printError(error) {
        Console.print(error.message);
    },

    printResultMessage() {
        Console.print('메뉴 추천 결과입니다.\n');
    },

    printResult(categorys, coachs, recommendMenu) {
        Console.print('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');
        const categoryList = [];
        categorys.forEach( category => {
            categoryList.push(MENU.CATEGORY[category]);
        })
        Console.print(`[ 카테고리 | ${categoryList.join(' | ')} ]`);
        coachs.forEach( (coach, idx) => {
            Console.print(`[ ${coach} | ${recommendMenu[idx].join(' | ')} ]`);
        });
    },

    printEndMessage() {
        Console.print('\n추천을 완료했습니다.');
    }
}

export default OutputView;
