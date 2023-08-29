import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHierarchyComponent } from './organization-hierarchy.component';

describe('OrganizationHierarchyComponent', () => {
  let component: OrganizationHierarchyComponent;
  let fixture: ComponentFixture<OrganizationHierarchyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizationHierarchyComponent]
    });
    fixture = TestBed.createComponent(OrganizationHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
