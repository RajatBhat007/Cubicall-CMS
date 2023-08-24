import { Component, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-cms-role',
  templateUrl: './cms-role.component.html',
  styleUrls: ['./cms-role.component.scss']
})
export class CmsRoleComponent {
  selectedDropdownIndustryValue:string='Select from the drop-down'
  selectedDropdownBusinessTypeValue:string='Select from the drop-down'
  activeIndexSubTab: any = 0
  activeIndexTab: any
  activeUpdateButton: boolean=false
   functionName=[
    {
     'label':'Upload Question and Answers'
    },
    {
      'label':'Approve Question and Answers'
    },
    {
      'label':'Edit Question and Answers'
    },
    {
      'label':'Configure Game Time'
    },
    {
      'label':'Configure Game Attempts'
    },
    {
      'label':'Configure Game Streaks'
    },
    {
      'label':'Configure Game Images'
    },
    {
      'label':'Configure Main Screen Images'
    },
]
 CmsRoleList=[
  {
    'label':'About Life',
    'role':"Admin Access",
    'function':'Admin Access'
  },
  {
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
subtab = [
  {
  "label": 'Create CMS Role'
  },
  {
    "label": 'Display CMS Role List'
  },
  {
    "label":'Function to Role Mapping'
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
 

constructor(public apiservice:ApiServiceService){
console.log(this.activeUpdateButton);

}
  ngOnInit(): void {
 
  }

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue = value
  }
  updateSelectedBusinessTypeValue(value: any) {
    
    this.selectedDropdownBusinessTypeValue = value

  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index
    console.log(this.activeIndexSubTab);
     this.apiservice.activeSubTabvalue(this.activeIndexSubTab)
  }
  selectOption(index:any){
    this.activeIndexTab=index
  }
  // updateOragnization(){
  //   this.activeUpdateButton=true
  // }
  // viewOrganization(){
  //   this.activeUpdateButton=false
  // }
}

