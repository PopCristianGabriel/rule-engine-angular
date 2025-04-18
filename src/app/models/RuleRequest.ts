import {ConditionRequest} from './ConditionRequest';

export interface RuleRequest {
  name: string;
  condition: ConditionRequest;
}
