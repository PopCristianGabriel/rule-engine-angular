import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GenericConditionComponent} from '../../models/condition/GenericConditionComponent';
import {ConditionBlockComponent} from '../condition-block/condition-block.component';
import {NumberComponent} from '../../models/condition/NumberComponent';
import {EventComponent} from '../../models/condition/EventComponent';
import {LogicalOperatorComponent} from '../../models/condition/LogicalOperatorComponent';

@Component({
  selector: 'app-drop-zone',
  standalone: true,
  imports: [CommonModule, ConditionBlockComponent],
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent {
  components: GenericConditionComponent[] = [];

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const json = event.dataTransfer?.getData('application/json');
    if (json) {
      const parsed = JSON.parse(json);

      let instance: GenericConditionComponent;

      switch (parsed.type) {
        case 'number':
          instance = Object.assign(new NumberComponent(), parsed);
          break;
        case 'event':
          instance = Object.assign(new EventComponent(), parsed);
          break;
        case 'logical':
          instance = Object.assign(new LogicalOperatorComponent(), parsed);
          break;
        default:
          instance = Object.assign(new EventComponent(), parsed);
      }

      this.components.push(instance);
    }
  }
}
