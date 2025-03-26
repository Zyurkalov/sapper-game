export const updateTime = (timeValue: number , isContinue: boolean = true) => {
    if(timeValue <= 0 || !isContinue) return 0
    return timeValue - 1
};
export default updateTime