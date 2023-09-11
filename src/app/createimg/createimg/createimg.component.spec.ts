import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateimgComponent } from './createimg.component';

describe('CreateimgComponent', () => {
  let component: CreateimgComponent;
  let fixture: ComponentFixture<CreateimgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateimgComponent]
    });
    fixture = TestBed.createComponent(CreateimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
