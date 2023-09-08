import { Component, Input } from '@angular/core';
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
  CmsRoleList: any = [];
  getOrganizationlist: any = [];
  functionName: string = '';
  functionDescription: string = '';
  apiData: any;
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
      value: 7,
    },
    {
      label: 'Active:',
      value: 7,
    },
    {
      label: 'Inactive:',
      value: 0,
    },
  ];
  cmsRoleName: string = '';
  cmsFunctionName: string = '';

  constructor(public http: ApiServiceService, public _router: Router) {
    console.log(this.activeUpdateButton);
  }
  ngOnInit(): void {
    this.getCmsRole_Function_List();
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
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      console.log(this.apiData);
    });

    this.http.GetCmsRoleFunctionList(this.idOrganization).subscribe((res) => {
      this.RoleFunctionList = res;
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
    this.idOrganization = this.apiData?.user?.idOrganization;
    this.http.getRolesList(this.idOrganization).subscribe((res) => {
      this.CmsRoleList = res;
      console.log(this.CmsRoleList);
    });
  }

  viewFunction(value: any) {
    this.functionName = this.RoleFunctionList[value].functionName;
    this.functionDescription = this.RoleFunctionList[value].description;
    console.log(this.functionName);
    console.log(this.functionDescription);
  }
  viewCmsRole(value: any) {
    console.log(value);
    //  this.organizationName=this.CmsRoleList[value]
    this.cmsRoleName = this.CmsRoleList[value].roleName;
    this.cmsFunctionName = this.CmsRoleList[value].idsFunction;
  }
  navigateToCreateCmsRole(value: any) {
    // this._router.navigate(['home/setup'],{queryParams:{value}})
    this.activeIndexSubTab = 0;
  }
}
