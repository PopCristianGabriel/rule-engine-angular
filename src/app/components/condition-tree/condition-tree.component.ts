import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConditionNode, ComplexConditionNode } from '../../models/ConditionNode';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgClass, NgFor, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-condition-tree',
  templateUrl: './condition-tree.component.html',
  styleUrls: ['./condition-tree.component.css'],
  standalone: true,
  imports: [
    CdkDropList,
    NgForOf,
    NgIf,
    CdkDrag
  ],
})

@Component({
  selector: 'app-condition-tree',
  templateUrl: './condition-tree.component.html',
  styleUrls: ['./condition-tree.component.css'],
  standalone: true,
  imports: [NgIf, NgFor, NgClass, CdkDropList, CdkDrag]
})
export class ConditionTreeComponent {
  @Input() node!: ConditionNode;
  @Output() select = new EventEmitter<ConditionNode>();

  isComplex(n: ConditionNode): n is ComplexConditionNode {
    return n.type === 'COMPLEX';
  }

  onDrop(event: CdkDragDrop<ConditionNode[]>) {
    if (this.isComplex(this.node)) {
      moveItemInArray(this.node.children, event.previousIndex, event.currentIndex);
    }
  }
}



