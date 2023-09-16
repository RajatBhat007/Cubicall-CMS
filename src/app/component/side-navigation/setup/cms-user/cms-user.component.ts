import { Component, Input } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/pages/modal/modal.component';

@Component({
  selector: 'app-cms-user',
  templateUrl: './cms-user.component.html',
  styleUrls: ['./cms-user.component.scss'],
})
export class CmsUserComponent {
  @Input() user: any;

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
  apiData: any;
  createCmsUser: FormGroup;
  isDisabledCreateUser: boolean = true;
  showPassword: boolean = false;
  selectedOrganizationID: any;
  selectedCmsIdRole: any;
  EditButton: Boolean = false;
  getEditUserDetails: any = [];
  editOrzation: any = [];
  editRole: any = [];
  activeOrganization: any = [];
  activeRole: any = [];
  activeOrganizationName: any = [];
  getViewUserDetails: any = [];
  organizationNameView: String = '';
  roleNameView: String = '';
  payload: any;
  EditIdCmsUser: String = '';
  redirectedFrom: string = '';
  CmsRoleresponse: any = [];
  selectedDropdownRoleId: number = 0;
  vendorDetailsResponse: any = [];
  idOrganization1: number = 0;
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
  stageResponse: any = [];
  divVisible: boolean = false;
  constructor(
    private http: ApiServiceService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.createCmsUser = this.fb.group({
      employeeUserName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-z\s'-]+$/),
        ],
      ],
      employeeName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[A-Za-z\s'-]+$/),
        ],
      ],
      empId: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-z]{2}-\d{4}(,[a-z]{2}-\d{4})*$/i),
        ],
      ],
      empPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*!()])[A-Za-z\d@#$%^&+=*!()]+$/
          ),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.getApiData();
  }

  getApiData() {
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      console.log(this.apiData);
    });

    this.redirectedFrom = this.user?.key1
      ? this.user?.key1
      : this.apiData?.role?.roleName;
    console.log(this.redirectedFrom);

    if (this.apiData?.role.roleName == this.user?.key1) {
      this.selectedDropdownIndustryValue = this.apiData?.role?.organizationName;
      this.selectedOrganizationID = this.apiData?.role?.idOrganization;
    }
  }

  getVendorDetails() {
    this.http
      .getVendorDetails(
        this.apiData?.role?.idOrganization,
        this.apiData?.user?.idOrgHierarchy
      )
      .subscribe((res) => {
        this.vendorDetailsResponse = res;
        console.log(this.vendorDetailsResponse);

        // console.log(this.organisationName);
        // this.organisationProcess = this.organisationName[1].idOrgHierarchy;
        // console.log(this.organisationProcess);

        // this.processForm1
        //   .get('processName')
        //   ?.setValue(this.organisationProcess);
        // this.processForm1.get('processName')?.value || '';
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  getOrganization() {
    this.http.getOrganisation().subscribe((res) => {
      this.getOrganizationlist = res;
    });
  }
  GetRoleTypesList() {
    // this.http.getRoleType().subscribe((res) => {
    //   this.CmsRoleresponse = res;
    //   console.log(this.CmsRoleresponse);
    //   const filteredRoles = this.CmsRoleresponse.filter(
    //     (role: { idRoleType: number }) =>
    //       role.idRoleType > this.apiData?.role?.idRoleType
    //   );

    //   this.CmsRole = filteredRoles;
    //   console.log(this.CmsRole);
    // });
    if (this.apiData?.user?.idOrganization === 1) {
      this.idOrganization = -this.apiData?.user?.idOrganization;
      this.idCmsRole = -this.apiData?.user?.idCmsRole;
    } else {
      this.idOrganization = this.selectedOrganizationID;
      this.idCmsRole = -1;
    }
    this.http
      .getRolesList(this.selectedOrganizationID, this.idCmsRole)
      .subscribe((res) => {
        this.CmsRoleresponse = res;
        console.log(this.CmsRoleresponse);
        const filteredRoles = this.CmsRoleresponse.filter(
          (role: { idRoleType: number }) =>
            role.idRoleType > this.apiData?.role?.idRoleType
        );

        this.CmsRole = filteredRoles;
        console.log(this.CmsRole);
      });
  }

  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;
    console.log(this.activeIndexSubTab);
    if (this.activeIndexSubTab == 1) {
      this.getCmsUserDetailsList();
      this.EditButton = false;
    }
  }
  selectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue =
      this.getOrganizationlist[value].organizationName;

    this.selectedOrganizationID =
      this.getOrganizationlist[value].idOrganization;
    console.log(this.selectedOrganizationID);
  }
  selectedRoleValue(value: any) {
    this.selectedDropdownRoleValue = this.CmsRole[value].roleName;
    console.log(this.selectedDropdownRoleValue);
    this.selectedDropdownRoleId = Number(this.CmsRole[value]?.idRoleType);
    console.log(this.selectedDropdownRoleId);

    this.selectedCmsIdRole = this.CmsRole[value]?.idCmsRole;
    console.log(this.selectedCmsIdRole);

    this.divVisible = true;
  }
  selectedVendorValue(value: any) {
    this.selectedDropdownVendorValue =
      this.vendorDetailsResponse[value].hierarchyName;
  }

  selectedStageValue(value: any) {
    this.selectedDropdownVendorValue = this.stageResponse[value].hierarchyName;
  }
  getCmsUserDetailsList() {
    console.log(this.user?.key1);

    if (this.apiData?.role?.idOrganization == 1) {
      this.idOrganization1 = -1;
      this.idCmsUser = -1;
    } else {
      this.idOrganization1 = this.apiData?.user?.idOrganization;
      this.idCmsUser = -1;
    }
    console.log(this.idOrganization1);
    console.log(this.idCmsUser);

    this.http
      .getCMSUserDetails(this.idOrganization1, this.idCmsUser)
      .subscribe((res) => {
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

  GetStage() {
    this.http.getStages(this.apiData?.role?.idOrganization).subscribe((res) => {
      console.log(res);
      this.stageResponse = res;
      console.log(this.stageResponse);

      // this.hierachicalStageName = this.stagesName?.hierarchyName;
    });
  }
  viewUserinfo(value: any) {
    console.log(value);
    this.username = this.userDetailsList[value]?.userName;
    this.function = this.userDetailsList[value]?.functions;
    this.organizationNameView = this.userDetailsList[value]?.organizationName;
    this.roleNameView = this.userDetailsList[value]?.organizationName;
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

  get femployeeUserNameControl() {
    return this.createCmsUser.get('employeeUserName');
  }

  get employeeNameControl() {
    return this.createCmsUser.get('employeeName');
  }
  get empIdControl() {
    return this.createCmsUser.get('empId');
  }

  get empPasswordControl() {
    return this.createCmsUser.get('empPassword');
  }
  updateInputState(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.trim();

    if (inputValue === null || inputValue === '') {
      this.isDisabledCreateUser = true; // Disable the input field when it's null or empty
    } else {
      this.isDisabledCreateUser = false; // Enable the input field when it has a value
    }
  }

  openModal(value: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    // You can pass data to the modal if needed
    modalRef.componentInstance.someData = value;
    modalRef.componentInstance.screen = 'user';
  }

  createCmsUserOnSubmit() {
    if (this.EditButton) {
      console.log('hello');
      this.payload = {
        Data: {
          IdCmsUser: this.EditIdCmsUser,
          IdOrganization: this.getEditUserDetails?.idOrganization
            ? this.getEditUserDetails?.idOrganization
            : Number(this.selectedOrganizationID),
          UserName: this.femployeeUserNameControl?.value,
          EmployeeId: this.empIdControl?.value,
          Name: this.employeeNameControl?.value,
          Email: '',
          PhoneNo: '',
          Password: this.empPasswordControl?.value,
          Status: this.getEditUserDetails?.status, //pass A static
          IdOrgHierarchy: Number(this.apiData?.user?.idOrgHierarchy),
          IdCmsRole: this.getEditUserDetails?.idCmsRole
            ? this.getEditUserDetails?.idCmsRole
            : Number(this.selectedCmsIdRole), //pass static because get roles api is not working
        },
      };
      console.table(this.createCmsUser.value);
      console.log(this.payload);

      const escapedIdCmsUser = JSON.stringify(this.payload.Data.IdOrganization);
      const escapedIdOrganization = JSON.stringify(
        this.payload.Data.IdOrganization
      );
      const escapedUserName = JSON.stringify(this.payload.Data.UserName);
      const escapedEmployeeId = JSON.stringify(this.payload.Data.EmployeeId);
      const escapedName = JSON.stringify(this.payload.Data.Name);
      const escapedEmail = JSON.stringify(this.payload.Data.Email);
      const escapedPhoneNo = JSON.stringify(this.payload.Data.PhoneNo);
      const escapedPassword = JSON.stringify(this.payload.Data.Password);
      const escapedStatus = JSON.stringify(this.payload.Data.Status);
      const escapedIdOrgHierarchy = JSON.stringify(
        this.payload.Data.IdOrgHierarchy
      );
      const escapedIdCmsRole = JSON.stringify(this.payload.Data.IdCmsRole);

      const escapedJsonString = `{\"IdCmsUser\":${escapedIdCmsUser},\"IdOrganization\":${escapedIdOrganization},\"UserName\":${escapedUserName},\"EmployeeId\":${escapedEmployeeId},\"Name\":${escapedName},\"Email\":${escapedEmail},\"PhoneNo\":${escapedPhoneNo},\"Password\":${escapedPassword},\"Status\":${escapedStatus},\"IdOrgHierarchy\":${escapedIdOrgHierarchy}, \"IdCmsRole\":${escapedIdCmsRole}`;
      const jsonString = JSON.stringify(escapedJsonString);
      console.log(jsonString);
      const jsonStringremovelast = jsonString.slice(0, -1);
      const body = '{"Data":' + jsonStringremovelast + '}"}';
      console.log(body);
      console.table(this.createCmsUser.value);

      this.http.CreateUser(body).subscribe(
        (res) => {
          console.log(res);
          this.openModal('Done! The User has been Updeted successfully.');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            window.alert('404 Not Found Error');
          } else {
            window.alert(error.error);
          }
        }
      );
      this.createCmsUser.reset();
      this.selectedDropdownIndustryValue = 'Select from the drop-down';
      this.selectedDropdownRoleValue = 'Select from the drop-down';
      this.selectedDropdownVendorValue = 'Select from the drop-down';
      this.EditButton = false;
    } else {
      const payload = {
        Data: {
          IdOrganization: Number(this.selectedOrganizationID),
          UserName: this.femployeeUserNameControl?.value,
          EmployeeId: this.empIdControl?.value,
          Name: this.employeeNameControl?.value,
          Email: '',
          PhoneNo: '',
          Password: this.empPasswordControl?.value,
          Status: '', //pass A static
          IdOrgHierarchy: Number(this.apiData?.user?.idOrgHierarchy),
          IdCmsRole: Number(this.selectedCmsIdRole), //pass static because get roles api is not working
        },
      };

      console.table(this.createCmsUser.value);
      console.log(this.payload);
      const escapedIdOrganization = JSON.stringify(payload.Data.IdOrganization);
      const escapedUserName = JSON.stringify(payload.Data.UserName);
      const escapedEmployeeId = JSON.stringify(payload.Data.EmployeeId);
      const escapedName = JSON.stringify(payload.Data.Name);
      const escapedEmail = JSON.stringify(payload.Data.Email);
      const escapedPhoneNo = JSON.stringify(payload.Data.PhoneNo);
      const escapedPassword = JSON.stringify(payload.Data.Password);
      const escapedStatus = JSON.stringify(payload.Data.Status);
      const escapedIdOrgHierarchy = JSON.stringify(payload.Data.IdOrgHierarchy);
      const escapedIdCmsRole = JSON.stringify(payload.Data.IdCmsRole);

      const escapedJsonString = `{\"IdOrganization\":${escapedIdOrganization},\"UserName\":${escapedUserName},\"EmployeeId\":${escapedEmployeeId},\"Name\":${escapedName},\"Email\":${escapedEmail},\"PhoneNo\":${escapedPhoneNo},\"Password\":${escapedPassword},\"Status\":${escapedStatus},\"IdOrgHierarchy\":${escapedIdOrgHierarchy}, \"IdCmsRole\":${escapedIdCmsRole}`;
      const jsonString = JSON.stringify(escapedJsonString);
      console.log(jsonString);
      const jsonStringremovelast = jsonString.slice(0, -1);
      const body = '{"Data":' + jsonStringremovelast + '}"}';
      console.log(body);
      console.table(this.createCmsUser.value);

      this.http.CreateUser(body).subscribe(
        (res) => {
          console.log(res);
          this.openModal('Done! The User has been created successfully.');
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            window.alert('404 Not Found Error');
          } else {
            window.alert(error.error);
          }
        }
      );
      this.createCmsUser.reset();
      this.selectedDropdownIndustryValue = 'Select from the drop-down';
      this.selectedDropdownRoleValue = 'Select from the drop-down';
      this.selectedDropdownVendorValue = 'Select from the drop-down';
    }
  }

  // ------------edit Cms user ----------------
  editCmsUSer(value: any) {
    console.log(value);
    this.getEditUserDetails = this.userDetailsList[value];
    console.log(this.getEditUserDetails);
    this.EditButton = true;
    // this.editOrzation = this.getOrganizationlist.map((elem:any) =>{
    //   if( elem.idOrganization==this.getEditUserDetails?.idOrganization)
    //  this.activeOrganization= this.getOrganizationlist.filter(
    //   (org: { idOrganization: string }) => org.idOrganization == this.getEditUserDetails?.idOrganization
    // );
    // });
    this.selectedDropdownIndustryValue =
      this.getEditUserDetails?.organizationName;

    // this.editRole = this.CmsRole.map((elem:any) =>{
    //   if( elem.idCmsRole==this.getEditUserDetails?.idCmsRole)
    //  this.activeRole= this.CmsRole.filter(
    //   (org: { idCmsRole: string }) => org.idCmsRole == this.getEditUserDetails?.idCmsRole
    // );
    // });
    this.selectedDropdownRoleValue = this.getEditUserDetails?.roleName;
    // console.log(this.getEditUserDetails);

    // console.log(this.getEditUserDetails.idCmsUser);

    this.EditIdCmsUser = this.getEditUserDetails?.idCmsUser;
    console.log(this.EditIdCmsUser);

    //  console.log(this.getOrganizationlist[value].organizationName);

    this.createCmsUser
      .get('employeeUserName')
      ?.setValue(this.getEditUserDetails?.userName);
    this.createCmsUser.get('employeeUserName')?.value || '';

    this.createCmsUser
      .get('employeeName')
      ?.setValue(this.getEditUserDetails?.name);
    this.createCmsUser.get('employeeName')?.value || '';

    this.createCmsUser
      .get('empId')
      ?.setValue(this.getEditUserDetails?.employeeId);
    this.createCmsUser.get('empId')?.value || '';

    this.createCmsUser
      .get('empPassword')
      ?.setValue(this.getEditUserDetails?.password);
    this.createCmsUser.get('empPassword')?.value || '';

    this.userDetailsList[value].userName;
    this.activeIndexSubTab = 0;
  }
}
