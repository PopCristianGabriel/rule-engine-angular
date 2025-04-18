export interface RuleEvaluationResponse {
  passed: RuleResult[];
  failed: RuleResult[];
}

export interface RuleResult {
  ruleId: number;
  ruleName: string;
}
