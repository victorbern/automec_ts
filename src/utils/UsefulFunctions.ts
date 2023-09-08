export function isNumber(valor: string): boolean {
    var er = /^[0-9]+$/;
    return (er.test(valor));
}