export type ConditionRequest = SimpleConditionRequest | ComplexConditionRequest;

export interface SimpleConditionRequest {
  type: 'SIMPLE';
  eventType: string;
  operator: string;
  targetValue: number;
  dateRange?: string;
  streakInterval?: string;
  streakLength?: number;
  requiredDistinctIntervals?: number;
}

export interface ComplexConditionRequest {
  type: 'COMPLEX';
  logicalOperator: 'AND' | 'OR';
  left: ConditionRequest;
  right: ConditionRequest;
}
