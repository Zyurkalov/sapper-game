type TCell = { row: number, column: number }

class DefaultCell {
    // private init: boolean = false;
    public flag: null | 'flag' | 'question' = null;
    public isChecked: boolean = false;
    public value: number | 'bomb' | null = null;
    
    getIsChecked () {
        return this.isChecked
    };
    openCell() {
        this.isChecked = true
        return this.isChecked
    };
    getValue () {
        return this.value
    };
    getFlag () {
        if(!this.isChecked) return this.flag
        return null
    };
    changeFlag () {
        if (this.isChecked) return null;
        this.flag = this.flag === null ? 'flag' : this.flag === 'flag' ? 'question' : null;
        return this.flag;
    };
    create(value: typeof this.value) {
        this.value = value
    }
}

export default class Cell extends DefaultCell {
    private fieldSize: TCell;
    private neighbours: TCell[] = []
    private coordinates: TCell;

    constructor(data: TCell, fieldSize: TCell) {
        super()
        this.coordinates = data;
        this.fieldSize = fieldSize;
    }
    
    getCoordinates (): TCell {
        return this.coordinates
    }
    getNeighbours (): TCell[] {
        if(this.neighbours.length > 0) {
            return this.neighbours
        }
        const {row, column} = this.coordinates
        const neighbours: TCell[] = []

        for(let r = row-1; r <= row+1; r++){
            for(let c = column-1; c <= column+1; c++) {
                if(r >= 0 && r < this.fieldSize.row && !(r === row && c === column) && c >= 0 && c <this.fieldSize.column){
                    neighbours.push({row: r, column: c})
                }
            }
        }
        this.neighbours = neighbours
        return this.neighbours
    }
    createBomb() {
        this.create('bomb')
        this.getNeighbours()
    }
    createNumber() {
        const curr = this.getValue()
        curr === null ? this.create(1) : curr !== 'bomb' ? this.create(curr+1) : null;
    }
    copy(): Cell {
        const newCell = new Cell(this.coordinates, this.fieldSize);
        newCell.flag = this.flag
        newCell.isChecked = this.getIsChecked()
        newCell.value = this.value
        newCell.neighbours = [...this.neighbours]
        return newCell;
      }
}