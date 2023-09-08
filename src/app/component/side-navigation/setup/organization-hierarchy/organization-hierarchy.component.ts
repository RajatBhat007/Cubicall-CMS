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
      processRows: this.formBuilder.array([]),
      subprocessRows: this.formBuilder.array([]),
      stage: this.formBuilder.array([]),
    });
  }
  ngOnInit() {
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      console.log(this.apiData);
    });

    this.addProcessRow(); // Add one row by default
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
    } else if (this.activeIndexSubTab == 2) {
      this.subTabName = 'display';
    }
  }

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue =
      this.organisationName[value].organization;
  }

  addProcessRow() {
    const processRows = this.processForm.get('processRows') as FormArray;
    processRows.push(
      this.formBuilder.group({
        processName: [null], // Set initial value to null
      })
    );

    const subprocessRows = this.processForm.get('subprocessRows') as FormArray;
    subprocessRows.push(
      this.formBuilder.group({
        subprocessName: [null], // Set initial value to null
      })
    );

    const stage = this.processForm.get('stage') as FormArray;
    stage.push(
      this.formBuilder.group({
        stageName: [null], // Set initial value to null
      })
    );
  }
  removeProcessRow(index: number) {
    if (index > 0) {
      const processRows = this.processForm.get('processRows') as FormArray;
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
    return this.processForm.get('processRows') as FormArray;
  }

  get subprocessRows(): FormArray {
    return this.processForm.get('subprocessRows') as FormArray;
  }

  get stage(): FormArray {
    return this.processForm.get('stage') as FormArray;
  }
  navigateToSubprocess(process: any, index: any) {
    console.log(index);
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

    // this.id_org = localStorage.getItem('idOrganization');
    // this.id_cms_user = localStorage.getItem('idCmsUser');

    // {    "Data":"{\n    \"HierarchyName\":\"Abc\",\n    \"ParentIdOrgHierarchy\":0,\n    \"IdOrganization\":4,\n    \"IdCmsUser\":1\n}"}
    const payload = {
      Data: {
        IdOrganization: Number(this.apiData?.user?.idOrganization),
        IdCmsUser: Number(this.apiData?.user?.idCmsRole),
        ParentIdOrgHierarchy: 0,
        HierarchyName: this.vendorNameHierarchy,
      },
    };
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedIdCMSUser = JSON.stringify(payload.Data.IdCmsUser);
    const escapedParentIdOrgHierarchy = JSON.stringify(
      payload.Data.ParentIdOrgHierarchy
    );
    const escapedHierarchyName = JSON.stringify(payload.Data.HierarchyName);

    console.log(payload);
    const escapedJsonString = `{\"IdOrganization\":${escapedIdOrg},\"IdCmsUser\":${escapedIdCMSUser},\"ParentIdOrgHierarchy\":${escapedParentIdOrgHierarchy},\"HierarchyName\":${escapedHierarchyName}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';
    console.log(body);

    this.http.createOrganisationHierarchy(body).subscribe(
      (res) => {
        console.log(res);
        this.OrgHirerachtresponse = res;
        this.openModal();
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

    this.adminInfo = true;
    console.log(this.adminInfo);
  }
  submitOrgHierarchy() {
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
}
