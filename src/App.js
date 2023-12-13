import RecommendMenu from "./RecommendMenu.js";

export default class App {
  async run() {
		const recommendMenu = new RecommendMenu();
		recommendMenu.start();
  }
}

