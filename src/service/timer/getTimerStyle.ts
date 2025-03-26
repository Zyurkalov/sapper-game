export const getTimerStyle = (timer: number) => {

    if (timer < 60) {
        return {
            style: {
                color: `var(--cell-color-7)`
            }
        }
    }
    return {}
}