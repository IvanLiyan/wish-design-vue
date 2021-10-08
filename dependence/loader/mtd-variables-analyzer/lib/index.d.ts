import { CompPropType, ResultType, StringMap } from './type';
export declare function analyzeVariables(path: string, variableMap?: StringMap): Promise<CompPropType>;
export declare function compute(path: string, variableMap?: StringMap): Promise<ResultType>;
