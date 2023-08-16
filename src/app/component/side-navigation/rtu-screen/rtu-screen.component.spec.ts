import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtuScreenComponent } from './rtu-screen.component';

describe('RtuScreenComponent', () => {
  let component: RtuScreenComponent;
  let fixture: ComponentFixture<RtuScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtuScreenComponent]
    });
    fixture = TestBed.createComponent(RtuScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
