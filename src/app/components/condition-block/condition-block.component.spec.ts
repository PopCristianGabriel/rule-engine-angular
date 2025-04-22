import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionBlockComponent } from './condition-block.component';

describe('ConditionBlockComponent', () => {
  let component: ConditionBlockComponent;
  let fixture: ComponentFixture<ConditionBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
