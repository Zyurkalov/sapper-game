export const getCellValue = (cellValue: number | null | 'bomb') => {
    return typeof cellValue === 'number' ? cellValue : cellValue === 'bomb' ? `★` : ''
}