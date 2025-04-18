import { Component } from '@angular/core';
import { ConditionNode, SimpleConditionNode, ComplexConditionNode } from '../../models/ConditionNode';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {ConditionTreeComponent} from '../condition-tree/condition-tree.component';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-rule-builder',
  templateUrl: './rule-builder.component.html',
  styleUrls: ['./rule-builder.component.css'],
  standalone: true,
  imports: [
    MatCardTitle,
    MatCard,
    ConditionTreeComponent,
    MatButton,
    NgIf,
    MatFormField,
    MatLabel,
    MatSelect,
    NgForOf,
    FormsModule,
    MatOption,
    MatInput
  ]
})
export class RuleBuilderComponent {
  root: ConditionNode | null = null;
  selectedNode: ConditionNode | null = null;

  metadata = {
    eventTypes: ['BET', 'DEPOSIT'],
    operators: ['GREATER_THAN', 'LESS_THAN', 'EQUALS']
  };

  onNodeSelected(node: ConditionNode) {
    this.selectedNode = node;
  }

  addSimple() {
    const simple: SimpleConditionNode = {
      type: 'SIMPLE',
      eventType: 'BET',
      operator: 'GREATER_THAN',
      targetValue: 5
    };

    if (!this.root) {
      this.root = simple;
    } else {
      this.root = {
        type: 'COMPLEX',
        logicalOperator: 'AND',
        children: [this.root, simple]
      };
    }
  }

  deleteSelected() {
    if (!this.selectedNode || !this.root) return;

    const removeNode = (node: ConditionNode): ConditionNode | null => {
      if (node === this.selectedNode) return null;

      if (node.type === 'COMPLEX') {
        node.children = node.children
          .map(child => removeNode(child))
          .filter((c): c is ConditionNode => c !== null);

        return node.children.length === 1 ? node.children[0] : node;
      }

      return node;
    };

    this.root = removeNode(this.root);
    this.selectedNode = null;
  }

  save() {
    console.log('Final Rule:', this.root);
  }
}
