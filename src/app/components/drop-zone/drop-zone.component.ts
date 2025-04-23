import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GenericConditionComponent} from '../../models/condition/GenericConditionComponent';
import {ConditionBlockComponent} from '../condition-block/condition-block.component';
import {NumberComponent} from '../../models/condition/NumberComponent';
import {EventComponent} from '../../models/condition/EventComponent';
import {LogicalOperatorComponent} from '../../models/condition/LogicalOperatorComponent';
import {CdkDrag, CdkDragEnd, CdkDragExit} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drop-zone',
  standalone: true,
  imports: [CommonModule, ConditionBlockComponent, CdkDrag],
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent {
    components: GenericConditionComponent[] = [];
  isDragOver = false;

  allowDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  dragLeave(event: DragEvent) {
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
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

  getDropZoneClass() {
    return this.isDragOver ? 'drag-over' : 'drag-over-normal';
  }


  onDragEnd(event: CdkDragEnd, index: number) {
    const pointerPosition = event.dropPoint;
    const element = event.source.element.nativeElement as HTMLElement;
    const dropZoneEl = element.closest('.drop-zone');

    if (dropZoneEl instanceof HTMLElement) {
      const isOutside = !this.isInsideElement(dropZoneEl, pointerPosition.x, pointerPosition.y);
      if (isOutside) {
        this.components.splice(index, 1);
      }
    } else {
      // fallback: assume it's outside
      this.components.splice(index, 1);
    }
  }


  isInsideElement(element: HTMLElement, x: number, y: number): boolean {
    const rect = element.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

}
