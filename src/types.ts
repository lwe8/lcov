/**
 * Lcov sections (Keys)
 *
 * {@link https://manpages.debian.org/stretch/lcov/geninfo.1.en.html#FILES}
 */
export type LcovKey =
  | "TN"
  | "SF"
  | "LF"
  | "LH"
  | "DA"
  | "FNF"
  | "FNH"
  | "FN"
  | "FNDA"
  | "BRF"
  | "BRH"
  | "BRDA";

// ==
/**
 * A list of execution counts for each line.
 *
 * [lineNumber, executionCount] or [lineNumber, executionCount, checksum].
 *
 * `DA:<line number>,<execution count>[,<checksum>]`
 */
export interface LinesDa {
  lineNumber: number;
  executionCount: number;
  checksum?: number;
}
/**
 *  FNDA
 *
 * `FNDA:<execution count>,<function name>`
 */
export interface FNDA {
  name: string;
  executionCount: number;
}
/**
 * FN
 *
 * `FN:<line number of function start>,<function name>`
 */
export interface FN {
  name: string;
  lineNumber: number;
}
/**
 * Branch coverage information
 *
 * `Block number` identifies a basic block in the code (a straight-line code sequence with no branches except into the entry and
 *  out of the exit).
 *
 * `Branch number` identifies a specific branch within that block (e.g., the true/false path of an if statement).
 *
 *
 * `BRDA:<line number>,<block number>,<branch number>,<taken>`
 */
export interface BRDA {
  lineNumber: number;
  blockNumber: number;
  branchNumber: number;
  taken: number;
}
export interface LcovFile {
  /**
   * Source file
   *
   * `SF:<absolute path to the source file>`
   */
  sourceFile: {
    path: string;
    name: string;
  };
  /**
   * Coverage of lines for file.
   */
  lines: {
    /**
     * Lines found
     *
     * `LF:<number of instrumented lines>`
     */
    found: number;
    /**
     * Lines hit
     *
     * `LH:<number of lines with a non-zero execution count>`
     */
    hit: number;
    /**
     * Coverage %
     */
    covered: number;

    da?: LinesDa[];
  };
  /**
   * Coverage of functions for file.
   */
  functions: {
    /**
     * Number of functions found
     *
     * `FNF:<number of functions found>`
     */
    found: number;
    /**
     * Number of function hit.
     *
     * `FNH:<number of function hit>`
     */
    hit: number;
    /**
     * Coverage %
     */
    covered: number;

    fnda?: FNDA[];
    fn?: FN[];
  };
  /**
   * Coverage of branches for file.
   */
  branches: {
    /**
     * Number of branches found.
     *
     * `BRF:<number of branches found>`
     */
    found: number;
    /**
     * Number of branches hit.
     *
     * `BRH:<number of branches hit>`
     */
    hit: number;
    /**
     * Coverage %
     */
    covered: number;
    brda?: BRDA[];
  };
}
export interface SuiteCoverage {
  lines: {
    found: number;
    hit: number;
    covered: number;
  };
  functions: {
    found: number;
    hit: number;
    covered: number;
  };
  branches: {
    found: number;
    hit: number;
    covered: number;
  };
}
export interface LcovSuite {
  suiteName: string;
  coverage: SuiteCoverage;
  sourceFiles: LcovFile[];
}
