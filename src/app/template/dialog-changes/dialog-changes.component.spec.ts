import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangesComponent } from './dialog-changes.component';

describe('DialogChangesComponent', () => {
  let component: DialogChangesComponent;
  let fixture: ComponentFixture<DialogChangesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogChangesComponent]
    });
    fixture = TestBed.createComponent(DialogChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
