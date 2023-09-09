import { Component } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent {
 selectedDropdownIndustryValue:string='Select from the drop-down'
  selectedDropdownBusinessTypeValue:string='Select from the drop-down'
  activeIndexSubTab: any = 0
  activeIndexTab: any
  activeUpdateButton: boolean=false
  activeIndexSubTab0: any = 0
   functionName=[
    {
     'label':'Defuse the Bomb',
     'date': '29/07/06',
    },
    {
      'label':'Mystery Team',
      'date': '21/07/06',
    },
    {
      'label':'Triangularis',
      'date': '22/07/06',
    },
    {
      'label':' Word Search',
      'date': '23/07/06',
    },
    {
      'label':'Word Wheel',
      'date': '24/07/06',
    },
    {
      'label':'Crossword',
      'date': '26/07/06',
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
  "label": 'Create Batch'
  },
  {
    "label": 'Display all Batches'
  },
  // {
  //   "label":'Function to Role Mapping'
  // }
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
//   setActiveTab(tabIndex: number) {
//     this.activeTab = tabIndex;
//   }
NavigateToSubTab0(index: number) {
  this.activeIndexSubTab = index;
}


}

