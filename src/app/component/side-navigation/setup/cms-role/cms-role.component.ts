import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/pages/modal/modal.component';

@Component({
  selector: 'app-cms-role',
  templateUrl: './cms-role.component.html',
  styleUrls: ['./cms-role.component.scss'],
})
export class CmsRoleComponent {
  @Input() user: any;

  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;
  selectedDropdownIndustryValue: string = 'Select from the drop-down';
  selectedDropdownBusinessTypeValue: string = 'Select from the drop-down';
  selectedDropdownRoleTypeValue: string = 'Select from the drop-down';
  activeIndexSubTab: any = 0;
  activeIndexTab: any;
  activeUpdateButton: boolean = false;
  RoleFunctionList: any = [];
  idOrganization: any = '';
  idCmsRole: any = '';
  CmsRoleList: any = [];
  getOrganizationlist: any = [];
  getRoleTypelist: any = [];
  functionName: string = '';
  functionDescription: string = '';
  totalCmsRolelist: string = '';
  activeCmsRolelist: string = '';
  inactivCmsRoleList: string = '';
  activeRadiobutton = 0;
  organizationName: string = '';
  createFunctionForm: FormGroup;
  createCMSForm: FormGroup;
  apiData: any;
  selectedDropdownIdRoleTypeValue: Number = 0;
  isDisabledCreateFunction: Boolean = true;
  isDisabledCreateUser: Boolean = true;
  idFunction: any = [];
  selectedOrganizationID: any;
  getEditCmsRoleDetails: any = [];
  EditIdsFunction: any = [];
  activeCmsRoleFunction: any = [];
  activeFunctionID: any;
  redirectedFrom: string = '';
  CmsRoleListResponse: any = [];
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
  cmsRoleName: string = '';
  cmsFunctionName: string = '';
  idOrgUser: string = '';
  getRole: any = [];
  constructor(
    public http: ApiServiceService,
    public _router: Router,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.createCMSForm = this.fb.group({
      cmsRoleName: ['', Validators.required],
      cmsRoleDescription: ['', Validators.required],
    });

    this.createFunctionForm = this.fb.group({
      functionName: ['', Validators.required],
      functionDescription: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.getApiData();

    this.NavigateToSubTab(0);
  }

  getApiData() {
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
    });
    this.redirectedFrom = this.user?.key1
      ? this.user?.key1
      : this.apiData?.role?.roleName;

    if (this.apiData?.role.roleName == this.user?.key1) {
      this.selectedDropdownIndustryValue = this.apiData?.role?.organizationName;
      this.selectedOrganizationID = this.apiData?.role?.idOrganization;
    }
    switch (this.redirectedFrom) {
      case 'CubiCall Admin':
        this.subtab = [
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

        break;

      case 'Super Admin':
        this.subtab = [
          {
            label: 'Create CMS Role',
          },
          {
            label: 'Display CMS Role List',
          },
        ];

        break;

      case 'Admin':
        this.subtab = [
          {
            label: 'Create CMS Role',
          },
          {
            label: 'Display CMS Role List',
          },
        ];
        break;

      default:
        // Handle the default case if the user role is unknown or not recognized
        this.subtab = [
          {
            label: 'Create Admin Role',
          },
          {
            label: 'Set Hierarchy',
          },
        ];
        break;
    }
  }

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue =
      this.getOrganizationlist[value].organizationName;
    this.selectedOrganizationID =
      this.getOrganizationlist[value].idOrganization;
  }
  updateSelectedBusinessTypeValue(value: any) {
    this.selectedDropdownBusinessTypeValue = value;
  }
  updateSelectedgetRoleTypeValue(value: any) {
    this.selectedDropdownRoleTypeValue =
      this.getRoleTypelist[value].roleTypeName;

    this.selectedDropdownIdRoleTypeValue =
      this.getRoleTypelist[value].idRoleType;
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;

    if (this.activeIndexSubTab == 0) {
      this.getCmsRole_Function_List();
      this.GetRoleTypesList();
    } else if (this.activeIndexSubTab == 1) {
      this.getCmsRoleList();
    }
  }
  selectOption(index: any) {
    this.activeIndexTab = index;
  }

  getCmsRole_Function_List() {
    this.idOrganization = this.apiData?.user?.idOrganization;
    this.http.GetCmsRoleFunctionList(this.idOrganization).subscribe((data) => {
      this.RoleFunctionList = data;
    });
  }
  getOrganization() {
    this.http.getOrganisation().subscribe((res) => {
      this.getOrganizationlist = res;
    });
  }
  GetRoleTypesList() {
    this.http.getRoleType().subscribe((res) => {
      this.getRole = res;
      const filteredRoles = this.getRole.filter(
        (role: { idRoleType: number }) =>
          role.idRoleType > this.apiData?.role?.idRoleType
      );

      this.getRoleTypelist = filteredRoles;
    });
  }

  checkBoxvalue(event: any, idFunction: any) {
    this.idFunction.push(idFunction);
  }
  getCmsRoleList() {
    if (this.apiData?.user?.idOrganization === 1) {
      this.idOrganization = -this.apiData?.user?.idOrganization;
      this.idCmsRole = -this.apiData?.user?.idCmsRole;
    } else {
      this.idOrganization = this.apiData?.user?.idOrganization;
      this.idCmsRole = -1;
    }
    this.http
      .getRolesList(this.idOrganization, this.idCmsRole)
      .subscribe((res) => {
        if (this.apiData?.role?.idRoleType > 2) {
          this.CmsRoleListResponse = res;

          this.CmsRoleList = this.CmsRoleListResponse.filter(
            (org: { idRoleType: number }) =>
              org.idRoleType !== 1 &&
              org.idRoleType !== 2 &&
              org.idRoleType !== 3
          );
        } else if (this.apiData?.role?.idRoleType == 2) {
          this.CmsRoleListResponse = res;

          this.CmsRoleList = this.CmsRoleListResponse.filter(
            (org: { idRoleType: number }) =>
              org.idRoleType !== 1 && org.idRoleType !== 2
          );
        } else {
          this.CmsRoleList = res;
        }

        this.totalCmsRolelist = this.CmsRoleList;
        this.count[0].value = this.CmsRoleList.length;
        this.activeCmsRolelist = this.CmsRoleList.filter(
          (org: { status: string }) => org.status === 'A'
        );

        this.count[1].value = this.activeCmsRolelist.length;
        this.inactivCmsRoleList = this.CmsRoleList.filter(
          (org: { status: string }) => org.status === 'D'
        );

        this.count[2].value = this.inactivCmsRoleList.length;
      });
  }

  viewFunction(value: any) {
    this.functionName = this.RoleFunctionList[value].functionName;
    this.functionDescription = this.RoleFunctionList[value].description;
  }
  viewCmsRole(value: any) {
    //  this.organizationName=this.CmsRoleList[value]
    this.cmsRoleName = this.CmsRoleList[value].roleName;
    this.cmsFunctionName = this.CmsRoleList[value].idsFunction;
    this.organizationName = this.CmsRoleList[value].organizationName;
  }

  changeFilter(index: any) {
    if (index == 0) {
      this.CmsRoleList = this.totalCmsRolelist;
    } else if (index == 1) {
      this.CmsRoleList = this.activeCmsRolelist;
    } else if (index == 2) {
      this.CmsRoleList = this.inactivCmsRoleList;
    }
  }

  get functionNameControl() {
    return this.createFunctionForm.get('functionName');
  }

  get functionDescriptionControl() {
    return this.createFunctionForm.get('functionDescription');
  }
  updateInputState(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.trim();
    if (inputValue === null || inputValue === '') {
      this.isDisabledCreateFunction = true; // Disable the input field when it's null or empty
    } else {
      this.isDisabledCreateFunction = false; // Enable the input field when it has a value
    }
  }
  openModal(msg: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    // You can pass data to the modal if needed
    modalRef.componentInstance.someData = msg;
    modalRef.componentInstance.screen = 'function';
  }

  createFunctionOnSubmit() {
    const payload = {
      Data: {
        FunctionName: this.functionNameControl?.value,
        Description: this.functionDescriptionControl?.value,
        IdOrganization: Number(this.apiData?.user?.idOrganization),
        IsActive: this.apiData?.user?.status,
      },
    };

    const escapeFunctionName = JSON.stringify(payload.Data.FunctionName);
    const escapeFunctionDescription = JSON.stringify(payload.Data.Description);
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedStatus = JSON.stringify(payload.Data.IsActive);

    const escapedJsonString = `{\"FunctionName\":${escapeFunctionName},\"Description\":${escapeFunctionDescription},\"IdOrganization\":${escapedIdOrg},\"IsActive\":${escapedStatus}`;
    const jsonString = JSON.stringify(escapedJsonString);

    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    console.table(this.createFunctionForm.value);

    this.http.CreateFunction(body).subscribe(
      (res) => {
        this.openModal('Done! The Function has been created successfully.');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          window.alert('404 Not Found Error');
          // Handle the 404 error, such as displaying a message to the user
        } else {
          window.alert(error.error);
          // Handle other errors
        }
      }
    );

    this.createFunctionForm.reset();
  }

  // --------  Create Role  --------

  get cmsRoleNameControl() {
    return this.createCMSForm.get('cmsRoleName');
  }
  get cmsRoleDescriptionControl() {
    return this.createCMSForm.get('cmsRoleDescription');
  }
  updateCreateUserInputState(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.trim();
    if (inputValue === null || inputValue === '') {
      this.isDisabledCreateUser = true; // Disable the input field when it's null or empty
    } else {
      this.isDisabledCreateUser = false; // Enable the input field when it has a value
    }
  }
  CreateCmsRoleOnSubmit() {
    const payload = {
      Data: {
        IdOrganization: Number(this.selectedOrganizationID),
        RoleName: this.cmsRoleNameControl?.value,
        IdsFunction: this.idFunction.toString(),
        Description: this.cmsRoleDescriptionControl?.value,
        Status: '',
        IdRoleType: this.selectedDropdownIdRoleTypeValue,
      },
    };

    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedRoleName = JSON.stringify(payload.Data.RoleName);
    const escapedIdsFunction = JSON.stringify(payload.Data.IdsFunction);
    const escapedDescription = JSON.stringify(payload.Data.Description);
    const escapedStatus = JSON.stringify(payload.Data.Status);
    const escapedIdRoleType = JSON.stringify(payload.Data.IdRoleType);

    const escapedJsonString = `{\"IdOrganization\":${escapedIdOrg},\"RoleName\":${escapedRoleName},\"IdsFunction\":${escapedIdsFunction},"Description\":${escapedDescription},\"Status\":${escapedStatus},"IdRoleType\":${escapedIdRoleType}`;
    const jsonString = JSON.stringify(escapedJsonString);

    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    console.table(this.createCMSForm.value);

    this.http.createCmsRole(body).subscribe(
      (res) => {
        this.openModal('Done! The Role has been created successfully.');
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          window.alert('404 Not Found Error');
        } else {
          window.alert(error.error);
        }
      }
    );

    this.createCMSForm.reset();
    this.idFunction = [];
    //this.selectedDropdownIndustryValue = 'Select from the drop-down';
    this.selectedDropdownRoleTypeValue = 'Select from the drop-down';
    this.checkboxes.forEach((element: any) => {
      element.nativeElement.checked = false;
    });
  }

  // -------edit role------------

  editCmsRole(value: any) {
    this.activeIndexSubTab = 0;

    this.getEditCmsRoleDetails = this.CmsRoleList[value];

    // console.log(this.getEditCmsRoleDetails.functions[0].idFunction);
    for (var index1 in this.getEditCmsRoleDetails.functions) {
      this.EditIdsFunction =
        this.getEditCmsRoleDetails.functions[index1].idFunction;
    }

    //     this.RoleFunctionList = this.getEditCmsRoleDetails.functions.map((elem:any) =>elem.idFunction);

    // console.log(this.RoleFunctionList);

    // const newArray = this.RoleFunctionList.filter((elem:any,index:any) => {
    // console.log(elem.idFunction);
    // console.log(array1_Values.includes(elem.idFunction));
    // this.EditIdsFunction=[]
    //   if (array1_Values.includes(elem.idFunction) == true ){

    //     // console.log(elem.idFunction,elem.isActive);
    //      this.activeFunctionID=elem.idFunction
    //      console.log(this.activeFunctionID);
    //       this.checkBoxvalue(event,this.activeFunctionID)
    //      this.checkboxes.forEach((element: any) => {
    //        console.log('hello');

    //       element.nativeElement.checked = true;
    //     });
    //     // elem.title = 'none';
    //     // return elem;
    //   }
    // })
    // this.getEditCmsRoleDetails.functions.forEach((element: any,index:any) => {
    // this.EditIdsFunction.push(this.getEditCmsRoleDetails.functions[index].idFunction)
    // });
    // this.activeCmsRoleFunction === this.RoleFunctionList.filter(

    // );

    this.selectedDropdownIndustryValue =
      this.getEditCmsRoleDetails?.organizationName;
    this.selectedDropdownRoleTypeValue =
      this.getRoleTypelist[
        this.getEditCmsRoleDetails?.idRoleType - 1
      ]?.roleTypeName;
    this.createCMSForm
      .get('cmsRoleName')
      ?.setValue(this.getEditCmsRoleDetails?.roleName);
    this.createCMSForm.get('cmsRoleName')?.value || '';
    this.createCMSForm
      .get('cmsRoleDescription')
      ?.setValue(this.getEditCmsRoleDetails?.description);
    this.createCMSForm.get('cmsRoleDescription')?.value || '';

    // this.domainEmailEdit = this.getEditDetails?.domainEmailId;
    // this.multiFieldForm.get('domainEmail')?.setValue(this.domainEmailEdit);
    // this.multiFieldForm.get('domainEmail')?.value || '';
  }
}
