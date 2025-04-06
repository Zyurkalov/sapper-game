import type Cell from "@/classes/cell";
import type { Ref } from "vue";

const openCell = (target: Cell, countBombs: Ref<number>) => {
    if (target.getFlag()) {
        target.flag = null;
        ++countBombs.value;
    }
    target.openCell();
};

export default openCell;
