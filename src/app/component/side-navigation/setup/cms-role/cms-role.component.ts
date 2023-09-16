import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
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
  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>;
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
  createCMSForm: FormGroup
  apiData: any;
  selectedDropdownIdRoleTypeValue: Number = 0
  isDisabledCreateFunction:boolean = true;
  isDisabledCreateUser: boolean = true;
  idFunction: any = []
  selectedOrganizationID: any
  getEditCmsRoleDetails:any=[]
  EditIdsFunction:any=[]
  activeCmsRoleFunction:any=[]
  activeFunctionID:any
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

  constructor(public http: ApiServiceService, public _router: Router, private fb: FormBuilder,
    private modalService: NgbModal,
  ) {
    console.log(this.activeUpdateButton);

    this.createCMSForm = this.fb.group({
      cmsRoleName: ['', Validators.required],
      cmsRoleDescription: ['', Validators.required],
    })

    this.createFunctionForm = this.fb.group({
      functionName: ['', Validators.required],
      functionDescription: ['', Validators.required],
    })


  }
  ngOnInit(): void {
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      console.log(this.apiData);
    });

    this.NavigateToSubTab(0);
  }

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue = this.getOrganizationlist[value].organizationName;
    this.selectedOrganizationID = this.getOrganizationlist[value].idOrganization;

  }
  updateSelectedBusinessTypeValue(value: any) {
    this.selectedDropdownBusinessTypeValue = value;
  }
  updateSelectedgetRoleTypeValue(value: any) {
    this.selectedDropdownRoleTypeValue = this.getRoleTypelist[value].roleTypeName;

    this.selectedDropdownIdRoleTypeValue = this.getRoleTypelist[value].idRoleType;
    console.log(this.selectedDropdownRoleTypeValue, this.selectedDropdownIdRoleTypeValue);

  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;
    console.log(this.activeIndexSubTab);

    if (this.activeIndexSubTab == 0) {
      this.getCmsRole_Function_List();
      this.GetRoleTypesList()
    }
    else if (this.activeIndexSubTab == 1) {
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
      console.log(this.apiData);
    });


  }
  getOrganization() {
    this.http.getOrganisation().subscribe((res) => {
      console.log(res);
      this.getOrganizationlist = res;
    });
  }
  GetRoleTypesList() {
    this.http.getRoleType().subscribe((res) => {
      this.getRoleTypelist = res;
      console.log(this.getRoleTypelist);
    });

  }

  checkBoxvalue(event: any, idFunction: any) {
    console.log(event.currentTarget.checked)
    console.log('id Function', idFunction);
    this.idFunction.push(idFunction)
  }
  getCmsRoleList() {
    if (this.apiData?.user?.idOrganization === 1) {
      this.idOrganization = -this.apiData?.user?.idOrganization;
      this.idCmsRole = -this.apiData?.user?.idCmsRole
    }
    else {
      this.idOrganization = this.apiData?.user?.idOrganization;
      this.idCmsRole = -1
    }
    this.http.getRolesList(this.idOrganization, this.idCmsRole).subscribe((res) => {
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
    this.organizationName = this.CmsRoleList[value].organizationName;
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
    modalRef.componentInstance.someData = msg
      ;
    modalRef.componentInstance.screen = 'function';
  }

  createFunctionOnSubmit() {
    console.log('hello');
    const payload = {
      Data: {
        FunctionName: this.functionNameControl?.value,
        Description: this.functionDescriptionControl?.value,
        IdOrganization: Number(this.apiData?.user?.idOrganization),
        IsActive: this.apiData?.user?.status
      },
    };
    console.log(payload);
    const escapeFunctionName = JSON.stringify(payload.Data.FunctionName);
    const escapeFunctionDescription = JSON.stringify(payload.Data.Description);
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedStatus = JSON.stringify(payload.Data.IsActive)

    const escapedJsonString = `{\"FunctionName\":${escapeFunctionName},\"Description\":${escapeFunctionDescription},\"IdOrganization\":${escapedIdOrg},\"IsActive\":${escapedStatus}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';
    console.log(body);
    console.table(this.createFunctionForm.value);


    this.http.CreateFunction(body).subscribe(
      (res) => {
        console.log(res);
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


    this.createFunctionForm.reset()


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
    console.log(this.createCMSForm.value);
    console.log(this.idFunction.toString());
    const payload = {
      Data: {
        IdOrganization: Number(this.selectedOrganizationID),
        RoleName: this.cmsRoleNameControl?.value,
        IdsFunction: this.idFunction.toString(),
        Description: this.cmsRoleDescriptionControl?.value,
        Status: '',
        IdRoleType: this.selectedDropdownIdRoleTypeValue
      },
    };
    console.log(payload);
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedRoleName = JSON.stringify(payload.Data.RoleName);
    const escapedIdsFunction = JSON.stringify(payload.Data.IdsFunction);
    const escapedDescription = JSON.stringify(payload.Data.Description)
    const escapedStatus = JSON.stringify(payload.Data.Status)
    const escapedIdRoleType = JSON.stringify(payload.Data.IdRoleType)


    const escapedJsonString = `{\"IdOrganization\":${escapedIdOrg},\"RoleName\":${escapedRoleName},\"IdsFunction\":${escapedIdsFunction},"Description\":${escapedDescription},\"Status\":${escapedStatus},"IdRoleType\":${escapedIdRoleType}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';
    console.log(body);
    console.table(this.createCMSForm.value);

    this.http.createCmsRole(body).subscribe(
      (res) => {
        console.log(res);
        this.openModal('Done! The Role has been created successfully.')
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
    this.selectedDropdownIndustryValue = 'Select from the drop-down';
    this.selectedDropdownRoleTypeValue = 'Select from the drop-down';
    this.checkboxes.forEach((element: any) => {
      element.nativeElement.checked = false;
    });
  }



  // -------edit role------------

  editCmsRole(value: any) {
    console.log(value);
    this.activeIndexSubTab = 0;
    
    this.getEditCmsRoleDetails=this.CmsRoleList[value]
    console.log(this.getEditCmsRoleDetails);
   
    // console.log(this.getEditCmsRoleDetails.functions[0].idFunction);
    for (var index1 in this.getEditCmsRoleDetails.functions) {
      console.log(this.getEditCmsRoleDetails.functions[index1].idFunction);
      this.EditIdsFunction=this.getEditCmsRoleDetails.functions[index1].idFunction
    }
    console.log(this.EditIdsFunction);
    
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
    console.log( this.EditIdsFunction);
    // this.activeCmsRoleFunction === this.RoleFunctionList.filter(
           
    // );
  

    this.selectedDropdownIndustryValue= this.getEditCmsRoleDetails?.organizationName;
    this.selectedDropdownRoleTypeValue=this.getRoleTypelist[this.getEditCmsRoleDetails?.idRoleType-1]?.roleTypeName
    this.createCMSForm.get('cmsRoleName')?.setValue(this.getEditCmsRoleDetails?.roleName);
    this.createCMSForm.get('cmsRoleName')?.value || '';
    this.createCMSForm.get('cmsRoleDescription')?.setValue(this.getEditCmsRoleDetails?.description);
    this.createCMSForm.get('cmsRoleDescription')?.value || '';

    // this.domainEmailEdit = this.getEditDetails?.domainEmailId;
    // this.multiFieldForm.get('domainEmail')?.setValue(this.domainEmailEdit);
    // this.multiFieldForm.get('domainEmail')?.value || '';


  }

}
