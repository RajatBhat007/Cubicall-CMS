import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsUserComponent } from './cms-user.component';

describe('CmsUserComponent', () => {
  let component: CmsUserComponent;
  let fixture: ComponentFixture<CmsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CmsUserComponent]
    });
    fixture = TestBed.createComponent(CmsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
