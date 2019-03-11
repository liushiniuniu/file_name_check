import SecneNavigator from "../../../main/script/module/navigator/ScenNavigator";
import Book from "../../../main/script/Book";
import { Config } from "../../../main/script/configs/Config";
import PrisistRootNodeMng from "../../../main/script/PriseistRootNodeMng";

const {ccclass, property} = cc._decorator;

/**
 * 测试
 */
@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    backBtn: cc.Node = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        PrisistRootNodeMng.add(this.backBtn);
    }

    goScene() {

        let book: Book = new Book();
        book.type = Config.bookNavigator.curType;
        book.bookId = '3B';
        book.classId = 'L1';
        book.unitId = 'U1';
        book.pageId = 0;

        Book.cuBookInfo = book;
        SecneNavigator.push('ipad_main', Book.cuBookInfo);
    }

    // update (dt) {}
}
