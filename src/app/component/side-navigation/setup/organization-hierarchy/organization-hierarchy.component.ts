import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/pages/modal/modal.component';

@Component({
  selector: 'app-organization-hierarchy',
  templateUrl: './organization-hierarchy.component.html',
  styleUrls: ['./organization-hierarchy.component.scss'],
})
export class OrganizationHierarchyComponent implements OnInit {
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
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.processForm = this.formBuilder.group({
      processRows: this.formBuilder.array([]),
      subprocessRows: this.formBuilder.array([]),
      stage: this.formBuilder.array([]),
    });
  }
  ngOnInit() {
    this.addProcessRow(); // Add one row by default
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
    console.log('org');
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
}
