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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/pages/modal/modal.component';
@Component({
  selector: 'app-game-theme',
  templateUrl: './game-theme.component.html',
  styleUrls: ['./game-theme.component.scss'],
})
export class GameThemeComponent implements OnInit {
  activeSubSubTab: any = 0;
  activeRadiobutton: number = 0;
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
  organisationLogo: string = '';
  organisationName: string = '';
  organisationRoleName: string = '';
  questionListResponseFilter: any = [];
  constructor(
    public _router: Router,
    private _route: ActivatedRoute,
    public authService: AuthService,
    public https: ApiServiceService,
    private modalService: NgbModal
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
  ];

  subtab = [
    {
      label: 'Content',
    },
    {
      label: 'Game Points & Details',
    },
    // {
    //   label: 'Configure Images',
    // },
    // {
    //   label: 'Content Approval',
    // },
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
    this.https.getApiData().subscribe((data) => {
      this.apiData = data;
      console.log(this.apiData);
      this.organisationRoleName = this.apiData?.role?.roleName;
      this.organisationName = this.apiData?.role?.organizationName;

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
      } else if (this.value.activeIndexSubTab == '0') {
        this.NavigateToSubTab(Number(this.value.activeIndexSubTab));
      }
    });

    this.View('1');
    this.status = 'rejected';
  }

  GetQuestionData() {
    this.https
      .getQuestionList(
        this.apiData?.user?.idOrganization,
        this.activeIndexTab + 1
      )
      .subscribe((res) => {
        this.questionListResponse = res;
        console.log(this.questionListResponse);
        this.questionListResponseFilter = res;
        this.count[0].value = this.questionListResponse.length;
        this.activeList = this.questionListResponse.filter(
          (org: { isActive: string }) => org.isActive === 'A'
        );
        console.log(this.activeList);
        this.count[1].value = this.activeList.length;
        this.inactiveList = this.questionListResponse.filter(
          (org: { isActive: string }) => org.isActive === 'D'
        );
        console.log(this.inactiveList);
        this.count[2].value = this.inactiveList.length;
      });
  }

  GetStageNames() {
    this.https.getStagesName(this.apiData?.user?.idCmsUser).subscribe((res) => {
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

  uploadQuestionfile() {
    // const idOrgHierarchy = this.apiData?.user?.idOrgHierarchy;
    const IdOrgHierarchy = this.apiData?.user?.idOrgHierarchy;
    const userId = this.apiData?.user?.idCmsUser;
    const CubesFacesGameId = this.activeIndexTab + 1;
    const OrgID = this.apiData?.user?.idOrganization;

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

    if (this.selectedFile && IdOrgHierarchy !== null) {
      this.https
        .importQutionFile(
          this.selectedFile,
          IdOrgHierarchy,
          userId,
          CubesFacesGameId,
          OrgID
        )
        .subscribe(
          (res) => {
            console.log(res);
            // this._router.navigateByUrl('home')
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
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    // You can pass data to the modal if needed
    modalRef.componentInstance.someData =
      'Done! The File has been uploaded successfully.';
    modalRef.componentInstance.screen = 'GameTheme';
  }

  DownloadTemplate() {
    const excelUrl =
      'https://www.playtolearn.in/Cubicall_CMS/Template/template.xlsx';

    window.open(excelUrl);
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
    const IdOrgHierarchy = this.apiData?.user?.idOrgHierarchy;

    // IFormFile postedFile, int IdOrgHierarchy, int userId,int CubesFacesGameId,int OrgID Parameters are to be passed
    if (this.selectedAnswerFile && IdOrgHierarchy !== null) {
      this.https
        .importAnswerFile(this.selectedAnswerFile, IdOrgHierarchy)
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
    this.activeRadiobutton = 0;
    this.activeIndexSubTab = index;
    console.log(this.activeIndexSubTab);

    if (this.activeIndexSubTab == '0') {
      this.GetQuestionData();
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

  toggleEditButtonVisibility() {
    this.isEditButtonVisible = !this.isEditButtonVisible;
  }

  navigateToGameEdit() {
    this._router.navigateByUrl('home/gameedit');
    this.https.isAttempted = true;
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
      if (this.apiData?.role?.idRoleType < 4) {
        this.subtab = [
          {
            label: 'Content',
          },
          {
            label: 'Game Points & Details',
          },
          // {
          //   label: 'Configure Images',
          // },
          // {
          //   label: 'Content Approval',
          // },
        ];
      } else {
        this.subtab = [
          {
            label: 'Content',
          },
        ];
      }
      this.GetQuestionData();
      //  this.getCubeFaceGameAttempt()
    } else if (value == '2') {
      this.subtab = [
        {
          label: 'Content ',
        },
      ];
      this.hideuploadButton = true;
    } else if (value == '4') {
      this.subtab = [
        {
          label: 'Content ',
        },
      ];
      this.hideuploadButton = true;
      this.GetQuestionData();
    } else {
      this.subtab = [
        {
          label: 'Content ',
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
    this.https.isAttempted = true;
    this.https.isopenGameTime = false;
    this.https.isopenStreakTime = false;
    this._router.navigateByUrl('home/gameedit');
  }
  openStreakTime() {
    this.https.isAttempted = false;
    this.https.isopenGameTime = false;
    this.https.isopenStreakTime = true;
    this._router.navigateByUrl('home/gameedit');
  }
  openGameTime() {
    this.https.isAttempted = false;
    this.https.isopenGameTime = true;
    this.https.isopenStreakTime = false;
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
    console.log(this.activeIndexSubTab);

    if (this.activeIndexSubTab == 0) {
      console.log(index);
      if (index == 0) {
        this.questionListResponse = this.questionListResponseFilter;
      } else if (index == 1) {
        this.questionListResponse = this.activeList;
      } else if (index == 2) {
        this.questionListResponse = this.inactiveList;
        console.log(this.questionListResponse);
      }
    }

    if (this.activeSubSubTab == '0') {
      if (index == 0) {
        this.cubeFaceIdViseGameTimeData = this.totalList;
      } else if (index == 1) {
        this.cubeFaceIdViseGameTimeData = this.activeList;
      } else if (index == 2) {
        this.cubeFaceIdViseGameTimeData = this.inactiveList;
      }
    } else if (this.activeSubSubTab == '1') {
      if (index == 0) {
        this.cubeFaceIdViseGameAttemtData = this.totalList;
      } else if (index == 1) {
        this.cubeFaceIdViseGameAttemtData = this.activeList;
      } else if (index == 2) {
        this.cubeFaceIdViseGameAttemtData = this.inactiveList;
      }
    } else if (this.activeSubSubTab == '2') {
      if (index == 0) {
        this.cubeFaceIdViseGameStreakData = this.totalList;
      } else if (index == 1) {
        this.cubeFaceIdViseGameStreakData = this.activeList;
      } else if (index == 2) {
        this.cubeFaceIdViseGameStreakData = this.inactiveList;
      }
    }
  }

  getCubeFaceGameTime() {
    console.log('getCubeFaceGameTime');
    this.idOrganization = this.apiData?.user?.idOrganization;
    let CubesFacesGameId = -1;
    this.https
      .getCubeFaceGameTime(this.idOrganization, CubesFacesGameId)
      .subscribe((res) => {
        this.gameTime = res;
        console.log(this.gameTime);

        this.cubeFaceIdViseGameTimeData = this.gameTime.filter(
          (org: { cubesFacesId: string }) =>
            org.cubesFacesId === this.activeIndexTab + 1
        );
        console.log(this.cubeFaceIdViseGameTimeData);

        this.totalList = this.cubeFaceIdViseGameTimeData;
        console.log(this.totalList);
        this.count[0].value = this.cubeFaceIdViseGameTimeData.length;
        this.activeList = this.cubeFaceIdViseGameTimeData.filter(
          (org: { isActive: string }) => org.isActive === 'A'
        );
        console.log(this.activeList);
        this.count[1].value = this.activeList.length;
        this.inactiveList = this.cubeFaceIdViseGameTimeData.filter(
          (org: { isActive: string }) => org.isActive === 'D'
        );
        console.log(this.inactiveList);
        this.count[2].value = this.inactiveList.length;
      });
  }

  getCubeFaceGameAttempt() {
    this.idOrganization = this.apiData?.user?.idOrganization;
    let AttemptNoId = -1;
    this.https
      .getCubeFaceGameAttempt(this.idOrganization, AttemptNoId)
      .subscribe((res) => {
        console.log(res);
        this.cubeFaceGameAttempt = res;

        this.cubeFaceIdViseGameAttemtData = this.cubeFaceGameAttempt.filter(
          (org: { cubesFacesId: string }) =>
            org.cubesFacesId === this.activeIndexTab + 1
        );
        console.log(this.cubeFaceIdViseGameTimeData);

        this.totalList = this.cubeFaceIdViseGameAttemtData;
        console.log(this.totalList);
        this.count[0].value = this.cubeFaceIdViseGameAttemtData.length;
        this.activeList = this.cubeFaceIdViseGameAttemtData.filter(
          (org: { isActive: string }) => org.isActive === 'A'
        );
        console.log(this.activeList);
        this.count[1].value = this.activeList.length;
        this.inactiveList = this.cubeFaceIdViseGameAttemtData.filter(
          (org: { isActive: string }) => org.isActive === 'D'
        );
        console.log(this.inactiveList);
        this.count[2].value = this.inactiveList.length;
      });
  }

  getCubeFaceGameStreak() {
    this.idOrganization = this.apiData?.user?.idOrganization;
    let StreakId = -1;
    this.https
      .getCubeFaceGameStreak(this.idOrganization, StreakId)
      .subscribe((res) => {
        console.log(res);
        this.cubeFaceGameStreak = res;

        this.cubeFaceIdViseGameStreakData = this.cubeFaceGameStreak.filter(
          (org: { cubesFacesId: string }) =>
            org.cubesFacesId === this.activeIndexTab + 1
        );
        console.log(this.cubeFaceIdViseGameStreakData);

        this.totalList = this.cubeFaceIdViseGameStreakData;
        console.log(this.totalList);
        this.count[0].value = this.cubeFaceIdViseGameStreakData.length;
        this.activeList = this.cubeFaceIdViseGameStreakData.filter(
          (org: { isActive: string }) => org.isActive === 'A'
        );
        console.log(this.activeList);
        this.count[1].value = this.activeList.length;
        this.inactiveList = this.cubeFaceIdViseGameStreakData.filter(
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

  navigateToEditQuestion(value: any) {
    console.log(value);
    console.log(this.questionListResponse[value]);
    let gamePointsActiveTab = this.activeSubSubTab;
    let cubeFaceId = this.activeIndexTab + 1;
    let categoryName = this.matTab[this.activeIndexTab].content;
    let questionData = JSON.stringify(this.questionListResponse[value]);
    this._router.navigate(['home/edit-question'], {
      queryParams: {
        cubeFaceId,
        gamePointsActiveTab,
        questionData,
        categoryName,
      },
    });
    this.isEditButtonVisible = !this.isEditButtonVisible;
  }

  navigateToViewQuestion(value: any) {
    console.log(value);
    console.log(this.questionListResponse[value]);
    let gamePointsActiveTab = this.activeSubSubTab;
    let cubeFaceId = this.activeIndexTab + 1;
    let categoryName = this.matTab[this.activeIndexTab].content;
    let questionData = JSON.stringify(this.questionListResponse[value]);
    let view = 'view';
    this._router.navigate(['home/edit-question'], {
      queryParams: {
        cubeFaceId,
        gamePointsActiveTab,
        questionData,
        categoryName,
        view,
      },
    });
  }

  editGameTime(value: any, label: any) {
    if (label == 'gametime') {
      console.log(this.cubeFaceIdViseGameTimeData[value]);
      let gamePointsActiveTab = this.activeSubSubTab;
      let cubesFacesGameId = JSON.stringify(
        this.cubeFaceIdViseGameTimeData[value]
      );
      let cubeFaceId = this.cubeFaceIdViseGameTimeData[value].cubesFacesId;
      let categoryName = this.cubeFaceIdViseGameTimeData[value].categoryName;
      this._router.navigate(['home/edit-question'], {
        queryParams: {
          cubeFaceId,
          gamePointsActiveTab,
          categoryName,
          cubesFacesGameId,
        },
      });
    } else if (label == 'attempt') {
      console.log(this.cubeFaceIdViseGameAttemtData[value]);
      let gamePointsActiveTab = this.activeSubSubTab;
      let cubeFaceGameAttemptEdit = JSON.stringify(
        this.cubeFaceIdViseGameAttemtData[value]
      );
      let cubeFaceId = this.cubeFaceIdViseGameAttemtData[value]?.cubesFacesId;
      let categoryName = this.cubeFaceIdViseGameAttemtData[value]?.categoryName;
      this._router.navigate(['home/edit-question'], {
        queryParams: {
          cubeFaceId,
          gamePointsActiveTab,
          categoryName,
          cubeFaceGameAttemptEdit,
        },
      });
    } else if (label == 'streak') {
      console.log(this.cubeFaceIdViseGameStreakData[value]);
      let gamePointsActiveTab = this.activeSubSubTab;
      let cubeFaceGameStreakEdit = JSON.stringify(
        this.cubeFaceIdViseGameStreakData[value]
      );
      let cubeFaceId = this.cubeFaceIdViseGameStreakData[value]?.cubesFacesId;
      let categoryName = this.cubeFaceIdViseGameStreakData[value]?.categoryName;
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
