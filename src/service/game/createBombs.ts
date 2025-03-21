
export const createBombs = (row: number, column: number, bombs: number): {r:number, c: number }[] => {
    if(bombs > Math.floor(row * column *0.25)) {
        throw new Error('превышен 25% порог количества бомб на поле')
    }
    const coordinatesBombs = new Set<string>()
    const getRandom = (num: number) => Math.floor(Math.random() * num)
    
    while (coordinatesBombs.size < bombs) {
        const r = getRandom(row);
        const c = getRandom(column);
        const coord = `${r}/${c}`

        if(!coordinatesBombs.has(coord)){
            coordinatesBombs.add(coord)
        }
    }

    return [...coordinatesBombs].map((coords) => {
        const [r, c] = coords.split('/').map(Number)
        return {r, c}
    })
}