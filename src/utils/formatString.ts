export const normalizeAnswerString = (origin: string): string => {
    let rst = '';
    for (const x of origin) {
        if (x >= '\u4E00' && x <= '\u9FFF') {
            rst += x;
        } else if (/[0-9]/.test(x)) {
            rst += x;
        } else if (/[a-zA-Z]/.test(x)) {
            rst += x.toUpperCase();
        }
    }
    return rst;
};
