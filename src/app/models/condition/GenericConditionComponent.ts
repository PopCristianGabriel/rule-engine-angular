export abstract class GenericConditionComponent {
  text: string | undefined;
  abstract blockType: 'event' | 'logical' | 'comparison' | 'number';
}
