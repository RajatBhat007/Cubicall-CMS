import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/pages/modal/modal.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent {
  value: any;
  selectedDropdownValue: string = 'Organization';
  activeIndexTab: any;
  cubeFaceId: number = 0;
  cubesFacesGameEditDetails: any;
  cubeFaceGameAttemptEditDetails: any;
  cubeFaceGameStreakEditDetails: any;
  questionEditData: any;
  gamePointsActiveTab: number = 0;
  currentValue: number = 10;
  gameTime: number = 0;
  tileTime: number = 15;
  attemptNo: number = 1;
  gamePoints: number = 10;
  streak: number = 5;
  streakNew: number = 10;
  streakNewPoint: number = 15;
  streakPoint: number = 15;
  categoryName: string = '';
  apiData: any;
  status: string = '';
  payload: any;
  activeStatus: String = '';
  // userInputcurrentValue:number=0;
  userInputAttemptNo: number = 0;
  userInputTileTime: number = 15;
  questionId: number = 0;
  question: string = '';
  questionClue: string = '';
  view: boolean = false;
  edit: boolean = false;
  organisationName: string = '';
  viewQuestionData: any = [];
  viewQuestionResponse: any = [];
  answerOption = [
    {
      option: 'Option 1',
    },

    {
      option: 'Option 2',
    },
    {
      option: 'Option 3',
    },
    {
      option: 'Option 4',
    },
  ];
  Attempt: any = [
    {
      attemt: 'Attempt 2: +5 points',
    },
    {
      attemt: 'Attempt 3: -2 points',
    },
    {
      attemt: 'Attempt 4: -5 points',
    },
  ];
  Streak: any = [
    {
      label: '10X Streak',
      value: '+20 points ',
    },
    {
      label: '16X Streak',
      value: '+15 points ',
    },
  ];
  constructor(
    private route: ActivatedRoute,
    public _router: Router,
    private http: ApiServiceService,
    private modalService: NgbModal,
    public authService: AuthService
  ) {
    // this.userInputcurrentValue=this.currentValue
    // this.userInputAttemptNo=this.attemptNo
  }

  ngOnInit(): void {
    this.cubeFaceId = 0;
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      console.log(this.apiData);
    });
    this.organisationName =
      this.apiData?.user?.idOrganizationNavigation?.organizationName;
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.value = params;
      console.log(this.value.cubeFaceId);
      this.cubeFaceId = this.value?.cubeFaceId;
      this.gamePointsActiveTab = this.value?.gamePointsActiveTab;
      this.categoryName = this.value?.categoryName;

      console.log(this.categoryName);
      console.log(typeof this.cubeFaceId);
      if (this.value?.cubesFacesGameId != undefined) {
        this.cubesFacesGameEditDetails = JSON.parse(
          this.value?.cubesFacesGameId
        );
        this.editCubeFaceGameTime(this.cubesFacesGameEditDetails);
      } else if (this.value?.cubeFaceGameAttemptEdit != undefined) {
        this.cubeFaceGameAttemptEditDetails = JSON.parse(
          this.value?.cubeFaceGameAttemptEdit
        );
        this.editCubeFaceGameAttempt(this.cubeFaceGameAttemptEditDetails);
      } else if (this.value?.cubeFaceGameStreakEdit != undefined) {
        this.cubeFaceGameStreakEditDetails = JSON.parse(
          this.value.cubeFaceGameStreakEdit
        );
        this.editCubeFaceGameStreak(this.cubeFaceGameStreakEditDetails);
      } else if (this.value?.view != undefined) {
        this.questionEditData = JSON.parse(this.value.questionData);
        this.gamePointsActiveTab = 4;
        this.view = true;
        console.log('view question', this.view);
        this.editQuestion(this.questionEditData);
      } else if (this.value?.questionData != undefined) {
        this.questionEditData = JSON.parse(this.value.questionData);
        this.gamePointsActiveTab = 4;
        this.edit = true;

        this.editQuestion(this.questionEditData);
      }
    });
  }

  updateSelectedValue(value: any) {
    this.selectedDropdownValue = value;
  }

  selectOption(index: any) {
    this.activeIndexTab = index;
  }

  increaseGameTimeValue(value: any) {
    if (value == 'gametime') {
      // if(this.userInputcurrentValue){
      //   this.userInputcurrentValue ++;
      //   this.currentValue=this.userInputcurrentValue
      // }
      // else{
      this.currentValue++;

      // }
    }
    if (value == 'defaulttiletime') {
      // if(this.userInputTileTime){
      //      this.userInputTileTime++;
      //     this.tileTime=this.userInputTileTime;
      // }
      // else{
      this.tileTime++;
      // }
    } else if (value == 'attemptNo') {
      if (this.userInputAttemptNo) {
        if (this.attemptNo < 4) {
          this.userInputAttemptNo++;
          this.attemptNo = this.userInputAttemptNo;
        }
      } else {
        if (this.attemptNo < 4) {
          this.attemptNo++;
        }
      }
    } else if (value == 'attemptPoints') {
      if (this.gamePoints < 1) {
        this.gamePoints++;
      } else {
        this.gamePoints++;
      }
    } else if (value == 'streak') {
      this.streak += 1;
      this.streakNew += 1;
    } else if (value == 'streakPoint') {
      this.streakPoint += 1;
      this.streakNewPoint += 1;
    }
  }
  decreaseGameTimeValue(value: any) {
    if (value == 'gametime') {
      if (this.currentValue > 1) {
        this.currentValue -= 1;
      }
    } else if (value == 'defaulttiletime') {
      if (this.tileTime > 1) {
        this.tileTime -= 1;
      }
    } else if (value == 'attemptNo') {
      if (this.attemptNo > 1) {
        this.attemptNo += 1;
      } else {
        this.attemptNo = 1;
      }
    } else if (value == 'attemptPoints') {
      if (this.gamePoints > 1) {
        this.gamePoints -= 1;
      } else {
        this.gamePoints += 1;
      }
    } else if (value == 'streak') {
      if (this.streakNew > 1) {
        this.streakNew -= 1;
      }
    } else if (value == 'streakPoint') {
      if (this.streakNewPoint > 1) {
        this.streakNewPoint -= 1;
      }
    }
  }

  checkBoxvalue(event: any) {
    console.log(event.currentTarget.checked);
    if (event.currentTarget.checked) {
      this.activeStatus = 'A';
      console.log(this.activeStatus);
    } else {
      this.activeStatus = 'D';
    }
  }

  increaseTileTimeValue() {
    this.tileTime += 1;
  }
  decreaseTileTimeValue() {
    if (this.tileTime > 1) {
      this.tileTime -= 1;
    }
  }
  openModal(msg: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.someData = msg;
    modalRef.componentInstance.screen = 'user';
  }
  setCubeFaceGameTime() {
    console.log(this.currentValue * 60);
    console.log(this.tileTime);
    console.log(this.cubeFaceId);
    console.log(this.categoryName);
    console.log(this.apiData?.user?.idOrganization);
    console.log(this.currentValue * 60 > this.tileTime * 16);
    const payload = {
      Data: {
        CubesFacesGameId: this.cubesFacesGameEditDetails?.cubesFacesGameId
          ? this.cubesFacesGameEditDetails?.cubesFacesGameId
          : 0,
        CubesFacesMapId: this.cubesFacesGameEditDetails?.cubesFacesMapId
          ? this.cubesFacesGameEditDetails?.cubesFacesMapId
          : 0,
        CubesFacesId: this.cubesFacesGameEditDetails?.cubeFaceId
          ? this.cubesFacesGameEditDetails?.cubeFaceId
          : Number(this.cubeFaceId),
        CategoryName: this.cubesFacesGameEditDetails?.categoryName
          ? this.cubesFacesGameEditDetails?.categoryName
          : this.categoryName,
        GameAttemptNo: this.cubesFacesGameEditDetails?.gameAttemptNo
          ? this.cubesFacesGameEditDetails?.gameAttemptNo
          : 3,
        PerTileTimer: this.tileTime,
        OverAllTimer: this.currentValue * 60,
        IdOrganization: this.cubesFacesGameEditDetails?.idOrganization
          ? this.cubesFacesGameEditDetails?.idOrganization
          : Number(this.apiData?.user?.idOrganization),
        IsActive: this.cubesFacesGameEditDetails?.isActive
          ? this.cubesFacesGameEditDetails?.isActive
          : 'A',
      },
    };

    console.log(this.payload);
    const escapedCubesFacesGameId = JSON.stringify(
      payload.Data.CubesFacesGameId
    );
    const escaoedCubesFacesMapId = JSON.stringify(payload.Data.CubesFacesMapId);
    const escaoedCubesFacesId = JSON.stringify(payload.Data.CubesFacesId);
    const escaoedCategoryName = JSON.stringify(payload.Data.CategoryName);
    const escapedGameAttemptNo = JSON.stringify(payload.Data.GameAttemptNo);
    const escaoedPerTileTimer = JSON.stringify(payload.Data.PerTileTimer);
    const escaoedOverAllTimer = JSON.stringify(payload.Data.OverAllTimer);
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedStatus = JSON.stringify(payload.Data.IsActive);

    const escapedJsonString = `{\"CubesFacesGameId\":${escapedCubesFacesGameId},\"CubesFacesMapId\":${escaoedCubesFacesMapId},\"CubesFacesId\":${escaoedCubesFacesId},\"CategoryName\":${escaoedCategoryName},\"GameAttemptNo\":${escapedGameAttemptNo},\"PerTileTimer\":${escaoedPerTileTimer},\"OverAllTimer\":${escaoedOverAllTimer},\"IdOrganization\":${escapedIdOrg},\"IsActive\":${escapedStatus}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';
    console.log(body);

    this.http.setCubeFaceGameTime(body).subscribe(
      (res) => {
        console.log(res);
        this.openModal(
          'Done! The Game Time and Tile Time has been Set successfully.'
        );
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

  editCubeFaceGameTime(data: any) {
    console.log(111222222222);

    this.currentValue = data.overAllTimer / 60;
    console.log(this.currentValue);

    this.tileTime = data.perTileTimer;
    this.status = data.isActive;
    console.log(this.tileTime);
  }

  setCubeFaceGameAttempt() {
    console.log(this.attemptNo);
    console.log(this.gamePoints);
    console.log(this.cubeFaceId);
    console.log(this.categoryName);
    console.log(this.apiData?.user?.idOrganization);
    const payload = {
      Data: {
        AttemptNoId: this.cubeFaceGameAttemptEditDetails?.attemptNoId
          ? this.cubeFaceGameAttemptEditDetails?.attemptNoId
          : 0,
        AttemptNoMapId: this.cubeFaceGameAttemptEditDetails?.attemptNoMapId
          ? this.cubeFaceGameAttemptEditDetails?.attemptNoMapId
          : 0,
        CubesFacesId: this.cubeFaceGameAttemptEditDetails?.cubesFacesId
          ? this.cubeFaceGameAttemptEditDetails?.cubesFacesId
          : Number(this.cubeFaceId),
        AttemptNo: this.attemptNo,
        GamePoints: this.gamePoints.toString(),
        IdOrganization: this.cubeFaceGameAttemptEditDetails?.idOrganization
          ? this.cubeFaceGameAttemptEditDetails?.idOrganization
          : Number(this.apiData?.user?.idOrganization),
        IsActive: this.cubeFaceGameAttemptEditDetails?.isActive
          ? this.cubeFaceGameAttemptEditDetails?.isActive
          : 'A',
      },
    };
    console.log(payload);
    const escapedAttemptNoId = JSON.stringify(payload.Data.AttemptNoId);
    const escaoedAttemptNoMapId = JSON.stringify(payload.Data.AttemptNoMapId);
    const escaoedCubesFacesId = JSON.stringify(payload.Data.CubesFacesId);
    const escapedAttemptNo = JSON.stringify(payload.Data.AttemptNo);
    const escaoedGamePoints = JSON.stringify(payload.Data.GamePoints);
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedStatus = JSON.stringify(payload.Data.IsActive);

    const escapedJsonString = `{\"AttemptNoId\":${escapedAttemptNoId},\"AttemptNoMapId\":${escaoedAttemptNoMapId},\"CubesFacesId\":${escaoedCubesFacesId},\"AttemptNo\":${escapedAttemptNo},\"GamePoints\":${escaoedGamePoints},\"IdOrganization\":${escapedIdOrg},\"IsActive\":${escapedStatus}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';
    console.log(body);
    this.http.setCubeFaceGameAttempt(body).subscribe(
      (res) => {
        console.log(res);
        this.openModal(
          'Done! The Attemt No. and Points has been inserted successfully.'
        );
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

  editCubeFaceGameAttempt(data: any) {
    console.log('editgameAtempt');
    this.attemptNo = data.attemptNo;
    this.gamePoints = data.gamePoints;
    this.status = data.isActive;
    console.log(this.tileTime);
  }

  setCubeFaceGameStreak() {
    console.log(this.streakNew);
    console.log(this.streakNewPoint);
    console.log(this.cubeFaceId);
    console.log(this.apiData?.user?.idOrganization);
    const payload = {
      Data: {
        StreakId: this.cubeFaceGameStreakEditDetails?.streakId
          ? this.cubeFaceGameStreakEditDetails?.streakId
          : 0,
        CubesFacesId: this.cubeFaceGameStreakEditDetails?.cubesFacesId
          ? this.cubeFaceGameStreakEditDetails?.cubesFacesId
          : Number(this.cubeFaceId),
        Streak: this.streakNew,
        StreakPoints: this.streakNewPoint,
        IdOrganization: this.cubeFaceGameStreakEditDetails?.idOrganization
          ? this.cubeFaceGameStreakEditDetails?.idOrganization
          : Number(this.apiData?.user?.idOrganization),
        IsActive: this.cubeFaceGameStreakEditDetails?.isActive
          ? this.cubeFaceGameStreakEditDetails?.isActive
          : 'A',
      },
    };
    console.log(payload);
    const escapedStreakId = JSON.stringify(payload.Data.StreakId);
    const escaoedCubesFacesId = JSON.stringify(payload.Data.CubesFacesId);
    const escapedStreak = JSON.stringify(payload.Data.Streak);
    const escaoedStreakPoints = JSON.stringify(payload.Data.StreakPoints);
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedStatus = JSON.stringify(payload.Data.IsActive);

    const escapedJsonString = `{\"StreakId\":${escapedStreakId},\"CubesFacesId\":${escaoedCubesFacesId},\"Streak\":${escapedStreak},\"StreakPoints\":${escaoedStreakPoints},\"IdOrganization\":${escapedIdOrg},\"IsActive\":${escapedStatus}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';
    console.log(body);
    this.http.setCubeFaceGameStreakDetails(body).subscribe(
      (res) => {
        console.log(res);
        this.openModal(
          'Done! The Streak and Points has been inserted successfully.'
        );
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
  editCubeFaceGameStreak(data: any) {
    console.log('editgameAtempt');
    this.streakNew = data?.streak;
    this.streakNewPoint = data?.streakPoints;
    this.status = data?.isActive;
    console.log(this.tileTime);
  }

  editQuestion(data: any) {
    this.questionId = data?.questionId;
    this.question = data?.question;
    this.questionClue = data?.questionClue;
    this.status = data?.isActive;
    console.log(this.questionId);

    this.http
      .getAllQuestionAnswerList(
        this.apiData?.user?.idOrganization,
        this.cubeFaceId
      )
      .subscribe((res) => {
        console.log(res);
        this.viewQuestionResponse = res;
        this.viewQuestionData = this.viewQuestionResponse.filter(
          (org: { questionId: number }) => org.questionId === this.questionId
        );
        console.log(this.viewQuestionData);
      });

    console.log('editQuestion', data);
  }

  postEditQuestion() {
    // {    "Data":"{\"AnsList\":[{\"PerTileAnswerId\": 1,\n \"CubesFacesGameId\": 1,\n \"QuestionId\": 1,\n \"Answer\": \"Prashnat\",\n \"IsRightAns\": 1,\n\"IsActive\": \"A\",\n \"IdOrganization\": 1}],\n \"QuestionList\": {\n\"PerTileQuestionId\": 1,\n\"IsActive\": \"A\",\n \"QuestionId\": 1,\n \"CubesFacesGameId\": 1,\n \"PerTileId\": 1,\n \"Question\": \"A _______ is support provided for a specific product or services for specific clients.\",\n \"Complexity\": 0,\n \"RowNo\": 1,\n \"ColumnNo\": 1,\n \"Direction\": \"across\",\n \"QuestionClue\":\"Individual client often have multiple of these.\",\n \"QuestionSet\": 0,\n \"IsApproved\": 0, \n \"IsDraft\": 0,\n \"IsActive\": \"A\",\n \"IdOrganization\":1}\n}"}
    const payload = {
      Data: {
        AnsList: [
          {
            PerTileAnswerId: '',
            CubesFacesGameId: '',
            QuestionId: '',
            Answer: '',
            IsRightAns: '',
            IsActive: '',
            IdOrganization: '',
          },
        ],
        QuestionList: [
          {
            PerTileQuestionId: '',
            IsActive: '',
            QuestionId: '',
            CubesFacesGameId: '',
            PerTileId: '',
            Question: '',
            Complexity: '',
            RowNo: '',
            ColumnNo: '',
            Direction: '',
            QuestionClue: '',
            QuestionSet: '',
            IsApproved: '',
            IsDraft: '',
            IdOrganization: '',
          },
        ],
      },
    };

    const escapedQuestionAnswer = JSON.stringify(payload.Data);
    const jsonString = JSON.stringify(escapedQuestionAnswer);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    this.http.editQuestionAns(body).subscribe((res) => {
      console.log(res);
    });
  }
  viewQuestionEdit() {
    this.view = false;
    this.edit = true;
  }

  close() {
    if (this.view) {
      let activeIndexSubTab = 0;
      this.view = false;
      this._router.navigate(['/home/game-theme'], {
        queryParams: { activeIndexSubTab },
      });
    } else if (this.edit) {
      let activeIndexSubTab = 0;
      this.edit = false;
      this._router.navigate(['/home/game-theme'], {
        queryParams: { activeIndexSubTab },
      });
    } else if (this.cubeFaceId == 1) {
      let activeIndexSubTab = 1;
      console.log(activeIndexSubTab);
      this._router.navigate(['/home/game-theme'], {
        queryParams: { activeIndexSubTab },
      });
    } else {
      this._router.navigate(['/home/game-theme']);
    }
  }

  logout() {
    this.authService.logout();
    this._router.navigateByUrl('');
  }
}
