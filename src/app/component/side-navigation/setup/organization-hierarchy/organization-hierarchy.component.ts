import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-organization-hierarchy',
  templateUrl: './organization-hierarchy.component.html',
  styleUrls: ['./organization-hierarchy.component.scss'],
})
export class OrganizationHierarchyComponent implements OnInit {
  subtab: any = [
    {
      label: 'Create Admin Roles',
    },
    {
      label: 'Set Hierarchy',
    },
  ];

  organisationName: any = [
    {
      organization: '1)Client/Vendor XXX',
    },
  ];
  subprocess: boolean = true;
  processForm: FormGroup;

  activeIndexSubTab: any = 0;
  selectedDropdownValue: string = 'Organization';
  selectedDropdownIndustryValue: string = 'Select from the drop-down';

  constructor(private formBuilder: FormBuilder) {
    this.processForm = this.formBuilder.group({
      processRows: this.formBuilder.array([]),
      subprocessRows: this.formBuilder.array([]),
    });
  }
  ngOnInit() {
    console.log(this.subprocess);

    this.addProcessRow(); // Add one row by default
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;
    console.log(this.activeIndexSubTab);
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
  }
  removeProcessRow(index: number) {
    if (index > 0) {
      const processRows = this.processForm.get('processRows') as FormArray;
      processRows.removeAt(index);

      const subprocessRows = this.processForm.get(
        'subprocessRows'
      ) as FormArray;
      subprocessRows.removeAt(index);
    }
  }

  get processRows(): FormArray {
    return this.processForm.get('processRows') as FormArray;
  }

  get subprocessRows(): FormArray {
    return this.processForm.get('subprocessRows') as FormArray;
  }

  navigateToSubprocess(process: any) {
    if (process == 'subprocess') {
      this.subprocess = false;
    } else {
      this.subprocess = true;
    }

    console.log(this.subprocess);
  }
}
