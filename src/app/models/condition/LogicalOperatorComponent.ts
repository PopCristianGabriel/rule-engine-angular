import {GenericConditionComponent} from './GenericConditionComponent';
import {LogicalOperator} from './LogicalOperator';

function isComparisonOperator(operator: LogicalOperator | undefined) {
  return operator && [
    LogicalOperator.EQUALS,
    LogicalOperator.NOT_EQUALS,
    LogicalOperator.GREATER_THAN,
    LogicalOperator.GREATER_THAN_OR_EQUAL,
    LogicalOperator.LESS_THAN,
    LogicalOperator.LESS_THAN_OR_EQUAL,
  ].includes(operator);}

export class LogicalOperatorComponent extends GenericConditionComponent {
  operator: LogicalOperator | undefined;

  get blockType(): 'logical' | 'comparison' {
    return isComparisonOperator(this.operator) ? 'comparison' : 'logical';
  }
}
