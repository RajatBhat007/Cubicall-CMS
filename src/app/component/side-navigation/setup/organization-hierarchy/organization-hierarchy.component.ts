import { Component } from '@angular/core';

@Component({
  selector: 'app-organization-hierarchy',
  templateUrl: './organization-hierarchy.component.html',
  styleUrls: ['./organization-hierarchy.component.scss']
})
export class OrganizationHierarchyComponent {
  subtab :any=[
    {
      "label": 'Create Admin Roles'
      },
      {
        "label": 'Set Hierarchy'
      },
  ]

  activeIndexSubTab: any=0

  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index
    console.log(this.activeIndexSubTab);
  }
}
