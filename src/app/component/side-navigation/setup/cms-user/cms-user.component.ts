import { Component } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-cms-user',
  templateUrl: './cms-user.component.html',
  styleUrls: ['./cms-user.component.scss'],
})
export class CmsUserComponent {
  activeIndexSubTab: any = 0;
  selectedDropdownIndustryValue: string = 'Select from the drop-down';
  selectedDropdownRoleValue: string = 'Select from the drop-down';
  selectedDropdownVendorValue: string = 'Select from the drop-down';
  idCmsUser: any = '';
  userDetailsList: any;
  getOrganizationlist: any = [];
  idOrganization: any = '';
  idCmsRole: any = '';
  CmsRole: any = [];
  username: string = '';
  function: string = '';
  totalUserlist: string = '';
  activeUserlist: string = '';
  inactivUserList: string = '';
  activeRadiobutton = 0;
  subtab = [
    {
      label: 'Create Cms User',
    },
    {
      label: 'Display CMS User List',
    },
  ];
  CmsRoleList = [
    {
      username: 'Admin_123',
      label: 'About Life',
      role: 'Admin Access',
      function: 'Admin Access',
    },
    {
      username: '',
      label: 'Baroda Global Shared Services Ltd',
      role: 'Admin Access',
      function: 'Admin Access',
    },
    {
      label: '',
      role: '',
      function: '',
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
  constructor(private http: ApiServiceService) {}
  ngOnInit(): void {
    this.getCmsUserDetailsList();
    this.getOrganization();
    this.getCmsRoleList();
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
    this.idCmsRole = localStorage.getItem('idCmsRole');

    this.http.getRolesList(this.idOrganization).subscribe((res) => {
      this.CmsRole = res;
      console.log(this.CmsRoleList);
    });
  }

  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;
    console.log(this.activeIndexSubTab);
  }
  selectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue =
      this.getOrganizationlist[value].organizationName;
  }
  selectedRoleValue(value: any) {
    this.selectedDropdownRoleValue = this.CmsRole[value].roleName;
    console.log(value);
  }
  selectedVendorValue(value: any) {
    this.selectedDropdownVendorValue = value;
  }
  getCmsUserDetailsList() {
    this.idCmsUser = localStorage.getItem('idCmsUser');
    this.idOrganization = localStorage.getItem('idOrganization');
    console.log('idCmsuser', this.idOrganization);

    this.http.getCMSUserDetails(this.idOrganization).subscribe((res) => {
      this.userDetailsList = res;
      console.log(this.userDetailsList);
      this.totalUserlist = this.userDetailsList;
      this.count[0].value = this.userDetailsList.length;
      this.activeUserlist = this.userDetailsList.filter(
        (org: { status: string }) => org.status === 'A'
      );
      console.log(this.activeUserlist);
      this.count[1].value = this.activeUserlist.length;
      this.inactivUserList = this.userDetailsList.filter(
        (org: { status: string }) => org.status === 'D'
      );
      console.log(this.inactivUserList);
      this.count[2].value = this.inactivUserList.length;
    });
  }

  viewUserinfo(value: any) {
    console.log(value);
    this.username = this.userDetailsList[value].userName;
    this.function = this.userDetailsList[value].functions;
  }

  navigateToEditCmsUSer(value: any) {
    console.log(value);

    this.activeIndexSubTab = 0;
  }
  changeFilter(index: any) {
    console.log(index);
    if (index == 0) {
      this.userDetailsList = this.totalUserlist;
    } else if (index == 1) {
      this.userDetailsList = this.activeUserlist;
    } else if (index == 2) {
      this.userDetailsList = this.inactivUserList;
    }
  }
}
