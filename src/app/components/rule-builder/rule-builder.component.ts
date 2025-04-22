import { Component } from '@angular/core';
import { ConditionNode, SimpleConditionNode, ComplexConditionNode } from '../../models/ConditionNode';
import {MatCard, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {LogicalOperatorComponent} from '../../models/condition/LogicalOperatorComponent';
import {EventComponent} from '../../models/condition/EventComponent';
import {LogicalOperator} from '../../models/condition/LogicalOperator';
import {EventType} from '../../models/condition/EventType';
import {ConditionBlockComponent} from '../condition-block/condition-block.component';
import {GenericConditionComponent} from '../../models/condition/GenericConditionComponent';
import {NumberComponent} from '../../models/condition/NumberComponent';
import {DropZoneComponent} from '../drop-zone/drop-zone.component';

@Component({
  selector: 'app-rule-builder',
  templateUrl: './rule-builder.component.html',
  styleUrls: ['./rule-builder.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ConditionBlockComponent,
    DropZoneComponent
  ]
})
export class RuleBuilderComponent {

  eventBlocks: GenericConditionComponent[] = [];
  logicalBlocks: GenericConditionComponent[] = [];
  comparisonBlocks: GenericConditionComponent[] = [];
  numberBlocks: GenericConditionComponent[] = [];

  ngOnInit() {
    const allBlocks: GenericConditionComponent[] = [];

    // 🧮 Number block
    const number = new NumberComponent();
    number.text = '42';
    number.value = 42;

    // 🎯 Event blocks (based on EventType enum)
    const depositEvent = new EventComponent();
    depositEvent.text = 'DEPOSIT';
    depositEvent.eventType = EventType.DEPOSIT;

    const betEvent = new EventComponent();
    betEvent.text = 'BET';
    betEvent.eventType = EventType.BET;

    // 🔀 Logical operators (based on LogicalOperator enum)
    const andOp = new LogicalOperatorComponent();
    andOp.text = 'AND';
    andOp.operator = LogicalOperator.AND;

    const orOp = new LogicalOperatorComponent();
    orOp.text = 'OR';
    orOp.operator = LogicalOperator.OR;

    const xorOp = new LogicalOperatorComponent();
    xorOp.text = 'XOR';
    xorOp.operator = LogicalOperator.XOR;

    // 🔎 Comparison operators
    const greaterThan = new LogicalOperatorComponent();
    greaterThan.text = '>';
    greaterThan.operator = LogicalOperator.GREATER_THAN;

    const greaterThanOrEqual = new LogicalOperatorComponent();
    greaterThanOrEqual.text = '≥';
    greaterThanOrEqual.operator = LogicalOperator.GREATER_THAN_OR_EQUAL;

    const lessThan = new LogicalOperatorComponent();
    lessThan.text = '<';
    lessThan.operator = LogicalOperator.LESS_THAN;

    const lessThanOrEqual = new LogicalOperatorComponent();
    lessThanOrEqual.text = '≤';
    lessThanOrEqual.operator = LogicalOperator.LESS_THAN_OR_EQUAL;

    const equals = new LogicalOperatorComponent();
    equals.text = '=';
    equals.operator = LogicalOperator.EQUALS;

    const notEquals = new LogicalOperatorComponent();
    notEquals.text = '≠';
    notEquals.operator = LogicalOperator.NOT_EQUALS;

    // Add all to the block palette
    allBlocks.push(
      number,
      depositEvent,
      betEvent,
      andOp,
      orOp,
      xorOp,
      greaterThan,
      greaterThanOrEqual,
      lessThan,
      lessThanOrEqual,
      equals,
      notEquals
    );

    // Group by type
    this.eventBlocks = allBlocks.filter(b => b.blockType === 'event');
    this.logicalBlocks = allBlocks.filter(b => b.blockType === 'logical');
    this.comparisonBlocks = allBlocks.filter(b => b.blockType === 'comparison');
    this.numberBlocks = allBlocks.filter(b => b.blockType === 'number');
  }



  handleDragStart(event: DragEvent, block: GenericConditionComponent) {
    const data = {
      ...block,
      type: block instanceof NumberComponent ? 'number' :
        block instanceof EventComponent ? 'event' :
          block instanceof LogicalOperatorComponent ? 'logical' :
          'generic'
    };
    event.dataTransfer?.setData('application/json', JSON.stringify(data));
    event.dataTransfer!.effectAllowed = 'move';
  }
}
