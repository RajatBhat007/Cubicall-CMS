import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-cms-role',
  templateUrl: './cms-role.component.html',
  styleUrls: ['./cms-role.component.scss'],
})
export class CmsRoleComponent {
  selectedDropdownIndustryValue: string = 'Select from the drop-down';
  selectedDropdownBusinessTypeValue: string = 'Select from the drop-down';
  activeIndexSubTab: any = 0;
  activeIndexTab: any;
  activeUpdateButton: boolean = false;
  RoleFunctionList: any = [];
  idOrganization: any = '';
  idCmsRole:any=''
  CmsRoleList: any = [];
  getOrganizationlist: any = [];
  functionName:string=''
  functionDescription:string=''
  totalCmsRolelist:string=''
  activeCmsRolelist:string=''
  inactivCmsRoleList:string=''
  activeRadiobutton = 0;

  subtab = [
    {
      label: 'Create CMS Role',
    },
    {
      label: 'Display CMS Role List',
    },
    {
      label: 'Function to Role Mapping',
    },
  ];
  count = [
    {
      label: 'Total:',
      value: 0,
    },
    {
      label: 'Active:',
      value: 0,
    },
    {
      label: 'Inactive:',
      value: 0,
    },
  ];
  cmsRoleName: string='';
  cmsFunctionName: string='';
  organizationName:string=''
  constructor(public http: ApiServiceService,public  _router: Router) {
    console.log(this.activeUpdateButton);
  }
  ngOnInit(): void {
    this.getCmsRole_Function_List();
    this.getOrganization();
  }

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue =
      this.getOrganizationlist[value].organizationName;
  }
  updateSelectedBusinessTypeValue(value: any) {
    this.selectedDropdownBusinessTypeValue = value;
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;
    console.log(this.activeIndexSubTab);
    
    if (this.activeIndexSubTab == 1) {
      this.getCmsRoleList();
    }
  }
  selectOption(index: any) {
    this.activeIndexTab = index;
  }

  getCmsRole_Function_List() {
    this.idOrganization = localStorage.getItem('idOrganization');
    this.http.GetCmsRoleFunctionList(this.idOrganization).subscribe((res) => {
      this.RoleFunctionList = res;
       console.log(this.RoleFunctionList);
      
    });
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
    this.idCmsRole=localStorage.getItem('idCmsRole')

    this.http.getRolesList(-this.idOrganization,-this.idCmsRole).subscribe((res) => {
      this.CmsRoleList = res;
      console.log(this.CmsRoleList);

 
      this.totalCmsRolelist = this.CmsRoleList;
      this.count[0].value = this.CmsRoleList.length;
      this.activeCmsRolelist = this.CmsRoleList.filter(
        (org: { status: string }) => org.status === 'A'
      );
      console.log(this.activeCmsRolelist);
      this.count[1].value = this.activeCmsRolelist.length;
      this.inactivCmsRoleList = this.CmsRoleList.filter(
        (org: { status: string }) => org.status === 'D'
      );
      console.log(this.inactivCmsRoleList);
      this.count[2].value = this.inactivCmsRoleList.length;

    });
  }

  viewFunction(value:any){
   this.functionName=this.RoleFunctionList[value].functionName
   this.functionDescription=this.RoleFunctionList[value].description
   console.log(this.functionName);
   console.log(this.functionDescription);
   
  }
  viewCmsRole(value:any){
     console.log(value);
    //  this.organizationName=this.CmsRoleList[value]
     this.cmsRoleName=this.CmsRoleList[value].roleName
     this.cmsFunctionName=this.CmsRoleList[value].idsFunction
     this.organizationName=this.CmsRoleList[value].organizationName
  }
  navigateToCreateCmsRole(value:any){
    // this._router.navigate(['home/setup'],{queryParams:{value}})
    this.activeIndexSubTab = 0;
  }

  changeFilter(index: any) {
    console.log(index);
    if (index == 0) {
      this.CmsRoleList = this.totalCmsRolelist;
    } else if (index == 1) {
      this.CmsRoleList = this.activeCmsRolelist;
    } else if (index == 2) {
      this.CmsRoleList = this.inactivCmsRoleList;
    }
  }
}
