export function isNUllOrUndefined(value) {
    return value === null || value === undefined;
}

export function dateChecker(date) {
    if (isNUllOrUndefined(date)) throw 'You must provide a date';
    if (typeof date !== 'string') throw 'Date must be a string';
    date = date.trim();
    if (date === "") throw 'You must provide a date';
    let x = date.split('/');
    if (x.length !== 3) throw 'Date must be in the format of MM/DD/YYYY';
    if (x[0].length !== 2 || x[1].length !== 2 || x[2].length !== 4) throw 'Date must be in the format of MM/DD/YYYY';
    if (isNaN(x[0]) || isNaN(x[1]) || isNaN(x[2])) throw 'Date must be in the format of MM/DD/YYYY';
    if (x[0] < 1 || x[0] > 12) throw 'Date must be in the format of MM/DD/YYYY';
    if (x[1] < 1 || x[1] > 31) throw 'Date must be in the format of MM/DD/YYYY';
    if (x[2] < 1900 || x[2] > 2024) throw 'Date must be in the format of MM/DD/YYYY';

}