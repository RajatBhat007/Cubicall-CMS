import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiServiceService } from 'src/app/service/api-service.service';
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

  constructor(public _router: Router, private _route: ActivatedRoute,public apiservice:ApiServiceService) { }

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

  subtab :any=[
    {
      "label": 'Create Organization'
      },
      {
        "label": 'Display Organization'
      },
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
  console.log(this.activeIndexTab);
  if (this.activeIndexTab==0) {
    this.subtab = [
      {
      "label": 'Create Organization'
      },
      {
        "label": 'Display Organization'
      },
      ]
  }
  else if (this.activeIndexTab==1) {
    this.subtab = [
      {
      "label": 'Create Organization'
      },
      {
        "label": 'Display Organization'
      },
      {
        "label":'Function to Role Mapping'
      }
      ]
  }

  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index
    console.log(this.activeIndexSubTab);
     this.apiservice.activeSubTabvalue(this.activeIndexSubTab)
  }
  navigateToEditQuestion() {
    this._router.navigateByUrl('home/sidenav/edit-question')
  }



}
