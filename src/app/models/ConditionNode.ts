export type ConditionNode = SimpleConditionNode | ComplexConditionNode;

export interface SimpleConditionNode {
  type: 'SIMPLE';
  eventType: string;
  operator: string;
  targetValue: number;
  dateRange?: string;
  streakInterval?: string;
  streakLength?: number;
  requiredDistinctIntervals?: number;
}

export interface ComplexConditionNode {
  type: 'COMPLEX';
  logicalOperator: 'AND' | 'OR';
  children: ConditionNode[];
}
