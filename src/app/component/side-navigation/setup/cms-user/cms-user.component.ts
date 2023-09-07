import { Component } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-cms-user',
  templateUrl: './cms-user.component.html',
  styleUrls: ['./cms-user.component.scss']
})
export class CmsUserComponent {
  activeIndexSubTab: any = 0
  selectedDropdownIndustryValue:string='Select from the drop-down'
  selectedDropdownRoleValue:string='Select from the drop-down'
  selectedDropdownVendorValue:string='Select from the drop-down'
  idCmsUser:any=''
  userDetailsList:any
  getOrganizationlist: any = [];
  idOrganization: any = '';
  CmsRole:any=[]
  subtab = [
    {
    "label": 'Create Cms User'
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
   
    constructor(private http:ApiServiceService){}
    ngOnInit():void{
       this.getCmsUserDetailsList()
       this.getOrganization()
       this.getCmsRoleList()
    }

    getOrganization() {
      this.http.getOrganisation().subscribe((res) => {
        console.log(res);
        this.getOrganizationlist = res;
        console.log(this.getOrganization);
      });
    } 
    getCmsRoleList() {
      this.idOrganization = localStorage.getItem('idOrganization');
      this.http.getRolesList(this.idOrganization).subscribe((res) => {
        this.CmsRole= res;
        console.log(this.CmsRoleList);
      });

    }
  
    NavigateToSubTab(index: any) {
      this.activeIndexSubTab = index
      console.log(this.activeIndexSubTab);
    }
    selectedIndustryValue(value: any) {
      this.selectedDropdownIndustryValue =
        this.getOrganizationlist[value].organizationName;
    }
    selectedRoleValue(value:any){
      this.selectedDropdownRoleValue =
      this.CmsRole[value].roleName;
      console.log(value);
    }
    selectedVendorValue(value:any){
    this.selectedDropdownVendorValue =value
      
    }
    getCmsUserDetailsList(){
    this.idCmsUser = localStorage.getItem('idCmsUser');
    console.log("idCmsuser",this.idCmsUser);
    
    this.http.getCMSUserDetails(this.idCmsUser).subscribe(res=>{
      this.userDetailsList=res
      console.log(this.userDetailsList);
      
    })
    }

  
}
