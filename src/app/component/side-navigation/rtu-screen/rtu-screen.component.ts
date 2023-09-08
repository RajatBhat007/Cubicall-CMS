import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-rtu-screen',
  templateUrl: './rtu-screen.component.html',
  styleUrls: ['./rtu-screen.component.scss'],
})
export class RtuScreenComponent implements OnInit {
  selectedDropdownIndustryValue: string = 'Select from the drop-down';
  activeIndexTab: any = 0;
  activeIndexSubTab: any = 0;
  activeIndexDraftSubmit: any = 1;
  activeAll: string = '1';
  activeTabGameThemes: Boolean = false;
  selectedDropdownValue: string = 'Organization Name';
  circleClassName: string = '';
  selectedFileName: string = '';
  status: any;
  getOrganizationlist: any = [];
  showOraganizationMenu: boolean = false;
  @ViewChild('fileInput') fileInput: any;
  constructor(
    public _router: Router,
    private _route: ActivatedRoute,
    public http: ApiServiceService,
    public authService: AuthService
  ) {}

  matTab = [
    {
      content: 'Defuse the Bomb',
      color: '#7B7FCF',
      icon: 'assets/images/defusethebomb.png',
    },
    {
      content: 'Mystery Term',
      color: '#D43539',
      icon: 'assets/images/mystery.png',
    },
    {
      content: 'Triangularis',
      color: '#FAA54A',
      icon: 'assets/images/triangularis.png',
    },
    {
      content: 'Word Search',
      color: '#55BC87',
      icon: 'assets/images/wordsearch.svg',
    },
    {
      content: 'Word Wheel',
      color: '#FBA2D4',
      icon: 'assets/images/wordwheel.png',
    },
    {
      content: 'Crossword',
      color: '#903FB1',
      icon: 'assets/images/crossword.png',
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
    // {
    //   "label":'Rejected',
    //   "value": 12
    // },
  ];

  subtab = [
    {
      label: 'Content',
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

  rejectedTableData = [
    {
      id: '',
      color: '',
    },
  ];
  ngOnInit(): void {
    this.View('1');
    // this.status='accepted'
    this.status = 'rejected';
    this.getOrganization();
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Here, you can access the data from the Excel sheet
      // For example, to get cell A1's value:
      const cellA1Value = worksheet['A1']?.v;

      console.log('Cell A1 Value:', cellA1Value);
    };

    reader.readAsBinaryString(file);
    this.selectedFileName = file.name;
  }

  updateSelectedValue(value: any) {
    this.selectedDropdownValue = value;
  }
  NavigateToTab(index: any) {
    this.activeIndexTab = index;
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;
  }
  navigateToEditQuestion(value: any) {
    console.log(value);
    this._router.navigate(['home/edit-question'], { queryParams: { value } });
  }
  navigateToViewQuestion(value: any) {
    this._router.navigate(['home/edit-question'], { queryParams: { value } });
  }
  View(value: any) {
    console.log(value);
    this.activeAll = value;
  }

  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue =
      this.getOrganizationlist[value].organizationName;
  }
  getOrganization() {
    this.http.getOrganisation().subscribe((res) => {
      console.log(res);
      this.getOrganizationlist = res;
      console.log(this.getOrganization);
    });
  }

  organizationDropdown() {
    this.showOraganizationMenu = !this.showOraganizationMenu;
    console.log('qqqqqq', this.showOraganizationMenu);
  }
  close() {
    this.showOraganizationMenu = !this.showOraganizationMenu;
  }
  logout() {
    this.authService.logout();
    this._router.navigateByUrl('');
  }
}
