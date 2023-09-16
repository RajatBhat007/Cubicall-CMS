import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiServiceService } from 'src/app/service/api-service.service';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-game-theme',
  templateUrl: './game-theme.component.html',
  styleUrls: ['./game-theme.component.scss'],
})
export class GameThemeComponent implements OnInit {
  activeSubSubTab: any = 0;
  activeRadiobutton = 0;
  activeIndexTab: any = 0;
  activeAll: string = '1';
  activeIndexSubTab: any = 0;
  activeIndexsubSubTab: any = 0;
  activeIndexDraftSubmit: any = 1;
  activeIndexRejectedSubmit: any = 1;
  activeTab: any = 0;
  activeTabGameThemes: Boolean = false;
  selectedDropdownIndustryValue: string = 'Select from the drop-down';
  isEditButtonVisible: boolean = false;
  selectedDropdownValue: string = 'Organization Name';
  circleClassName: string = '';
  activeTabIndex: string = '1';
  isTab0Active: boolean = false;
  isTab1Active: boolean = false;
  selectedFileName: string = '';
  status: any;
  selectedFileNameAnswer: string = '';
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('fileInput') fileInputAnswer: any;
  questionFileSelected: boolean = false;
  selectedFile: File | null = null;
  selectedAnswerFile: File | null = null;
  isEditMode: boolean = false;
  currentSection: string = '';
  isupload = false;
  iscreate: boolean = false;
  isStatusTab: boolean = false;
  isactive = false;
  hideuploadButton: boolean = false;
  apiData: any;
  idOrganization: number = 0;
  gameTime: any = [];
  cubeFaceGameAttempt: any = [];
  cubeFaceGameStreak: any = [];
  cubeFaceId: number = 0;
  value: any;
  totalList: any = '';
  activeList: String = '';
  inactiveList: String = '';
  editGameTimeArray: any = [];
  cubeFaceIdViseGameTimeData: any = [];
  cubeFaceIdViseGameAttemtData: any = [];
  cubeFaceIdViseGameStreakData: any = [];
  questionListResponse: any = [];
  uploadButton: boolean = false;
  stageDropdown: any = [];
  constructor(
    public _router: Router,
    private _route: ActivatedRoute,
    public authService: AuthService,
    public http: ApiServiceService
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
    {
      label: 'Rejected',
      value: 0,
    },
  ];

  subtab = [
    {
      label: 'Content',
    },
    {
      label: 'Game Points & Details',
    },
    {
      label: 'Configure Images',
    },
    {
      label: 'Contant Approval',
    },
  ];
  subsubtab = [
    {
      label: 'Game Time',
    },
    {
      label: 'Attempt',
    },
    {
      label: 'Streak',
    },
  ];
  tableData = [];

  tableData1 = [
    {
      id: '',
      streak: '',
      point: '',
    },
    {
      id: '',
      streak: '',
      point: '',
    },
  ];

  // setActiveTabByString(tabIndex: string) {
  // }

  // setActiveTabByNumber(tabIndex: number) {
  // }

  // setActiveTab(tabIndex: string) {
  //   this.activeTabIndex = tabIndex;
  // }

  rejectedTableData = [
    {
      id: '',
      color: '',
    },
  ];
  ngOnInit(): void {
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      console.log(this.apiData);
      if (this.apiData?.role?.idRoleType >= 4) {
        this.uploadButton = true;
      }
    });

    this._route.queryParams.subscribe((params) => {
      console.log(params);
      this.value = params;
      console.log(this.value.activeIndexSubTab);
      console.log(this.value.activeIndexSubTab);

      if (this.value.activeIndexSubTab == '1') {
        this.NavigateToSubTab(Number(this.value.activeIndexSubTab));
      }
    });

    this.View('4');
    this.status = 'rejected';
  }

  GetQuestionData() {
    this.http
      .getQuestionList(
        this.apiData?.user?.idOrganization,
        this.activeIndexTab + 1
      )
      .subscribe((res) => {
        this.questionListResponse = res;
      });
  }

  GetStageNames() {
    this.http.getStagesName(this.apiData?.user?.idCmsUser).subscribe((res) => {
      this.stageDropdown = res;
    });
  }

  onFileChange(event: any) {
    console.log(event);

    const file = event.target.files[0];
    this.selectedFile = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.questionFileSelected = true;
    }
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
    console.log(this.selectedFileName);
  }

  uploadQutionfile() {
    const idOrgHierarchy = this.apiData?.user?.idOrgHierarchy;
    //  console.log(idOrgHierarchy);
    //  console.log(this.selectedFile);

    //  const payload = {
    //   Data: {
    //     postedFile:this.selectedFile,
    //     IdOrgHierarchy:idOrgHierarchy
    //   }
    // };

    // const postfilename = payload.Data.postedFile
    // const OrgHierarchyid = payload.Data.IdOrgHierarchy

    // const escapedJsonString = `{\"postedFile\":${this.selectedFile},\"IdOrgHierarchy\":${idOrgHierarchy}`;
    // const jsonString = JSON.stringify(escapedJsonString);
    // const jsonStringremovelast=jsonString.slice(0,-1)
    // const body = '{"Data":'+jsonString +'}"}';

    if (this.selectedFile && idOrgHierarchy !== null) {
      this.http.importQutionFile(this.selectedFile, idOrgHierarchy).subscribe(
        (res) => {
          console.log(res);
          // this._router.navigateByUrl('home')
          window.alert('succes');
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
  }

  onFileChangeAnswer(event: any) {
    console.log(event);

    const file = event.target.files[0];
    this.selectedAnswerFile = event.target.files[0];
    if (file) {
      this.selectedFileNameAnswer = file.name;
    }
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
    this.selectedFileNameAnswer = file.name;
  }

  uploadAnswerfile() {
    const idOrgHierarchy = this.apiData?.user?.idOrgHierarchy;

    if (this.selectedAnswerFile && idOrgHierarchy !== null) {
      this.http
        .importAnswerFile(this.selectedAnswerFile, idOrgHierarchy)
        .subscribe(
          (res) => {
            console.log(res);
            // this._router.navigateByUrl('home')
            window.alert('succes');
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
  }

  updateSelectedValue(value: any) {
    this.selectedDropdownValue = value;
  }
  updateSelectedIndustryValue(value: any) {
    this.selectedDropdownIndustryValue = value;
  }
  NavigateToTab(index: any) {
    this.activeIndexTab = index;
    this.GetQuestionData();
    if (this.activeSubSubTab == '0') {
      this.getCubeFaceGameTime();
    } else if (this.activeSubSubTab == '1') {
      this.getCubeFaceGameAttempt();
    } else if (this.activeSubSubTab == '2') {
      this.getCubeFaceGameStreak();
    }
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;
    console.log(this.activeIndexSubTab);

    if (this.activeIndexSubTab == '0') {
      this.isStatusTab == true;
    }
    if (this.activeIndexSubTab == '0') {
      this.isactive == true;
      this.isupload = false;
    } else if (this.activeIndexSubTab == index) {
      this.getCubeFaceGameTime();
      this.isupload = true;
    }
    if (this.activeIndexsubSubTab == '0') {
    }
  }
  navigateToEditQuestion() {
    this._router.navigateByUrl('home/edit-question');
    this.isEditButtonVisible = !this.isEditButtonVisible;
  }
  toggleEditButtonVisibility() {
    this.isEditButtonVisible = !this.isEditButtonVisible;
  }

  navigateToGameEdit() {
    this._router.navigateByUrl('home/gameedit');
    this.http.isAttempted = true;
  }
  navigateToCreateimg() {
    this._router.navigateByUrl('home/createimg');
  }
  View(value: any) {
    console.log(value);
    this.activeAll = value;
    this.activeIndexDraftSubmit = value;
    this.activeIndexRejectedSubmit = value;
    if (value == '1') {
      console.log('hello');
      this.hideuploadButton = false;
      this.subtab = [
        {
          label: 'Content',
        },
        {
          label: 'Game Points & Details',
        },
        {
          label: 'Configure Images',
        },
        {
          label: 'Contant Approval',
        },
      ];
      //  this.getCubeFaceGameAttempt()
    } else if (value == '2') {
      this.subtab = [
        {
          label: 'Contant Approval',
        },
      ];
      this.hideuploadButton = true;
    } else if (value == '4') {
      this.subtab = [
        {
          label: 'Contant Approval',
        },
      ];
      this.hideuploadButton = true;
      this.GetQuestionData();
    } else {
      this.subtab = [
        {
          label: 'Contant Approval',
        },
      ];
      this.hideuploadButton = true;
    }
  }

  logout() {
    this.authService.logout();
    this._router.navigateByUrl('');
  }
  changeActiveTab(index: number) {
    this.activeIndexDraftSubmit = index;
  }
  setActiveTab(tabIndex: number) {
    this.activeTab = tabIndex;
  }
  activateSubSubTab(index: number) {
    this.activeSubSubTab = index;
    console.log(this.activeSubSubTab);
    if (this.activeSubSubTab == '0') {
      this.getCubeFaceGameTime();
    } else if (this.activeSubSubTab == '1') {
      this.getCubeFaceGameAttempt();
    } else if (this.activeSubSubTab == '2') {
      this.getCubeFaceGameStreak();
    }
  }
  openAttempted() {
    this.http.isAttempted = true;
    this.http.isopenGameTime = false;
    this.http.isopenStreakTime = false;
    this._router.navigateByUrl('home/gameedit');
  }
  openStreakTime() {
    this.http.isAttempted = false;
    this.http.isopenGameTime = false;
    this.http.isopenStreakTime = true;
    this._router.navigateByUrl('home/gameedit');
  }
  openGameTime() {
    this.http.isAttempted = false;
    this.http.isopenGameTime = true;
    this.http.isopenStreakTime = false;
    this._router.navigateByUrl('home/gameedit');
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  approveItem(res: any) {}

  rejectItem(res: any) {}
  isPopupVisible = false;

  openFeedbackPopup(): void {
    this.isPopupVisible = true;
  }

  closeFeedbackPopup(): void {
    this.isPopupVisible = false;
  }
  onTabChange(tabIndex: number) {
    this.isTab0Active = tabIndex === 0;
    this.isTab1Active = tabIndex === 1;
  }
  setActiveAll() {}

  changeFilter(index: any) {
    console.log(index);
    if (this.activeSubSubTab == '0') {
      if (index == 0) {
        this.gameTime = this.totalList;
      } else if (index == 1) {
        this.gameTime = this.activeList;
      } else if (index == 2) {
        this.gameTime = this.inactiveList;
      }
    } else if (this.activeSubSubTab == '1') {
      if (index == 0) {
        this.cubeFaceGameAttempt = this.totalList;
      } else if (index == 1) {
        this.cubeFaceGameAttempt = this.activeList;
      } else if (index == 2) {
        this.cubeFaceGameAttempt = this.inactiveList;
      }
    } else if (this.activeSubSubTab == '2') {
      if (index == 0) {
        this.cubeFaceGameStreak = this.totalList;
      } else if (index == 1) {
        this.cubeFaceGameStreak = this.activeList;
      } else if (index == 2) {
        this.cubeFaceGameStreak = this.inactiveList;
      }
    }
  }

  getCubeFaceGameTime() {
    console.log('getCubeFaceGameTime');
    this.idOrganization = this.apiData?.user?.idOrganization;
    let CubesFacesGameId = -1;
    this.http
      .getCubeFaceGameTime(this.idOrganization, CubesFacesGameId)
      .subscribe((res) => {
        this.gameTime = res;
        console.log(this.gameTime);

        this.cubeFaceIdViseGameTimeData = this.gameTime.filter(
          (org: { cubesFacesId: string }) =>
            org.cubesFacesId === this.activeIndexTab + 1
        );
        console.log(this.cubeFaceIdViseGameTimeData);

        this.totalList = this.gameTime;
        console.log(this.totalList);
        this.count[0].value = this.gameTime.length;
        this.activeList = this.gameTime.filter(
          (org: { isActive: string }) => org.isActive === 'A'
        );
        console.log(this.activeList);
        this.count[1].value = this.activeList.length;
        this.inactiveList = this.gameTime.filter(
          (org: { isActive: string }) => org.isActive === 'D'
        );
        console.log(this.inactiveList);
        this.count[2].value = this.inactiveList.length;
      });
  }

  getCubeFaceGameAttempt() {
    this.idOrganization = this.apiData?.user?.idOrganization;
    let AttemptNoId = -1;
    this.http
      .getCubeFaceGameAttempt(this.idOrganization, AttemptNoId)
      .subscribe((res) => {
        console.log(res);
        this.cubeFaceGameAttempt = res;

        this.cubeFaceIdViseGameAttemtData = this.cubeFaceGameAttempt.filter(
          (org: { cubesFacesId: string }) =>
            org.cubesFacesId === this.activeIndexTab + 1
        );
        console.log(this.cubeFaceIdViseGameTimeData);

        this.totalList = this.cubeFaceGameAttempt;
        console.log(this.totalList);
        this.count[0].value = this.cubeFaceGameAttempt.length;
        this.activeList = this.cubeFaceGameAttempt.filter(
          (org: { isActive: string }) => org.isActive === 'A'
        );
        console.log(this.activeList);
        this.count[1].value = this.activeList.length;
        this.inactiveList = this.cubeFaceGameAttempt.filter(
          (org: { isActive: string }) => org.isActive === 'D'
        );
        console.log(this.inactiveList);
        this.count[2].value = this.inactiveList.length;
      });
  }

  getCubeFaceGameStreak() {
    this.idOrganization = this.apiData?.user?.idOrganization;
    let StreakId = -1;
    this.http
      .getCubeFaceGameStreak(this.idOrganization, StreakId)
      .subscribe((res) => {
        console.log(res);
        this.cubeFaceGameStreak = res;

        this.cubeFaceIdViseGameStreakData = this.cubeFaceGameStreak.filter(
          (org: { cubesFacesId: string }) =>
            org.cubesFacesId === this.activeIndexTab + 1
        );
        console.log(this.cubeFaceIdViseGameStreakData);

        this.totalList = this.cubeFaceGameStreak;
        console.log(this.totalList);
        this.count[0].value = this.cubeFaceGameStreak.length;
        this.activeList = this.cubeFaceGameStreak.filter(
          (org: { isActive: string }) => org.isActive === 'A'
        );
        console.log(this.activeList);
        this.count[1].value = this.activeList.length;
        this.inactiveList = this.cubeFaceGameStreak.filter(
          (org: { isActive: string }) => org.isActive === 'D'
        );
        console.log(this.inactiveList);
        this.count[2].value = this.inactiveList.length;
      });
  }

  Create() {
    console.log(this.activeIndexSubTab);
    console.log(this.activeIndexTab + 1);
    let gamePointsActiveTab = this.activeSubSubTab;
    let cubeFaceId = this.activeIndexTab + 1;
    let categoryName = this.matTab[this.activeIndexTab].content;
    this._router.navigate(['home/edit-question'], {
      queryParams: { cubeFaceId, gamePointsActiveTab, categoryName },
    });
  }

  editGameTime(value: any, label: any) {
    if (label == 'gametime') {
      console.log(this.gameTime[value]);
      let gamePointsActiveTab = this.activeSubSubTab;
      let cubesFacesGameId = JSON.stringify(this.gameTime[value]);
      let cubeFaceId = this.gameTime[value].cubesFacesId;
      let categoryName = this.gameTime[value].categoryName;
      this._router.navigate(['home/edit-question'], {
        queryParams: {
          cubeFaceId,
          gamePointsActiveTab,
          categoryName,
          cubesFacesGameId,
        },
      });
    } else if (label == 'attempt') {
      console.log(this.cubeFaceGameAttempt[value]);
      let gamePointsActiveTab = this.activeSubSubTab;
      let cubeFaceGameAttemptEdit = JSON.stringify(
        this.cubeFaceGameAttempt[value]
      );
      let cubeFaceId = this.cubeFaceGameAttempt[value]?.cubesFacesId;
      let categoryName = this.cubeFaceGameAttempt[value]?.categoryName;
      this._router.navigate(['home/edit-question'], {
        queryParams: {
          cubeFaceId,
          gamePointsActiveTab,
          categoryName,
          cubeFaceGameAttemptEdit,
        },
      });
    } else if (label == 'streak') {
      console.log(this.cubeFaceGameStreak[value]);
      let gamePointsActiveTab = this.activeSubSubTab;
      let cubeFaceGameStreakEdit = JSON.stringify(
        this.cubeFaceGameStreak[value]
      );
      let cubeFaceId = this.cubeFaceGameStreak[value]?.cubesFacesId;
      let categoryName = this.cubeFaceGameStreak[value]?.categoryName;
      this._router.navigate(['home/edit-question'], {
        queryParams: {
          cubeFaceId,
          gamePointsActiveTab,
          categoryName,
          cubeFaceGameStreakEdit,
        },
      });
    }
  }
}
