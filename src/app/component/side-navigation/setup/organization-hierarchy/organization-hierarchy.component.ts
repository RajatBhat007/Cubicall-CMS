import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class OrganizationHierarchyComponent implements OnInit {
  isDisabled: boolean = true; // Initially, the button is not disabled
  vendorData: string = '';
  vendorNameHierarchy: string = '';
  creteAdminField!: FormGroup;
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
  vendorForm: FormGroup;
  employeeName: any;
  employeeId: any;
  employeePassword: any;
  showpassword: boolean = false;
  processName1: any;
  organisationProcess: string = '';
  idhierarchy: string = '';
  idOrg: string = '';
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
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      console.log(this.apiData);
    });
    this.idhierarchy = this.apiData?.user?.idOrgHierarchy;
    this.idOrg = this.apiData?.user?.idOrganization;
    console.log(this.idhierarchy);
    console.log(this.idOrg);

    this.addProcessRow('page'); // Add one row by default
    this.addSubProcessRow('');
    this.addStageRow('');
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
      .getVendorDetails(this.idOrg, this.idhierarchy)
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

    const newIndex = processRows.length - 2; // Index of the newly added FormGroup
    console.log(newIndex);
    console.log(this.processRows);

    console.log(this.processRows?.value.at(newIndex));

    this.processName1 = this.processRows.at(newIndex).get('processName')?.value;

    console.log(this.processName1);
    if (page == 'process') {
      this.postOrganisationHierarchy(page, this.processName1);
    }
  }

  addSubProcessRow(page: any) {
    console.log(page);

    const subprocessRows = this.processForm2.get('subprocessRows') as FormArray;
    subprocessRows.push(
      this.formBuilder.group({
        subprocessName: [null], // Set initial value to null
      })
    );

    const newIndexsubprocess = subprocessRows.length - 2; // Index of the newly added FormGroup
    console.log(newIndexsubprocess);
    console.log(this.subprocessRows);

    console.log(this.subprocessRows?.value.at(newIndexsubprocess));

    this.subprocessName = this.subprocessRows
      .at(newIndexsubprocess)
      .get('subprocessName')?.value;
    console.log(this.subprocessName);
    if (page == 'subprocess') {
      this.postOrganisationHierarchy(page, this.subprocessName);
    }
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
      this.postOrganisationHierarchy(page, this.stageName);
    }
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
      console.log(process);
    } else if (process == 'process') {
      this.subprocess = true;
      console.log(process);
    } else {
      this.subprocess = false;
      console.log(process);
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
        IdCmsUser: Number(this.apiData?.user?.idCmsRole),
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
          this.openModal();
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

      this.vendorNameHierarchy = description;
    } else if (pageInfo == 'subprocess') {
      this.hierarchylevel = 4;
      this.vendorNameHierarchy = description;
    } else if (pageInfo == 'stage') {
      this.hierarchylevel = 5;
      this.vendorNameHierarchy = description;
    } else {
      this.hierarchylevel = 2;
    }
    this.createHierarchy();
  }

  submitOrgHierarchy() {
    this.SubmitCreateAdminUser();
    // this.openModal();
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
        UserName: this.employeeName,
        ParentIdOrgHierarchy: 0,
        Name: this.vendorNameHierarchy,
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

    const escapedIdCmsRole = JSON.stringify(payload.Data.IdCmsRole);

    const escapedJsonString = `{\"IdOrganization\":${escapedIdOrg},\"UserName\":${escapedUserName},\"Name\":${escapedName},\"PhoneNo\":${escapedPhoneNo},\"Password\":${escapedPassword},\"IdOrgHierarchy\":${escapedIdOrgHierarchy},\"IdCmsRole\":${escapedIdCmsRole}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    this.http.createAdminUser(body).subscribe((res) => {
      console.log(res);
    });
  }
  togglePasswordVisibility() {
    this.showpassword = !this.showpassword;
  }

  createAdminUser() {}
}
