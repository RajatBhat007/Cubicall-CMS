import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {
  activeIndexTab: any = 0
  activeIndexSubTab: any = 0

  activeTabGameThemes: Boolean = false

  selectedDropdownValue: string = 'Organization';
  selectedDropdownIndustryValue:string='Select from the drop-down'
  selectedDropdownBusinessTypeValue:string='Select from the drop-down'
  status: any

  constructor(public _router: Router, private _route: ActivatedRoute) { }

  matTab = [{
    "content": 'Organization',
    "color": "#7B7FCF"
  }, {
    "content": 'CMS Role',
    "color": "#D43539"
  }, {
    "content": 'CMS User',
    "color": "#FAA54A"
  }, {
    "content": 'Batch',
    "color": "#55BC87"
  }

  ]

  subtab = [{
    "label": 'Create Organization'

  },
  {
    "label": 'Display Organization'

  }

  ]

  ngOnInit(): void {



  }



  updateSelectedValue(value: any) {
    this.selectedDropdownValue = value

  }

  

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue = value

  }

  updateSelectedBusinessTypeValue(value: any) {
    
    this.selectedDropdownBusinessTypeValue = value

  }
  NavigateToTab(index: any) {
    this.activeIndexTab = index
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index
  }
  navigateToEditQuestion() {
    this._router.navigateByUrl('home/sidenav/edit-question')
  }



}
