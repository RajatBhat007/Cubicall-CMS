import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/pages/modal/modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  activeIndexTab: any = 0;
  activeIndexSubTab: any = 0;

  activeTabGameThemes: Boolean = false;
  organisationName: string = '';
  selectedDropdownIndustryValue: string = 'Select from the drop-down';
  selectedDropdownBusinessTypeValue: string = 'Select from the drop-down';
  status: any;
  orgName: string = '';
  contactName: string = '';
  contactEmail: string = '';
  contactNumber: string = '';
  domainEmail: string = '';
  orgCode: String = '';
  industryType: any = [];
  businessType: any = [];
  multiFieldForm: FormGroup;
  phoneNumber: string = '';
  domainEmailValue: string = '';
  selectedFile: File | null = null;
  selectedFileURL: any = null;
  base64String: string = '';
  selectedDropdownIndustryValueId: string = '';
  selectedDropdownBusinessTypeValueId: string = '';
  getOrganization: any = [];
  successModal: boolean = false;
  editableData: boolean = false;
  activeOrganizations: string = '';
  inactiveOrganizations: string = '';
  totalOrganization: string = '';
  sharedData: string = '';
  organizationNameedit: string = '';
  phoneNumberedit: string = '';
  domainEmailEdit: string = '';
  orgCodeEdit: string = '';
  orgNameEdit: string = '';
  contactNameEdit: string = '';
  contactEmailEdit: string = '';
  isInputDisabled: boolean = true;
  organisationRoleName: string = '';
  createOrgResponse: any = [];
  count = [
    {
      label: 'Total',
      value: 0,
    },
    {
      label: 'Active',
      value: 0,
    },
    {
      label: 'Inactive',
      value: 0,
    },
  ];

  tableData = [
    {
      id: '',
    },
    {
      id: '',
    },
    {
      id: '',
    },
    {
      id: '',
    },
    {
      id: '',
    },
  ];
  sliced_base64string: string = '';
  activeRadiobutton = 0;
  getEditDetails: any = [];
  random8DigitNumber: number | undefined;
  apiData: any;
  userRole: string = ''; // Replace with the actual user's role

  constructor(
    public _router: Router,
    private _route: ActivatedRoute,
    public http: ApiServiceService,
    private fb: FormBuilder,
    public authService: AuthService,
    private modalService: NgbModal,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) {
    this.multiFieldForm = this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

      domainEmail: ['', [Validators.required, Validators.email]],
      contactEmail: ['', [Validators.required, Validators.email]],
      orgName: ['', Validators.required],
      contactName: ['', Validators.required],
      orgCode: ['', Validators.required],
      // selectedIndustry: ['', [Validators.required, this.validateDropdown]],
      // selectedBusiness: ['', [Validators.required, this.validateDropdownBusiness]],
    });
  }
  matTab: any = [];

  subtab: any = [
    {
      label: 'Create Organization',
    },
    {
      label: 'Display Organization',
    },
  ];

  user = {
    key1: '',

    // Add more data as needed
  };
  adminName: string = '';
  IdOrganization: string = '';
  @ViewChild('organizationSuccessModal') organizationSuccessModal: any;

  ngOnInit(): void {
    this.getApiData();
    this.organisationRoleName = this.apiData?.role?.roleName;
    this.organisationName = this.apiData?.role?.organizationName;
    this.adminName = this.apiData?.user?.name;

    this.user.key1 = this.userRole;

    this.multiFieldForm.get('orgCode')?.disable();
  }

  getApiData() {
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      this.userRole = this.apiData?.role?.roleName;
    });

    switch (this.userRole) {
      case 'CubiCall Admin':
        this.matTab = [
          {
            content: 'Organization',
            color: '#7B7FCF',
          },
          {
            content: 'Organization Hierarchy',
            color: '#D43539',
          },
          {
            content: 'CMS Role',
            color: '#D43539',
          },
          {
            content: 'CMS User',
            color: '#FAA54A',
          },
          {
            content: 'Batch',
            color: '#55BC87',
          },
        ];

        break;

      case 'Super Admin':
        this.matTab = [
          {
            content: 'Organization Hierarchy',
            color: '#D43539',
          },
        ];

        break;

      case 'Admin':
        this.matTab = [
          {
            content: 'Organization Hierarchy',
            color: '#D43539',
          },

          {
            content: 'CMS User',
            color: '#FAA54A',
          },
        ];
        break;

      case 'Trainer':
        this.matTab = [
          {
            content: 'Batch',
            color: '#55BC87',
          },
        ];
        break;

      default:
        // Handle the default case if the user role is unknown or not recognized
        this.matTab = [
          {
            content: 'Batch',
            color: '#55BC87',
          },
        ];
        break;
    }
  }

  getIndustryType() {
    this.http.getIndustryType().subscribe((res) => {
      this.industryType = res;
    });
  }

  getBusinessType() {
    this.http.getBusinessType().subscribe((res) => {
      this.businessType = res;
    });
  }

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue = this.industryType[value].industryname;
    this.selectedDropdownIndustryValueId = this.industryType[value].idIndustry;
  }

  updateSelectedBusinessTypeValue(value: any) {
    this.selectedDropdownBusinessTypeValue =
      this.businessType[value].businessTypeName;
    this.selectedDropdownBusinessTypeValueId =
      this.businessType[value].idBusinessType;
  }
  NavigateToTab(index: any) {
    this.activeIndexTab = index;

    if (this.activeIndexTab == 0) {
      this.subtab = [
        {
          label: 'Create Organization',
        },
        {
          label: 'Display Organization',
        },
      ];
    } else if (this.activeIndexTab == 1) {
      this.subtab = [
        {
          label: 'Create Organization',
        },
        {
          label: 'Display Organization',
        },
        {
          label: 'Function to Role Mapping',
        },
        // this._router.navigateByUrl('/organization'),
      ];
    }
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;

    if (this.activeIndexSubTab == 1) {
      this.http.getOrganisation().subscribe((res) => {
        this.getOrganization = res;

        this.totalOrganization = this.getOrganization;

        this.count[0].value = this.getOrganization.length;
        this.activeOrganizations = this.getOrganization.filter(
          (org: { status: string }) => org.status === 'A'
        );

        this.count[1].value = this.activeOrganizations.length;
        this.inactiveOrganizations = this.getOrganization.filter(
          (org: { status: string }) => org.status === 'D' || org.status === 'O'
        );

        this.count[2].value = this.inactiveOrganizations.length;
      });
    }
  }
  navigateToEditQuestion() {
    this._router.navigateByUrl('home/sidenav/edit-question');
  }

  getPhoneNumberValue() {
    this.phoneNumber = this.multiFieldForm.get('phoneNumber')?.value || '';
  }

  get domainEmailControl() {
    return this.multiFieldForm.get('domainEmail');
  }

  get contactEmailControl() {
    return this.multiFieldForm.get('contactEmail');
  }

  get orgNameControl() {
    return this.multiFieldForm.get('orgName');
  }

  get contactNameControl() {
    return this.multiFieldForm.get('contactName');
  }

  get orgCodeControl() {
    return this.multiFieldForm.get('orgCode');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.base64String = e.target.result;

      this.sliced_base64string = this.base64String.substring(
        'data:image/png;base64,'.length
      );
    };
    const image = reader.readAsDataURL(this.selectedFile);

    this.selectedFileURL = URL.createObjectURL(file);
  }

  SubmitCreateOrganisation(): void {
    this.getPhoneNumberValue();
    this.domainEmailControl;
    this.contactEmailControl;
    this.contactNameControl;
    this.orgCodeControl;

    const payload = {
      Data: {
        IdOrganization: this.IdOrganization,
        OrganizationCode: this.orgCodeControl?.value,
        OrganizationName: this.orgNameControl?.value,
        Description: '',
        Logo: '',
        Name: this.contactNameControl?.value,
        PhoneNo: this.phoneNumber.toString(),
        ContactEmail: this.contactEmailControl?.value,
        DomainEmailId: this.domainEmailControl?.value,
        Status: '',
        UpdatedDateTime: '',
        IdCmsUser: this.apiData?.user?.idCmsRole,
        SenderPassword: '',
        Logo_Imgbytes: `,` + this.sliced_base64string,
        IndustryName: this.selectedDropdownIndustryValue,
        BUSINESSTYPENAME: this.selectedDropdownBusinessTypeValue,
        IdBusinessType: Number(this.selectedDropdownBusinessTypeValueId),
        IdIndustry: Number(this.selectedDropdownIndustryValueId),
      },
    };

    const escapedIdOrganization = JSON.stringify(payload.Data.IdOrganization);
    const escapedIdCmsUser = JSON.stringify(payload.Data.IdCmsUser);
    const escapedOrganizationCode = JSON.stringify(
      payload.Data.OrganizationCode
    );
    const escapedOrganizationName = JSON.stringify(
      payload.Data.OrganizationName
    );
    const escapedName = JSON.stringify(payload.Data.Name);
    const escapedPhoneNo = JSON.stringify(payload.Data.PhoneNo);
    const escapedContactEmail = JSON.stringify(payload.Data.ContactEmail);
    const escapedDomainEmailId = JSON.stringify(payload.Data.DomainEmailId);
    const escapedIndustryName = JSON.stringify(payload.Data.IndustryName);
    const escapedBUSINESSTYPENAME = JSON.stringify(
      payload.Data.BUSINESSTYPENAME
    );
    //  const escapedIdOrganization = '0';
    const escapedLogo_Imgbytes = JSON.stringify(payload.Data.Logo_Imgbytes);
    const escapedIdBusinessType = JSON.stringify(payload.Data.IdBusinessType);
    const escapedIdIndustry = JSON.stringify(payload.Data.IdIndustry);

    const escapedJsonString = `{\"OrganizationCode\":${escapedOrganizationCode},\"OrganizationName\":${escapedOrganizationName},\"Name\":${escapedName},\"PhoneNo\":${escapedPhoneNo},\"ContactEmail\":${escapedContactEmail},\"DomainEmailId\":${escapedDomainEmailId},\"IndustryName\":${escapedIndustryName},\"BUSINESSTYPENAME\":${escapedBUSINESSTYPENAME},\"Logo_Imgbytes\":${escapedLogo_Imgbytes},\"IdBusinessType\":${escapedIdBusinessType},\"IdIndustry\":${escapedIdIndustry},\"IdOrganization \":${escapedIdOrganization},\"IdCmsUser\":${escapedIdCmsUser}`;
    const jsonString = JSON.stringify(escapedJsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    this.http.createOrganisation(body).subscribe(
      (res) => {
        this.createOrgResponse = res;

        this.createHierarchy();

        this.successModal = true;
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
  }

  createHierarchy() {
    const payload = {
      Data: {
        IdOrganization: Number(this.createOrgResponse?.idOrganization),
        IdCmsUser: Number(this.apiData?.user?.idCmsRole),
        ParentIdOrgHierarchy: 0,
        HierarchyName: this.createOrgResponse?.organizationName,
        HirLevel: 1,
      },
    };
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedIdCMSUser = JSON.stringify(payload.Data.IdCmsUser);
    const escapedParentIdOrgHierarchy = JSON.stringify(
      payload.Data.ParentIdOrgHierarchy
    );
    const escapedHierarchyName = JSON.stringify(payload.Data.HierarchyName);
    const escapedHirLevel = JSON.stringify(payload.Data.HirLevel);

    const escapedJsonString = `{\"IdOrganization\":${escapedIdOrg},\"IdCmsUser\":${escapedIdCMSUser},\"ParentIdOrgHierarchy\":${escapedParentIdOrgHierarchy},\"HierarchyName\":${escapedHierarchyName},\"HirLevel\":${escapedHirLevel}`;
    const jsonString = JSON.stringify(escapedJsonString);

    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    this.http.createOrganisationHierarchy(body).subscribe(
      (res) => {},
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

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    // You can pass data to the modal if needed
    modalRef.componentInstance.someData =
      'Done! The Organization has been created successfully.';
    modalRef.componentInstance.screen = 'Organization';
  }

  submitForm() {
    const formData = {
      // Your form data goes here
    };

    this.http.createCmsRole(formData).subscribe((response) => {
      //  this.http.setApiResponse(response);
    });
  }

  changeFilter(index: any) {
    if (index == 0) {
      this.getOrganization = this.totalOrganization;
    } else if (index == 1) {
      this.getOrganization = this.activeOrganizations;
    } else if (index == 2) {
      this.getOrganization = this.inactiveOrganizations;
    }
  }

  editOrganization(index: any) {
    this.getEditDetails = this.getOrganization[index];

    this.IdOrganization = this.getEditDetails?.idOrganization;
    this.editableData = true;
    this.activeIndexSubTab = 0;
    this.selectedDropdownIndustryValue = this.getEditDetails?.industryName;
    this.selectedDropdownBusinessTypeValue =
      this.getEditDetails?.businesstypename;
    this.organizationNameedit = this.getEditDetails?.organizationName;

    this.selectedDropdownIndustryValueId = this.getEditDetails?.idIndustry;
    this.selectedDropdownBusinessTypeValueId =
      this.getEditDetails?.idBusinessType;

    this.phoneNumberedit = this.getEditDetails?.phoneNo;
    this.multiFieldForm.get('phoneNumber')?.setValue(this.phoneNumberedit);
    this.multiFieldForm.get('phoneNumber')?.value || '';

    this.domainEmailEdit = this.getEditDetails?.domainEmailId;
    this.multiFieldForm.get('domainEmail')?.setValue(this.domainEmailEdit);
    this.multiFieldForm.get('domainEmail')?.value || '';

    this.orgCodeEdit = this.getEditDetails?.organizationCode;
    this.multiFieldForm.get('orgCode')?.setValue(this.orgCodeEdit);
    this.multiFieldForm.get('orgCode')?.value || '';

    this.orgNameEdit = this.getEditDetails?.organizationName;
    this.multiFieldForm.get('orgName')?.setValue(this.orgNameEdit);
    this.multiFieldForm.get('orgName')?.value || '';

    this.contactNameEdit = this.getEditDetails?.name;
    this.multiFieldForm.get('contactName')?.setValue(this.contactNameEdit);
    this.multiFieldForm.get('contactName')?.value || '';

    this.contactEmailEdit = this.getEditDetails?.contactEmail;
    this.multiFieldForm.get('contactEmail')?.setValue(this.contactEmailEdit);
    this.multiFieldForm.get('contactEmail')?.value || '';
  }

  generateRandom8DigitNumber(): void {
    const randomNumber = Math.floor(Math.random() * 100000000);
    const eightDigitNumber = randomNumber.toString().padStart(8, '0');
    this.random8DigitNumber = parseInt(eightDigitNumber, 10);
    this.orgCodeEdit = this.random8DigitNumber.toString();
    this.multiFieldForm.get('orgCode')?.setValue(this.orgCodeEdit);
    this.multiFieldForm.get('orgCode')?.value || '';
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
    this._router.navigateByUrl('');
  }

  DownloadMap() {
    if (this.apiData?.role?.idRoleType == 2) {
      const excelUrl =
        'https://www.playtolearn.in/Cubicall_CMS/Template/MapforSuperAdmin.pdf';

      window.open(excelUrl);
    } else if (this.apiData?.role?.idRoleType == 3) {
      const excelUrl =
        'https://www.playtolearn.in/Cubicall_CMS/Template/MapforAdmin.pdf';

      window.open(excelUrl);
    } else if (this.apiData?.role?.idRoleType == 4) {
      const excelUrl =
        'https://www.playtolearn.in/Cubicall_CMS/Template/MapforTrainer.pdf';

      window.open(excelUrl);
    } else if (this.apiData?.role?.idRoleType == 5) {
      const excelUrl =
        'https://www.playtolearn.in/Cubicall_CMS/Template/MapforContentCreator.pdf';

      window.open(excelUrl);
    }
  }
}
