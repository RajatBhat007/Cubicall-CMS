import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/pages/modal/modal.component';
import { AuthService } from 'src/app/auth/auth.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selectedAnswer: any = [];
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
  adminName: string = '';
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
  organisationRoleName: string = '';
  viewQuestionData: any = [];
  isRightAnsData: any = [];
  viewQuestionResponse: any = [];
  questionFormData: FormGroup;
  answarlistData: any;
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
  indexOfRightAnswer: any;
  payloadData: any = [];
  optionsArray: any;
  constructor(
    private route: ActivatedRoute,
    public _router: Router,
    private http: ApiServiceService,
    private modalService: NgbModal,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    // this.userInputcurrentValue=this.currentValue
    // this.userInputAttemptNo=this.attemptNo
    this.questionFormData = this.fb.group({
      questionDescription: ['', Validators.required],
      questionClueDescription: ['', Validators.required],
      options: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.cubeFaceId = 0;
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
    });
    this.organisationRoleName = this.apiData?.role?.roleName;
    this.organisationName = this.apiData?.role?.organizationName;
    this.adminName = this.apiData?.user?.name;

    this.route.queryParams.subscribe((params) => {
      this.value = params;

      this.cubeFaceId = this.value?.cubeFaceId;
      this.gamePointsActiveTab = this.value?.gamePointsActiveTab;
      this.categoryName = this.value?.categoryName;

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
    if (event.currentTarget.checked) {
      this.activeStatus = 'A';
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

    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    this.http.setCubeFaceGameTime(body).subscribe(
      (res) => {
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
    this.currentValue = data.overAllTimer / 60;

    this.tileTime = data.perTileTimer;
    this.status = data.isActive;
  }

  setCubeFaceGameAttempt() {
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

    const escapedAttemptNoId = JSON.stringify(payload.Data.AttemptNoId);
    const escaoedAttemptNoMapId = JSON.stringify(payload.Data.AttemptNoMapId);
    const escaoedCubesFacesId = JSON.stringify(payload.Data.CubesFacesId);
    const escapedAttemptNo = JSON.stringify(payload.Data.AttemptNo);
    const escaoedGamePoints = JSON.stringify(payload.Data.GamePoints);
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedStatus = JSON.stringify(payload.Data.IsActive);

    const escapedJsonString = `{\"AttemptNoId\":${escapedAttemptNoId},\"AttemptNoMapId\":${escaoedAttemptNoMapId},\"CubesFacesId\":${escaoedCubesFacesId},\"AttemptNo\":${escapedAttemptNo},\"GamePoints\":${escaoedGamePoints},\"IdOrganization\":${escapedIdOrg},\"IsActive\":${escapedStatus}`;
    const jsonString = JSON.stringify(escapedJsonString);

    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    this.http.setCubeFaceGameAttempt(body).subscribe(
      (res) => {
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
    this.attemptNo = data.attemptNo;
    this.gamePoints = data.gamePoints;
    this.status = data.isActive;
  }

  setCubeFaceGameStreak() {
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

    const escapedStreakId = JSON.stringify(payload.Data.StreakId);
    const escaoedCubesFacesId = JSON.stringify(payload.Data.CubesFacesId);
    const escapedStreak = JSON.stringify(payload.Data.Streak);
    const escaoedStreakPoints = JSON.stringify(payload.Data.StreakPoints);
    const escapedIdOrg = JSON.stringify(payload.Data.IdOrganization);
    const escapedStatus = JSON.stringify(payload.Data.IsActive);

    const escapedJsonString = `{\"StreakId\":${escapedStreakId},\"CubesFacesId\":${escaoedCubesFacesId},\"Streak\":${escapedStreak},\"StreakPoints\":${escaoedStreakPoints},\"IdOrganization\":${escapedIdOrg},\"IsActive\":${escapedStatus}`;
    const jsonString = JSON.stringify(escapedJsonString);

    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    this.http.setCubeFaceGameStreakDetails(body).subscribe(
      (res) => {
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
    this.streakNew = data?.streak;
    this.streakNewPoint = data?.streakPoints;
    this.status = data?.isActive;
  }

  // -----------------Question Details------------------------
  get questionDescriptionControl() {
    return this.questionFormData.get('questionDescription');
  }
  get questionClueControl() {
    return this.questionFormData.get('questionClueDescription');
  }
  get optionControl() {
    return this.questionFormData.get('options') as FormArray;
    this.optionsArray.push(this.fb.control(''));
  }
  addOption() {
    const optionsArray = this.questionFormData.get('options') as FormArray;
    optionsArray.push(this.fb.control(''));
    console.log(optionsArray);
  }
  editQuestion(data: any) {
    this.questionId = data?.questionId;
    this.question = data?.question;
    this.questionClue = data?.questionClue;
    this.status = data?.isActive;
    console.log(this.status);

    console.log(this.questionId);
    if (this.view) {
      this.questionFormData.get('questionDescription')?.disable();
      this.questionFormData.get('questionClueDescription')?.disable();
    } else {
      this.questionFormData.get('questionDescription')?.enable();
      this.questionFormData.get('questionClueDescription')?.enable();
    }
    // this.activeIndexTab=isRightAnsData
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

        const indexToUpdate = this.viewQuestionData.findIndex(
          (item: any) => item.isRightAns === 1
        );
        this.isRightAnsData = this.viewQuestionData[indexToUpdate];
        console.log(indexToUpdate);
        console.log(this.isRightAnsData);
        this.activeIndexTab = indexToUpdate;
        this.indexOfRightAnswer = indexToUpdate;
        console.log(this.activeIndexTab);
        this.selectedAnswer = this.viewQuestionData[indexToUpdate];
        console.log(this.selectedAnswer);
        console.log(this.viewQuestionData);
      });
    this.questionFormData.get('questionDescription')?.setValue(data?.question);
    this.questionFormData.get('questionDescription')?.value || '';
    this.questionFormData
      .get('questionClueDescription')
      ?.setValue(data?.questionClue);
    this.questionFormData.get('questionClueDescription')?.value || '';
  }

  selectOption(event: any, i: any, data: any) {
    this.addOption();
    this.activeIndexTab = i;
    if (data.isRightAns != 1) {
      this.payloadData = [];
      for (let index = 0; index < this.viewQuestionData.length; index++) {
        this.answarlistData = {
          PerTileAnswerId: this.viewQuestionData[index]?.perTileAnswerId,
          CubesFacesGameId: this.viewQuestionData[index]?.cubesFacesGameId,
          QuestionId: this.viewQuestionData[index]?.questionId,
          Answer: this.viewQuestionData[index]?.answer,
          IsRightAns: i === index ? 1 : 0,
          IsActive: 'A',
          PerTileId: this.viewQuestionData[index]?.perTileId,
          IdCmsUser: this.questionEditData?.idCmsUser,
          IdOrganization: this.viewQuestionData[index]?.idOrganization,
        };
        this.payloadData.push(this.answarlistData);
      }
      // this.payloadData[i].IsRightAns=1;
    } else {
      this.payloadData = [];
      this.answarlistData = {
        PerTileAnswerId: data?.perTileAnswerId,
        CubesFacesGameId: data?.cubesFacesGameId,
        QuestionId: data?.questionId,
        Answer: data?.answer,
        IsRightAns: data?.isRightAns,
        IsActive: 'A',
        PerTileId: data?.perTileId,
        IdCmsUser: this.questionEditData?.idCmsUser,
        IdOrganization: data?.idOrganization,
      };
      this.payloadData.push(this.answarlistData);
    }
  }

  postEditQuestion() {
    console.log(this.questionEditData);
    console.log(this.viewQuestionData);
    this.selectedAnswer = this.viewQuestionData[this.activeIndexTab];
    console.log(this.selectedAnswer);
    const payload = {
      Data: {
        AnsList: this.payloadData
          ? this.payloadData
          : [
              {
                PerTileAnswerId: this.selectedAnswer?.perTileAnswerId,
                CubesFacesGameId: this.selectedAnswer?.cubesFacesGameId,
                QuestionId: this.selectedAnswer?.questionId,
                Answer: this.selectedAnswer?.answer,
                IsRightAns: 1,
                IsActive: 'A',
                PerTileId: this.selectedAnswer?.perTileId,
                IdCmsUser: this.questionEditData?.idCmsUser,
                IdOrganization: this.questionEditData?.idOrganization,
              },
            ],
        QuestionList: {
          PerTileQuestionId: this.questionEditData?.perTileQuestionId,
          IsActive: this.questionEditData?.isActive,
          QuestionId: this.questionEditData?.questionId,
          CubesFacesGameId: this.questionEditData?.cubesFacesGameId,
          PerTileId: this.questionEditData?.perTileId,
          Question: this.questionDescriptionControl?.value,
          Complexity: this.questionEditData?.complexity,
          RowNo: this.questionEditData?.complexity,
          ColumnNo: this.questionEditData?.rowNo
            ? this.questionEditData?.rowNo
            : 0,
          Direction: this.questionEditData?.direction
            ? this.questionEditData?.direction
            : 'across',
          QuestionClue: this.questionClueControl?.value,
          QuestionSet: this.questionEditData?.questionSet,
          IsApproved: this.questionEditData?.isApproved,
          IsDraft: this.questionEditData?.isDraft,
          IdCmsUser: this.questionEditData?.idCmsUser,
          IdOrganization: this.questionEditData?.idOrganization,
        },
      },
    };

    const escapedQuestionAnswer = JSON.stringify(payload.Data);
    const jsonString = JSON.stringify(escapedQuestionAnswer);

    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '"}';
    console.log(body);

    this.http.editQuestionAns(body).subscribe((res) => {
      console.log(res);
      this.openModal('Done! The Question has been edited successfully.');
    });
  }
  viewQuestionEdit() {
    this.questionFormData.get('questionDescription')?.enable();
    this.questionFormData.get('questionClueDescription')?.enable();
    this.view = false;
    this.edit = true;
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
