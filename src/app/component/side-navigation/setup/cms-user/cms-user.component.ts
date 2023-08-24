import { Component } from '@angular/core';

@Component({
  selector: 'app-cms-user',
  templateUrl: './cms-user.component.html',
  styleUrls: ['./cms-user.component.scss']
})
export class CmsUserComponent {
  activeIndexSubTab: any = 0
  selectedDropdownIndustryValue:string='Select from the drop-down'

  subtab = [
    {
    "label": 'Create Organization'
    },
    {
      "label": 'Display CMS User List'
    }
    ]
    CmsRoleList=[
      {
        'username':'Admin_123',
        'label':'About Life',
        'role':"Admin Access",
        'function':'Admin Access'
      },
      {
        'username':'',
        'label':'Baroda Global Shared Services Ltd',
        'role':"Admin Access",
        'function':'Admin Access'
      },
      {
        'label':'',
        'role':"",
        'function':''
      },
      {
        'label':'',
        'role':"",
        'function':''
      },
      {
        'label':'',
        'role':"",
        'function':''
      },
      {
        'label':'',
        'role':"",
        'function':''
      }
     ]
     count = [{
      "label": 'Total:',
      "value": 7
    },
    {
      "label": 'Active:',
      "value": 7
    },
    {
      "label": 'Inactive:',
      "value": 0
    },
  
    ]
    NavigateToSubTab(index: any) {
      this.activeIndexSubTab = index
      console.log(this.activeIndexSubTab);
    }
    updateSelectedIndustryValue(value: any) {
      this.selectedDropdownIndustryValue = value
    }
}
