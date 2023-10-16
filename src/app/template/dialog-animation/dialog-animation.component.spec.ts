import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAnimationComponent } from './dialog-animation.component';

describe('DialogAnimationComponent', () => {
  let component: DialogAnimationComponent;
  let fixture: ComponentFixture<DialogAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAnimationComponent]
    });
    fixture = TestBed.createComponent(DialogAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
