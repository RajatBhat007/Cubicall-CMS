import { Component } from '@angular/core';
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
  isDisabledCreateUser:Boolean= true;
  showPassword: boolean = false;
  selectedOrganizationID:any
  selectedCmsIdRole:any
  getEditUserDetails:any=[]
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
  constructor(private http: ApiServiceService,private fb:FormBuilder, private modalService: NgbModal,) {
  this.createCmsUser=this.fb.group({
    employeeUserName:['',
     [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[A-Za-z\s'-]+$/),
     ],],
    employeeName: ['',
     [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[A-Za-z\s'-]+$/),
     ],
     ],
     empId: ['',
       [Validators.required, Validators.pattern(/^[a-z]{2}-\d{4}(,[a-z]{2}-\d{4})*$/i)],
      ]
      ,
    empPassword: ['',
     [Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*!()])[A-Za-z\d@#$%^&+=*!()]+$/),
      ],
     ]
      
      
  })

  }
  ngOnInit(): void {
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      console.log(this.apiData);
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
  getCmsRoleList() {
    if (this.apiData?.user?.idOrganization===1) {
      this.idOrganization = -this.apiData?.user?.idOrganization;
      this.idCmsRole = -this.apiData?.user?.idCmsRole
    }
    else{
      this.idOrganization = this.apiData?.user?.idOrganization;
      this.idCmsRole = this.apiData?.user?.idCmsRole
    }
    this.http.getRolesList(this.idOrganization,this.idCmsRole).subscribe((res) => {
      this.CmsRole = res;
      console.log(this.CmsRoleList);
    });
  }

  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;
    console.log(this.activeIndexSubTab);
    if (this.activeIndexSubTab==1) {
      this.getCmsUserDetailsList()
      this.getOrganization()
    }
  }
  selectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue =
      this.getOrganizationlist[value].organizationName;
      console.log();
      this.selectedOrganizationID=this.getOrganizationlist[value].idOrganization;
      
  }
  selectedRoleValue(value: any) {
    this.selectedDropdownRoleValue = this.CmsRole[value].roleName;
    console.log(value);
    this.selectedCmsIdRole=this.CmsRole[value].idCmsRole;
  }
  selectedVendorValue(value: any) {
    this.selectedDropdownVendorValue = value;
  }
  getCmsUserDetailsList() {

    if (this.apiData?.user?.idOrganization===1) {
      this.idOrganization = -this.apiData?.user?.idOrganization;
      this.idCmsUser = -this.apiData?.user?.idCmsRole
  
    }
    else{
      this.idOrganization = this.apiData?.user?.idOrganization;
      this.idCmsUser = -1
    }
 
    this.http.getCMSUserDetails(this.idOrganization,this.idCmsUser).subscribe((res) => {
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

  get employeeNameControl(){
    return this.createCmsUser.get('employeeName');

  }
  get empIdControl() {
    return this.createCmsUser.get('empId');
  }

  get empPasswordControl(){
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

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    // You can pass data to the modal if needed
    modalRef.componentInstance.someData =
      'Done! The User has been created successfully.';
    modalRef.componentInstance.screen = 'user';
  }


  createCmsUserOnSubmit(){
    console.log('hello');
    const payload = {
      Data: {
        IdOrganization: Number(this.selectedOrganizationID),
        UserName: this.femployeeUserNameControl?.value,
        EmployeeId:this.empIdControl?.value,
        Name: this.employeeNameControl?.value,
        Email:'',
        PhoneNo:'',
        Password:this.empPasswordControl?.value,
        Status:'', //pass A static
        IdOrgHierarchy:Number(this.apiData?.user?.idOrgHierarchy),
        IdCmsRole:Number(this.selectedCmsIdRole), //pass static because get roles api is not working
      },
    };
    console.table(this.createCmsUser.value)
    console.log(payload)

    const escapedIdOrganization= JSON.stringify(payload.Data.IdOrganization);
    const escapedUserName= JSON.stringify(payload.Data.UserName);
    const escapedEmployeeId= JSON.stringify(payload.Data.EmployeeId);
    const escapedName=JSON.stringify(payload.Data.Name);
    const escapedEmail=JSON.stringify(payload.Data.Email);
    const escapedPhoneNo=JSON.stringify(payload.Data.PhoneNo);
    const escapedPassword=JSON.stringify(payload.Data.Password);
    const escapedStatus=JSON.stringify(payload.Data.Status);
    const escapedIdOrgHierarchy=JSON.stringify(payload.Data.IdOrgHierarchy);
    const escapedIdCmsRole=JSON.stringify(payload.Data.IdCmsRole);

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
        this.openModal();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          window.alert('404 Not Found Error');
        } else {
          window.alert(error.error);
        }
      }
    );
    this.createCmsUser.reset()
    this.selectedDropdownIndustryValue= 'Select from the drop-down';
    this.selectedDropdownRoleValue= 'Select from the drop-down';
    this.selectedDropdownVendorValue= 'Select from the drop-down';
  }


// ------------edit Cms user ----------------
  editCmsUSer(value: any) {
    console.log(value);
    this.getEditUserDetails= this.userDetailsList[value]
    console.log(this.getEditUserDetails);
    
  //  this.selectedDropdownIndustryValue=this.getOrganizationlist[value].organizationName;
  //  console.log(this.selectedDropdownIndustryValue);
   console.log(this.getEditUserDetails.idOrganization);
   
  console.log(this.getOrganizationlist);
  
   console.log(this.getOrganizationlist[value].organizationName);
      
    this.createCmsUser.get('employeeUserName')?.setValue(this.getEditUserDetails?.userName);
    this.createCmsUser.get('employeeUserName')?.value || '';

    this.createCmsUser.get('employeeName')?.setValue(this.getEditUserDetails?.name);
    this.createCmsUser.get('employeeName')?.value || '';

    this.createCmsUser.get('empId')?.setValue(this.getEditUserDetails?.employeeId);
    this.createCmsUser.get('empId')?.value || '';

    this.createCmsUser.get('empPassword')?.setValue(this.getEditUserDetails?.password);
    this.createCmsUser.get('empPassword')?.value || '';


    this.userDetailsList[value].userName;
    this.activeIndexSubTab = 0;
  }

}
