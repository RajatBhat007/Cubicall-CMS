import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsRoleComponent } from './cms-role.component';

describe('CmsRoleComponent', () => {
  let component: CmsRoleComponent;
  let fixture: ComponentFixture<CmsRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CmsRoleComponent]
    });
    fixture = TestBed.createComponent(CmsRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
