import { Console } from "@woowacourse/mission-utils";

const InputView = {
    async readCoach() {
        const input = await Console.readLineAsync('코치의 이름을 입력해 주세요. (, 로 구분)\n');
        return input;
    },

    async readInedibleMenu(name) {
        const input = await Console.readLineAsync(`${name}(이)가 못 먹는 메뉴를 입력해 주세요.\n`);
        return input;
    }
    
}

export default InputView;