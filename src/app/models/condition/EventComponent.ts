import {GenericConditionComponent} from './GenericConditionComponent';
import {EventType} from './EventType';

export class EventComponent extends GenericConditionComponent {
  eventType?: EventType;
  blockType: 'event' = 'event';

}
