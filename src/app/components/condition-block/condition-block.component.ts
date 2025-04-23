import { Component, Input } from '@angular/core';
import { GenericConditionComponent } from '../../models/condition/GenericConditionComponent';
import { NumberComponent } from '../../models/condition/NumberComponent';
import {CommonModule, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {EventComponent} from '../../models/condition/EventComponent';
import {MatCard} from '@angular/material/card';
import {CdkDrag, CdkDragPreview} from '@angular/cdk/drag-drop';
import {ParantheseComponent} from '../../models/condition/ParantheseComponent';


@Component({
  selector: 'app-condition-block',
  standalone: true,
  templateUrl: './condition-block.component.html',
  imports: [
    NgIf,
    CommonModule,
    FormsModule,
    MatInput,
    MatCard,
    MatFormField,
    CdkDrag,
    CdkDragPreview
  ],
  styleUrls: ['./condition-block.component.css']
})
export class ConditionBlockComponent {
  @Input() data!: GenericConditionComponent;

  ngOnInit() {
    if (this.data instanceof NumberComponent) {
      console.log('This is a NumberComponent with value:', this.data.value);
    } else if (this.data instanceof EventComponent) {
      console.log('This is an EventComponent with eventType:', this.data.eventType);
    } else {
      console.log('This is a generic condition component:', this.data.text);
    }
  }

  isNumberComponent(): boolean {
    return this.data instanceof NumberComponent;
  }

  getChildComponent(obj: GenericConditionComponent): NumberComponent {
    return obj as NumberComponent;
  }

  updateValue(event: Event) {
    const input = event.target as HTMLInputElement;
    (this.data as any).value = parseFloat(input.value);
    this.data.text = input.value;
  }

  getBlockClass(): string {
    if (this.data instanceof NumberComponent) return 'number';
    if (this.data instanceof EventComponent) return 'event';
    if (this.data instanceof ParantheseComponent) return 'logical';
    if ((this.data as any).operator !== undefined) return 'logical';
    if ((this.data as any).value !== undefined) return 'comparison';
    return '';
  }
}
