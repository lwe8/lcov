export const eor = "end_of_record";
const resf = /(?:^|\n)SF:(.+?)(?:\r?\n)/g;
export const reLcov = /^(TN|SF|LF|LH|FNF|FNH|BRF|BRH|DA|FNDA|BRDA):(.*)$/;
export function filterTestFile(str: string) {
  const match = resf.exec(str);
  if (!match || !match[1]) return false;
  return /\/[^\/]*\.test\.[^\/]+$/.test(match[1]);
  //return match;
}
export const roundToOneDes = (n: number): number => {
  return Math.round(n * 10) / 10;
};
export const toWholeNumber = (nstr: string): number => {
  const num = Number(nstr.trim());
  return Number.isFinite(num) ? num : 0;
};
export const initString = (str: string): string[] => {
  let r: string[] = [];
  const stra = str
    .trim()
    .split(eor)
    .filter((i) => i !== "");
  return stra;
};

export const calCovered = (found: number, hit: number) => {
  const aa = (hit / found) * 100;
  return roundToOneDes(aa);
};
