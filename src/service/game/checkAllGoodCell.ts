const getAllGoodCell = (props: {rows:number, columns:number, maxBombs: number}): number => {
    return props.rows * props.columns - props.maxBombs
}
export default getAllGoodCell