const clearSetInterval = (interval: number | null): null => {
    if (interval) {
        clearInterval(interval);
    }
    return null;
};
export default clearSetInterval;
