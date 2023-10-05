import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/pages/modal/modal.component';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-organization-hierarchy',
  templateUrl: './organization-hierarchy.component.html',
  styleUrls: ['./organization-hierarchy.component.scss'],
})
export class OrganizationHierarchyComponent implements OnInit, OnDestroy {
  @Input() user: any;

  isDisabled: boolean = true; // Initially, the button is not disabled
  vendorData: string = '';
  vendorNameHierarchy: string = '';
  creteAdminField!: FormGroup;
  createAdminResponse: any = [];

  subtab: any = [
    {
      label: 'Create Admin Role',
    },
    {
      label: 'Set Hierarchy',
    },
    {
      label: 'Display Admin Roles',
    },
  ];

  organisationName: any = [
    {
      organization: 'A] Client/Vendor XXX',
    },
  ];
  subprocess: boolean = true;
  processForm: FormGroup;
  processForm1: FormGroup;
  processForm2: FormGroup;
  activegetAdmindetails: string = '';
  adminInfo: boolean = false;
  activeIndexSubTab: any = 0;
  selectedDropdownValue: string = 'Organization';
  selectedDropdownIndustryValue: string = 'Select from the drop-down';
  subprocessIndex: string = '';
  processName: string = '';
  subTabName: string = 'create';
  id_org: any = [];
  id_cms_user: any = [];
  OrgHirerachtresponse: any = [];
  apiData: any;
  subprocessName: string = '';
  stageName: string = '';
  hierarchylevel: number = 1;
  descriptioninfo: string = '';
  getAdmindetails: any = [];
  getVendordetails: any = [];
  getOrgHierarchyResponse: any = [];

  totalCmsAdmin: string = '';
  activeRadiobutton = 0;
  ParentIdOrgHierarchy: number = 0;
  inactiveactivegetAdmindetails: string = '';
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
    {
      label: '',
      role: '',
      function: '',
    },
    {
      label: '',
      role: '',
      function: '',
    },
    {
      label: '',
      role: '',
      function: '',
    },
  ];

  count = [
    {
      label: 'Total',
      value: 80,
    },
    {
      label: 'Active',
      value: 64,
    },
    {
      label: 'Inactive',
      value: 16,
    },
  ];
  redirectedFrom: string = '';
  vendorForm: FormGroup;
  employeeName: any;
  employeeId: any;
  employeePassword: any;
  showpassword: boolean = false;
  processName1: any;
  organisationProcess: string = '';
  idhierarchy: string = '';
  idOrg: string = '';
  processList: any = [];
  subprocessList: any = [];
  stageList: any = [];
  vendorList: any = [];
  location: any;
  processNameRightSide: string = '';
  subprocessNameRightSide: string = '';
  desiredIndex: number = 1;
  SubIndex: number = 0;
  ProcessIndex: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private fb: FormBuilder,
    public http: ApiServiceService
  ) {
    this.vendorForm = this.fb.group({
      vendorName: new FormControl(''), // Initialize with an empty string
    });
    this.vendorForm = this.fb.group({
      vendorName: ['', [Validators.required]],
    });

    this.processForm = this.formBuilder.group({
      stage: this.formBuilder.array([]),
    });

    this.processForm1 = this.formBuilder.group({
      processRows: this.formBuilder.array([]),
    });

    this.processForm2 = this.formBuilder.group({
      subprocessRows: this.formBuilder.array([]),
    });

    this.creteAdminField = this.formBuilder.group({
      empName: [
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

  ngOnInit() {
    this.getApiData();
    this.GetOrgHierarchyTree();

    this.idhierarchy = this.apiData?.user?.idOrgHierarchy;
    this.idOrg = this.apiData?.user?.idOrganization;
    console.log(this.idhierarchy);
    console.log(this.idOrg);

    this.addProcessRow('page'); // Add one row by default
    this.addSubProcessRow('');
    this.addStageRow('');
    this.location = localStorage.getItem('tab');
    if (this.location == 'setHierarchy') {
      this.activeIndexSubTab = 1;
      this.subTabName = 'set';
    }
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

    switch (this.redirectedFrom) {
      case 'CubiCall Admin':
        this.subtab = [
          {
            label: 'Create Admin Role',
          },
          {
            label: 'Set Hierarchy',
          },
          {
            label: 'Display Admin Roles',
          },
        ];

        break;

      case 'Super Admin':
        this.subtab = [
          {
            label: 'Create Admin Role',
          },
          {
            label: 'Set Hierarchy',
          },
        ];

        break;

      case 'Admin':
        this.subtab = [
          {
            label: 'Set Hierarchy',
          },
        ];
        this.subTabName = 'set';
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
          {
            label: 'Display Admin Roles',
          },
        ];
        break;
    }
  }

  GetOrgHierarchyTree() {
    console.log(this.apiData?.user?.idOrganization);

    this.http
      .GetOrgHierarchyTree(
        this.apiData?.user?.idOrganization,
        this.apiData?.user?.idOrgHierarchy
      )
      .subscribe((res) => {
        this.getOrgHierarchyResponse = res;
        console.log(this.getOrgHierarchyResponse);

        this.vendorList = this.getOrgHierarchyResponse.filter(
          (org: { hirarchyLevelType: string }) =>
            org?.hirarchyLevelType === 'Vendor - Client'
        );
        console.log(this.vendorList);

        this.processList = this.getOrgHierarchyResponse.filter(
          (org: { hirarchyLevelType: string }) =>
            org?.hirarchyLevelType === 'Process'
        );
        console.log(this.processList);

        this.subprocessList = this.getOrgHierarchyResponse.filter(
          (org: { hirarchyLevelType: string }) =>
            org?.hirarchyLevelType === 'Sub Process'
        );
        console.log(this.subprocessList);

        this.navigateToSubprocess('subprocess', 0);

        // this.stageList = this.getOrgHierarchyResponse.filter(
        //   (org: { hirarchyLevelType: string }) =>
        //     org?.hirarchyLevelType === 'Stage'
        // );

        // console.log(this.stageList);
        // this.navigateToSubprocess('stage', 0);

        // const processRowsArray = this.processForm1.get(
        //   'processRows'
        // ) as FormArray;
        // console.log(processRowsArray);
        // const rowIndex = 0; // Change this to the desired row index.
        // if (rowIndex >= 0 && rowIndex < processRowsArray.length) {
        //   // Get the FormGroup representing the row at the specified index.
        //   const rowFormGroup = processRowsArray.at(rowIndex) as FormGroup;

        //   // Check if the FormGroup and the processName control exist.
        //   if (rowFormGroup && rowFormGroup.get('processName')) {
        //     // Set the value of the processName control.
        //     rowFormGroup
        //       .get('processName')
        //       ?.setValue(this.getOrgHierarchyResponse[0]?.hirarchyLevelType);
        //   }
        // }
        // this.processName1
        //   .get('processName')
        //   ?.setValue(this.getOrgHierarchyResponse[0]?.hirarchyLevelType);
        // this.processName1.get('processName')?.value || '';
      });
  }

  updateInputState(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.trim();
    console.log(inputValue);

    if (inputValue === null || inputValue === '') {
      this.isDisabled = true; // Disable the input field when it's null or empty
    } else {
      this.isDisabled = false; // Enable the input field when it has a value
    }
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;
    console.log(this.activeIndexSubTab);
    if (this.activeIndexSubTab == 0) {
      this.subTabName = 'create';
    } else if (this.activeIndexSubTab == 1) {
      this.subTabName = 'set';
      this.getVendorDetails('');
    } else if (this.activeIndexSubTab == 2) {
      this.subTabName = 'display';
      this.getCMSAdmindetails();
    }
  }
  getCMSAdmindetails() {
    this.http
      .getAdminUserDetails(this.apiData?.user?.idOrganization)
      .subscribe((res) => {
        console.log(res);
        this.getAdmindetails = res;

        this.totalCmsAdmin = this.getAdmindetails;

        this.count[0].value = this.getAdmindetails.length;
        this.activegetAdmindetails = this.getAdmindetails.filter(
          (org: { status: string }) => org.status === 'A'
        );

        this.count[1].value = this.activegetAdmindetails.length;
        this.inactiveactivegetAdmindetails = this.getAdmindetails.filter(
          (org: { status: string }) => org.status === 'D'
        );

        this.count[2].value = this.inactiveactivegetAdmindetails.length;
      });
  }

  getVendorDetails(page: any) {
    console.log(this.idhierarchy);
    console.log(this.idOrg);

    this.http
      .getVendorDetails(
        this.apiData?.role?.idOrganization,
        this.apiData?.user?.idOrgHierarchy
      )
      .subscribe((res) => {
        this.organisationName = res;
        console.log(this.organisationName);
        this.organisationProcess = this.organisationName[1].idOrgHierarchy;
        console.log(this.organisationProcess);

        this.processForm1
          .get('processName')
          ?.setValue(this.organisationProcess);
        this.processForm1.get('processName')?.value || '';
      });
  }

  changeFilter(index: any) {
    if (index == 0) {
      this.getAdmindetails = this.totalCmsAdmin;
    } else if (index == 1) {
      this.getAdmindetails = this.activegetAdmindetails;
    } else if (index == 2) {
      this.getAdmindetails = this.inactiveactivegetAdmindetails;
    }
  }

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue =
      this.organisationName[value].hierarchyName;
    console.log(this.selectedDropdownIndustryValue);
    this.ParentIdOrgHierarchy = this.organisationName[value]?.idOrgHierarchy;
    console.log(this.ParentIdOrgHierarchy);
    this.vendorNameHierarchy = this.selectedDropdownIndustryValue;
    this.postOrganisationHierarchy(this.selectedDropdownIndustryValue, '');
  }

  addProcessRow(page: any) {
    const processRows = this.processForm1.get('processRows') as FormArray;
    processRows.push(
      this.formBuilder.group({
        processName: [null], // Set initial value to null
      })
    );

    const newIndex = processRows.value.length - 2; // Index of the newly added FormGroup
    console.log(newIndex);
    console.log(this.processRows);

    console.log(this.processRows?.value.at(newIndex));

    this.processName1 = this.processRows.at(newIndex).get('processName')?.value;

    console.log(this.processName1);
    if (page == 'process') {
      if (this.processName1.length > 0) {
        this.postOrganisationHierarchy(page, this.processName1);
      }
    }
    this.GetOrgHierarchyTree();
  }

  addSubProcessRow(page: any) {
    console.log(page);

    const subprocessRows = this.processForm2.get('subprocessRows') as FormArray;
    subprocessRows.push(
      this.formBuilder.group({
        subprocessName: [null], // Set initial value to null
      })
    );

    const newIndexsubprocess = subprocessRows.value.length - 2; // Index of the newly added FormGroup
    console.log(newIndexsubprocess);
    console.log(this.subprocessRows);

    console.log(this.subprocessRows?.value.at(newIndexsubprocess));

    this.subprocessName = this.subprocessRows
      .at(newIndexsubprocess)
      .get('subprocessName')?.value;
    console.log(this.subprocessName);
    if (page == 'subprocess') {
      if (this.subprocessName.length > 0) {
        this.postOrganisationHierarchy(page, this.subprocessName);
      }
    }
    this.GetOrgHierarchyTree();

    // this.createHierarchy(this.subprocessName);
  }

  addStageRow(page: any) {
    const stage = this.processForm.get('stage') as FormArray;
    stage.push(
      this.formBuilder.group({
        stageName: [null], // Set initial value to null
      })
    );

    const newIndexstage = stage.length - 2; // Index of the newly added FormGroup
    console.log(newIndexstage);
    console.log(this.stage);

    console.log(this.stage?.value.at(newIndexstage));

    this.stageName = this.stage.at(newIndexstage).get('stageName')?.value;
    console.log(this.stageName);
    if (page == 'stage') {
      if (this.stageName.length > 0) {
        this.postOrganisationHierarchy(page, this.stageName);
      }
    }
    this.GetOrgHierarchyTree();
    // this.createHierarchy(this.subprocessName);
  }

  removeProcessRow(index: number) {
    if (index > 0) {
      const processRows = this.processForm1.get('processRows') as FormArray;
      processRows.removeAt(index);

      const subprocessRows = this.processForm.get(
        'subprocessRows'
      ) as FormArray;
      subprocessRows.removeAt(index);

      const stage = this.processForm.get('stage') as FormArray;
      stage.removeAt(index);
    }
  }

  get processRows(): FormArray {
    return this.processForm1.get('processRows') as FormArray;
  }

  get subprocessRows(): FormArray {
    return this.processForm2.get('subprocessRows') as FormArray;
  }

  get stage(): FormArray {
    return this.processForm.get('stage') as FormArray;
  }

  get empNameControl(): FormArray {
    return this.creteAdminField.get('empName') as FormArray;
  }
  get empIdControl(): FormArray {
    return this.creteAdminField.get('empId') as FormArray;
  }
  get empPasswordControl(): FormArray {
    return this.creteAdminField.get('empPassword') as FormArray;
  }

  navigateToSubprocess(process: any, index: any) {
    console.log(index);

    console.log(process);

    this.subprocessIndex = index + 1;
    this.processName = process;
    if (process == 'subprocess') {
      this.subprocess = false;
      console.log(this.ProcessIndex);

      this.ProcessIndex = index;
      console.log(process);
      console.log(this.processList[index]);

      this.subprocessList = this.getOrgHierarchyResponse.filter(
        (org: { idParentOrganizationHirarchy: number }) =>
          org?.idParentOrganizationHirarchy ===
          this.processList[index]?.idOrganizationHirarchy
      );
      console.log(this.subprocessList);

      this.processNameRightSide = this.processList[index].hierarchyName;
      console.log(this.processNameRightSide);
      this.ParentIdOrgHierarchy =
        this.processList[index]?.idOrganizationHirarchy;
    } else if (process == 'process') {
      //  this.ProcessIndex = index;
      console.log(this.processList[index]);
      this.subprocess = true;
      console.log(process);
    } else {
      this.subprocess = false;
      console.log(process);
      console.log(this.subprocessList[index]);

      this.SubIndex = index;
      this.stageList = this.getOrgHierarchyResponse.filter(
        (org: { idParentOrganizationHirarchy: number }) =>
          org?.idParentOrganizationHirarchy ===
          this.subprocessList[index]?.idOrganizationHirarchy
      );

      this.subprocessNameRightSide = this.subprocessList[index]?.hierarchyName;
      console.log(this.subprocessNameRightSide);
      this.ParentIdOrgHierarchy =
        this.subprocessList[index]?.idOrganizationHirarchy;
    }

    console.log(this.subprocess);
  }

  createAdminInfo() {
    this.onSubmit();
    this.ParentIdOrgHierarchy = this.apiData?.user?.idOrgHierarchy;
    this.hierarchylevel = 2;
    this.createHierarchy();
    this.adminInfo = true;
    console.log(this.adminInfo);
  }

  createHierarchy() {
    const payload = {
      Data: {
        IdOrganization: Number(this.apiData?.user?.idOrganization),
        IdCmsUser: Number(this.apiData?.user?.idCmsUser),
        ParentIdOrgHierarchy: this.ParentIdOrgHierarchy,
        HierarchyName: this.vendorNameHierarchy,
        HirLevel: this.hierarchylevel,
      },
    };
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedIdCMSUser = JSON.stringify(payload.Data.IdCmsUser);
    const escapedParentIdOrgHierarchy = JSON.stringify(
      payload.Data.ParentIdOrgHierarchy
    );
    const escapedHierarchyName = JSON.stringify(payload.Data.HierarchyName);
    const escapedHirLevel = JSON.stringify(payload.Data.HirLevel);

    console.log(payload);
    const escapedJsonString = `{\"IdOrganization\":${escapedIdOrg},\"IdCmsUser\":${escapedIdCMSUser},\"ParentIdOrgHierarchy\":${escapedParentIdOrgHierarchy},\"HierarchyName\":${escapedHierarchyName},\"HirLevel\":${escapedHirLevel}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';
    console.log(body);

    this.http.createOrganisationHierarchy(body).subscribe(
      (res) => {
        console.log(res);
        this.OrgHirerachtresponse = res;
        this.ParentIdOrgHierarchy = this.OrgHirerachtresponse.idOrgHierarchy;
        if (this.hierarchylevel == 5) {
          // this.openModal();
        }
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
  }

  postOrganisationHierarchy(pageInfo: any, description: any) {
    console.log(description);

    this.getVendorDetails(pageInfo);
    this.descriptioninfo = description;
    console.log(pageInfo);
    if (pageInfo == 'process') {
      this.hierarchylevel = 3;
      this.ParentIdOrgHierarchy = this.apiData?.user?.idOrgHierarchy;
      this.vendorNameHierarchy = description;
      console.log(this.ParentIdOrgHierarchy);
      this.openModalProcess();
    } else if (pageInfo == 'subprocess') {
      // this.ParentIdOrgHierarchy =
      this.hierarchylevel = 4;
      this.vendorNameHierarchy = description;
      this.openModalSubProcess();
    } else if (pageInfo == 'stage') {
      this.hierarchylevel = 5;
      this.vendorNameHierarchy = description;
      this.openModalStageProcess();
    } else {
      this.hierarchylevel = 2;
    }
    this.createHierarchy();
  }

  submitOrgHierarchy() {
    this.SubmitCreateAdminUser();
    this.openModal();
  }
  openModal() {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    // You can pass data to the modal if needed
    modalRef.componentInstance.someData =
      'Done! Admin Role has been assigned for this Client/ Vendor. Do you want to add another vendor or Set up the hierarchy for this vendor.';
    modalRef.componentInstance.screen = 'Setup';
  }

  openModalProcess() {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    // You can pass data to the modal if needed
    modalRef.componentInstance.someData =
      'Done! The Process has been created successfully.';
    modalRef.componentInstance.screen = '';
  }

  openModalSubProcess() {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    // You can pass data to the modal if needed
    modalRef.componentInstance.someData =
      'Done! The SubProcess has been created successfully.';
    modalRef.componentInstance.screen = '';
  }

  openModalStageProcess() {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    // You can pass data to the modal if needed
    modalRef.componentInstance.someData =
      'Done! The Stage has been created successfully.';
    modalRef.componentInstance.screen = '';
  }
  onSubmit() {
    if (this.vendorForm.valid) {
      // Form is valid, submit the data
      this.vendorNameHierarchy = this.vendorForm.value.vendorName;
      // Handle the submission, e.g., send the vendorName to an API or perform an action
      console.log('Submitted vendor name: ', this.vendorNameHierarchy);
    } else {
      // Form is invalid, display error messages or take appropriate action
      console.error('Form is invalid. Please check the fields.');
    }
  }
  SubmitCreateAdminUser() {
    this.employeeName = this.creteAdminField.value.empName;
    this.employeeId = this.creteAdminField.value.empId;
    this.employeePassword = this.creteAdminField.value.empPassword;

    const payload = {
      Data: {
        IdOrganization: Number(this.apiData?.user?.idOrganization),
        UserName: this.employeeId,
        ParentIdOrgHierarchy: 0,
        Name: this.employeeName,
        Email: this.employeeId,
        PhoneNo: '',
        Password: this.employeePassword,
        IdOrgHierarchy: this.OrgHirerachtresponse?.idOrgHierarchy,
        IdCmsRole: Number(this.apiData?.user?.idCmsRole),
      },
    };

    // const escapedJsonString = `{\"IdOrganization\":${escapedIdOrg},\"IdCmsUser\":${escapedIdCMSUser},\"ParentIdOrgHierarchy\":${escapedParentIdOrgHierarchy},\"HierarchyName\":${escapedHierarchyName}`;
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedUserName = JSON.stringify(payload.Data.UserName);
    const escapedParentIdOrgHierarchy = JSON.stringify(
      payload.Data.ParentIdOrgHierarchy
    );
    const escapedName = JSON.stringify(payload.Data.Name);
    const escapedPhoneNo = JSON.stringify(payload.Data.PhoneNo);
    const escapedPassword = JSON.stringify(payload.Data.Password);
    const escapedIdOrgHierarchy = JSON.stringify(payload.Data.IdOrgHierarchy);
    const escapedIdEmail = JSON.stringify(payload.Data.Email);

    const escapedIdCmsRole = JSON.stringify(payload.Data.IdCmsRole);

    const escapedJsonString = `{\"IdOrganization\":${escapedIdOrg},\"UserName\":${escapedUserName},\"Name\":${escapedName},\"Email\":${escapedIdEmail},\"PhoneNo\":${escapedPhoneNo},\"Password\":${escapedPassword},\"IdOrgHierarchy\":${escapedIdOrgHierarchy},\"IdCmsRole\":${escapedIdCmsRole}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    this.http.createAdminUser(body).subscribe((res) => {
      console.log(res);
      this.createAdminResponse = res;
      this.http
        .postVerificationEmail(
          this.createAdminResponse?.idOrganization,
          this.createAdminResponse?.idCmsUser
        )
        .subscribe((res) => {
          console.log(res);
        });
    });
  }
  togglePasswordVisibility() {
    this.showpassword = !this.showpassword;
  }

  createAdminUser() {}
  ngOnDestroy() {
    localStorage.removeItem('tab');
  }
}
