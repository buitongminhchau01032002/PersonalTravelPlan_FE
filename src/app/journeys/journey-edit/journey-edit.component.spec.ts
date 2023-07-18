import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyEditComponent } from './journey-edit.component';

describe('JourneyEditComponent', () => {
  let component: JourneyEditComponent;
  let fixture: ComponentFixture<JourneyEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JourneyEditComponent]
    });
    fixture = TestBed.createComponent(JourneyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
