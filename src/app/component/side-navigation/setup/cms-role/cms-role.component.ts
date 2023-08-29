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
  activeIndexSubTab: any = 0;
  activeIndexTab: any;
  activeUpdateButton: boolean=false;
  RoleFunctionList:any=[];
  idOrganization:any='';
  CmsRoleList:any=[];
  getOrganizationlist:any=[]
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
 

constructor(public http:ApiServiceService){
console.log(this.activeUpdateButton);

}
  ngOnInit(): void {
  this.getCmsRole_Function_List()
  this.getOrganization()
  }

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue = value
  }
  updateSelectedBusinessTypeValue(value: any) {
    
    this.selectedDropdownBusinessTypeValue = value

  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index
    if(this.activeIndexSubTab==1){
      this.getCmsRoleList()
    }
  }
  selectOption(index:any){
    this.activeIndexTab=index
  }
 

  getCmsRole_Function_List(){
    this.idOrganization=localStorage.getItem('idOrganization')
    this.http.GetCmsRoleFunctionList(this.idOrganization).subscribe((res) => {
      this.RoleFunctionList=res

    })
  }
  getOrganization(){
    this.http.getOrganisation().subscribe((res) => {
      console.log(res);
      this.getOrganizationlist=res
      console.log(this.getOrganization);
      
    })
  }
  getCmsRoleList(){
    this.idOrganization=localStorage.getItem('idOrganization')
    this.http.getRolesList(this.idOrganization).subscribe((res) => {
      this.CmsRoleList=res
       console.log(this.CmsRoleList);
    })
  }

}

