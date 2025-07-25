import type { LcovFile, LcovKey, LinesDa, FNDA, FN, BRDA } from "./types";
import path from "node:path";
import { toWholeNumber, calCovered } from "./helpers.js";
export const reLcov = /^(TN|SF|LF|LH|FNF|FNH|BRF|BRH|DA|FNDA|BRDA|FN):(.*)$/;

export const createSuiteFile = (str: string) => {
  let r: LcovFile = {
    sourceFile: {
      path: "",
      name: "",
    },
    lines: {
      found: 0,
      hit: 0,
      covered: 0,
      da: [],
    },
    functions: {
      found: 0,
      hit: 0,
      covered: 0,
      fnda: [],
      fn: [],
    },
    branches: {
      found: 0,
      hit: 0,
      covered: 0,
      brda: [],
    },
  };
  let strArr = str.split("\n");
  if (strArr[0].trim().startsWith("TN")) {
    strArr = strArr.slice(1);
  }

  for (const str of strArr) {
    const m = reLcov.exec(str.trim());
    if (m) {
      const lt = m[1] as LcovKey;
      if (lt === "SF") {
        r.sourceFile.path = m[2];
        r.sourceFile.name = path.basename(m[2]);
      }
      // Lines
      else if (lt === "LF") {
        r.lines.found = toWholeNumber(m[2]);
      } else if (lt === "LH") {
        r.lines.hit = toWholeNumber(m[2]);
      } else if (lt === "DA") {
        r.lines.da?.push({
          lineNumber: toWholeNumber(m[2].split(",")[0]),
          executionCount: toWholeNumber(m[2].split(",")[1]),
        } as LinesDa);
      }
      // Functions
      else if (lt === "FNF") {
        r.functions.found = toWholeNumber(m[2]);
      } else if (lt === "FNH") {
        r.functions.hit = toWholeNumber(m[2]);
      } else if (lt === "FN") {
        r.functions.fn?.push({
          name: m[2].split(",")[1],
          lineNumber: toWholeNumber(m[2].split(",")[0]),
        } as FN);
      } else if (lt === "FNDA") {
        r.functions.fnda?.push({
          name: m[2].split(",")[1],
          executionCount: toWholeNumber(m[2].split(",")[0]),
        } as FNDA);
      }
      // Branches
      else if (lt === "BRF") {
        r.branches.found = toWholeNumber(m[2]);
      } else if (lt === "BRH") {
        r.branches.hit = toWholeNumber(m[2]);
      } else if (lt === "BRDA") {
        const aa = m[2].split(",");
        r.branches.brda?.push({
          lineNumber: toWholeNumber(aa[0]),
          blockNumber: toWholeNumber(aa[1]),
          branchNumber: toWholeNumber(aa[2]),
          taken: toWholeNumber(aa[3]),
        } as BRDA);
      }
    } // if match end
  } // for loop end
  r.lines.covered = calCovered(r.lines.found, r.lines.hit);
  r.functions.covered = calCovered(r.functions.found, r.functions.hit);
  r.branches.covered = calCovered(r.branches.found, r.branches.hit);
  return r;
};
