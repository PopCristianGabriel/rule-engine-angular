import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionTreeComponent } from './condition-tree.component';

describe('ConditionTreeComponent', () => {
  let component: ConditionTreeComponent;
  let fixture: ComponentFixture<ConditionTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
