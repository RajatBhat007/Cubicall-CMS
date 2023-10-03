import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  numberAttribute,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/pages/modal/modal.component';
import { ApiServiceService } from 'src/app/service/api-service.service';
@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
})
export class BatchComponent {
  [x: string]: any;
  @ViewChildren('checkboxes') checkboxes!: QueryList<ElementRef>;

  selectedDropdownIndustryValue: string = 'Select from the drop-down';
  selectedDropdownBusinessTypeValue: string = 'Select from the drop-down';
  activeIndexSubTab: any = 0;
  activeIndexTab: any;
  activeUpdateButton: boolean = false;
  activeIndexSubTab0: any = 0;
  batch_name: any = '';
  activeRadiobutton: number = 0;
  isChecked: any;
  cubesFaceMaster: any;
  dateForm: FormGroup;
  minEndDate: any;
  editBatchResponse: any = [];
  selectedDate: NgbDate | undefined;
  date: any;
  selectedDateFromCalender: any;
  errordate: boolean = false;
  isChecked1: boolean = false;
  selectedItems: any = [];
  editPayloadata: any;
  viewBatchId: number = 0;
  viewStage: string = '';
  edit: boolean = false;
  EditcubesFaceMaster: any;
  isDisabledCreateUser: boolean = true;
  isActive: string = '';
  uniqueArrayOfCubeGameTheme: any[] = [];

  functionName1 = [
    {
      label: 'Defuse the Bomb',
      date: 'Click to Set a Date',
      batch_id: 1,
      isSelected: 0,
    },
    {
      label: 'Mystery Term',
      date: 'Click to Set a Date',
      batch_id: 2,
      isSelected: 0,
    },
    {
      label: 'Triangularis',
      date: 'Click to Set a Date',
      batch_id: 3,
      isSelected: 0,
    },
    {
      label: ' Word Search',
      date: 'Click to Set a Date',
      batch_id: 4,
      isSelected: 0,
    },
    {
      label: 'Word Wheel',
      date: 'Click to Set a Date',
      batch_id: 5,
      isSelected: 0,
    },
    {
      label: 'Crossword',
      date: 'Click to Set a Date',
      batch_id: 6,
      isSelected: 0,
    },
  ];

  functionName = [
    {
      label: 'Defuse the Bomb',
      date: 'Click to Set a Date',
      batch_id: 1,
      isSelected: 0,
    },
    {
      label: 'Mystery Term',
      date: 'Click to Set a Date',
      batch_id: 2,
      isSelected: 0,
    },
    {
      label: 'Triangularis',
      date: 'Click to Set a Date',
      batch_id: 3,
      isSelected: 0,
    },
    {
      label: ' Word Search',
      date: 'Click to Set a Date',
      batch_id: 4,
      isSelected: 0,
    },
    {
      label: 'Word Wheel',
      date: 'Click to Set a Date',
      batch_id: 5,
      isSelected: 0,
    },
    {
      label: 'Crossword',
      date: 'Click to Set a Date',
      batch_id: 6,
      isSelected: 0,
    },
  ];
  CmsRoleList: any = [
    {
      label: 'About Life',
      role: 'Admin Access',
      function: 'Admin Access',
    },
    {
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
  subtab = [
    {
      label: 'Create Batch',
    },
    {
      label: 'Display all Batches',
    },
    // {
    //   "label":'Function to Role Mapping'
    // }
  ];
  count = [
    {
      label: 'Total:',
      value: '',
    },
    {
      label: 'Active:',
      value: '',
    },
    {
      label: 'Inactive:',
      value: '',
    },
  ];
  filteredBatches: any[] = [];

  idOrgnization: any;
  apiData: any;
  BatchData: any;
  totalCountCmsRoleList: any;
  totalBatches: any;
  activeBatches: any;
  inactiveBatches: any;
  CmsBatchList: any;
  isActivestatus: any = [];
  stagesName: any;
  hierachicalStageName: any;
  IdOrgHierarchy: any;
  scheduledTime: any;
  idCMSUser: any;
  formattedDate: any;
  cubeFaceId: any = [];
  batchDataResponse: any = [];
  today: NgbDateStruct;
  startDate: string = '';
  CheckedValue: number = 0;
  numberIndex: number | undefined;
  constructor(
    public apiservice: ApiServiceService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    const currentDate = new Date();
    this.today = {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
    };

    this.dateForm = this.fb.group({
      startDate: ['', Validators.required],
    });

    this.scheduledTime = new Date();

    const year = this.scheduledTime.getFullYear();

    const month = String(this.scheduledTime.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(this.scheduledTime.getDate()).padStart(2, '0');
    this.formattedDate = `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    this.apiservice.getApiData().subscribe((data) => {
      this.apiData = data;
      this.idCMSUser = this.apiData?.user?.idCmsUser;
      this.idOrgnization = this.apiData?.user?.idOrganization;
    });

    // this.idOrgnization=this.apiData?.user?.idOrganization
    if (this.activeIndexSubTab == 0) {
      this.apiservice.getStagesName(this.idCMSUser).subscribe((res) => {
        this.stagesName = res;
        this.hierachicalStageName = this.stagesName?.hierarchyName;
      });
    }
  }

  changeFilter(index: any) {
    if (index == 0) {
      this.CmsBatchList = this.batchDataResponse;
    } else if (index == 1) {
      this.CmsBatchList = this.activeBatches;
    } else if (index == 2) {
      this.CmsBatchList = this.inactiveBatches;
    }
  }
  // get startDateControl() {
  //   return this.dateForm.get('startDate');
  // }

  updateSelectedIndustryValue(value: any, dataForstages: any) {
    this.selectedDropdownIndustryValue = value;
    this.IdOrgHierarchy = dataForstages.idOrganizationHirarchy;
    this.scheduledTime = new Date();

    const year = this.scheduledTime.getFullYear();

    const month = String(this.scheduledTime.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(this.scheduledTime.getDate()).padStart(2, '0');
    this.formattedDate = `${year}-${month}-${day}`;
  }
  updateSelectedBusinessTypeValue(value: any) {
    this.selectedDropdownBusinessTypeValue = value;
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;

    if (this.activeIndexSubTab == 1) {
      this.apiservice.getBatch(this.idOrgnization).subscribe((res) => {
        this.BatchData = res;
        this.CmsBatchList = this.BatchData[0]?.lstBatches;
        this.batchDataResponse = this.CmsBatchList;

        this.totalBatches = this.CmsBatchList?.length;

        this.count[0].value = this.totalBatches;

        // this.filteredBatches = this.CmsBatchList?.reduce(
        //   (filtered: any, org: { lstBatches: any[] }) => {
        //     const batches =
        //       org?.lstBatches?.filter(
        //         (batch) => batch.objHeirarchyBatchesMaster.isActive === 'A'
        //       ) || [];

        //     return [...filtered, ...batches];
        //   },
        //   []
        // );

        this.activeBatches = this.CmsBatchList.filter(
          (item: { objOrganizationHierarchy: { isActive: string } }) =>
            item.objOrganizationHierarchy.isActive === 'A'
        );
        console.log(this.activeBatches); // This will log the filtered data to the console
        this.count[1].value = this.activeBatches?.length;

        this.inactiveBatches = this.CmsBatchList.filter(
          (item: { objOrganizationHierarchy: { isActive: string } }) =>
            item.objOrganizationHierarchy.isActive === 'D'
        );
        console.log(this.inactiveBatches); // This will log the filtered data to the console
        this.count[2].value = this.inactiveBatches?.length;
        console.log(this.CmsBatchList);

        // this.inactiveBatches =
        //   this.CmsBatchList?.objOrganizationHierarchy?.filter(
        //     (org: { isActive: string }) => org.isActive === 'A'
        //   );

        // this.count[1].value = this.inactiveBatches?.length;

        // this.count[2].value = this.activeBatches?.length;
        // this.inactiveBatches =
        //   this.CmsBatchList?.objHeirarchyBatchesMaster?.filter(
        //     (org: { status: string }) => org.status === 'D'
        //   );

        // this.count[2].value = this.inactiveBatches?.length;
      });
    } else {
      this.dateForm.reset();
    }
  }
  selectOption(index: any) {
    this.activeIndexTab = index;
  }
  //   setActiveTab(tabIndex: number) {
  //     this.activeTab = tabIndex;
  //   }
  NavigateToSubTab0(index: number) {
    this.activeIndexSubTab = index;
  }
  matchDate(event: Event, ID: any) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDateFromCalender = inputElement.value;

    if (this.selectedDateFromCalender != undefined) {
      this.cubeFaceId[ID - 1].ScheduledDateTime = this.selectedDateFromCalender;

      this.selectedDateFromCalender = this.formattedDate;
    } else {
      this.errordate = true;
    }
  }
  getCheckboxValue(event: any, idBatch: any, i: any) {
    this.cubesFaceMaster = {
      CubesFacesId: idBatch,
      IdBatch: 1,
      ScheduledDateTime: this.selectedDateFromCalender
        ? this.selectedDateFromCalender
        : this.formattedDate,
    };

    if (event.currentTarget.checked) {
      this.isActive == 'A';
      this.cubeFaceId.push(this.cubesFaceMaster);
    } else {
      for (let i = 1; i < this.editPayloadata.length; i++) {
        const indexToUpdate = this.editPayloadata.findIndex(
          (item: any) => item.cubesFacesId === idBatch
        );

        if (indexToUpdate !== -1) {
          this.cubesFaceMaster = {
            CubefaceBatchId:
              this.editPayloadata[indexToUpdate]?.cubefaceBatchId,
            CubesFacesId: this.editPayloadata[indexToUpdate]?.cubesFacesId,
            IdBatch: this.editPayloadata[indexToUpdate]?.idBatch,
            ScheduledDateTime: this.selectedDateFromCalender
              ? this.selectedDateFromCalender
              : this.formattedDate,
            IsActive: 'D',
          };
        }
        this.cubeFaceId.push(this.cubesFaceMaster);

        const uniqueIds = new Set();

        for (const obj of this.cubeFaceId) {
          if (!uniqueIds.has(obj.cubesFacesId)) {
            uniqueIds.add(obj.cubesFacesId);

            this.uniqueArrayOfCubeGameTheme.push(obj);
          }
        }
      }
      if (!this.edit) {
        if (idBatch != -1) {
          this.cubeFaceId.splice(idBatch - 1, 1);
        }
      }
    }
  }

  createBatch() {
    if (this.edit) {
      const payload = {
        Data: {
          objHeirarchyBatchesMaster: {
            IdBatch: this.editBatchResponse?.idBatch,
            IdOrgHierarchy:
              this.editBatchResponse?.objHeirarchyBatchesMaster?.idOrgHierarchy,
            IdOrganization:
              this.editBatchResponse?.objHeirarchyBatchesMaster?.idOrganization,
            BatchName: this.batch_name,
            IsActive:
              this.editBatchResponse?.objHeirarchyBatchesMaster?.isActive,
            IdCmsUser:
              this.editBatchResponse?.objHeirarchyBatchesMaster?.idCmsUser,
          },
          lstCubefaceBatchMaster: this.cubeFaceId,
        },
      };

      const escapedobjHeirarchyBatchesMaster = JSON.stringify(
        payload.Data.objHeirarchyBatchesMaster
      );
      const escapedlstCubefaceBatchMaster = JSON.stringify(
        payload.Data.lstCubefaceBatchMaster
      );

      const escapedJsonString = `{\"objHeirarchyBatchesMaster\":${escapedobjHeirarchyBatchesMaster},\"lstCubefaceBatchMaster\":${escapedlstCubefaceBatchMaster}`;
      const jsonString = JSON.stringify(escapedJsonString);

      const jsonStringremovelast = jsonString.slice(0, -1);
      const body = '{"Data":' + jsonStringremovelast + '}"}';

      this.apiservice.editBatch(body).subscribe((res) => {
        this.openModal('Done! The Batch has been Edit successfully.');
        this.checkboxes.forEach((element: any) => {
          element.nativeElement.checked = false;
        });
        this.ngOnInit();
        this.cubeFaceId = [];
        this.batch_name = '';
        this.selectedDropdownIndustryValue = 'Select from the drop-down';
        this.dateForm.reset();

        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            window.alert('404 Not Found Error');
          } else {
            window.alert(error.error);
          }
        };
      });
    } else {
      if (this.batch_name != '') {
        const payload = {
          Data: {
            objHeirarchyBatchesMaster: {
              IdOrgHierarchy: Number(this.IdOrgHierarchy),
              BatchName: this.batch_name,
              IsActive: '',
              IdOrganization: Number(this.idOrgnization),
              IdCmsUser: Number(this.idCMSUser),
            },
            lstCubefaceBatchMaster: this.cubeFaceId,
          },
        };
        const escapedobjHeirarchyBatchesMaster = JSON.stringify(
          payload.Data.objHeirarchyBatchesMaster
        );
        const escapedlstCubefaceBatchMaster = JSON.stringify(
          payload.Data.lstCubefaceBatchMaster
        );

        const escapedJsonString = `{\"objHeirarchyBatchesMaster\":${escapedobjHeirarchyBatchesMaster},\"lstCubefaceBatchMaster\":${escapedlstCubefaceBatchMaster}`;
        const jsonString = JSON.stringify(escapedJsonString);

        const jsonStringremovelast = jsonString.slice(0, -1);
        const body = '{"Data":' + jsonStringremovelast + '}"}';
        this.apiservice.createBatch(body).subscribe((res) => {
          this.openModal('Done! The Batch has been created successfully.');
          this.checkboxes.forEach((element: any) => {
            element.nativeElement.checked = false;
          });
          this.ngOnInit();
          this.cubeFaceId = [];
          this.batch_name = '';
          this.selectedDropdownIndustryValue = 'Select from the drop-down';
          this.dateForm.reset();

          (error: HttpErrorResponse) => {
            if (error.status === 404) {
              window.alert('404 Not Found Error');
            } else {
              window.alert(error.error);
            }
          };
        });
      }
    }
  }

  editBatch(event: any) {
    this.selectedItems = [];

    this.edit = true;

    this.editBatchResponse = event;
    console.log(this.editBatchResponse);
    this.functionName1.forEach((func) => {
      const matchingCubeFace =
        this.editBatchResponse.lstCubeFaceAndFaceDetails.find(
          (cubeFace: { cubesFacesId: number }) =>
            cubeFace.cubesFacesId === func.batch_id
        );

      if (matchingCubeFace) {
        func.date = matchingCubeFace.cubeFaceUpdatedDateTime;
      }
    });
    console.log(this.functionName1);

    // this.formattedDate = this.functionName1[0]?.date;
    // console.log(this.formattedDate);
    this.functionName = [
      {
        label: 'Defuse the Bomb',
        date: this.functionName1[0]?.date,
        batch_id: 1,
        isSelected: 0,
      },
      {
        label: 'Mystery Term',
        date: this.functionName1[1]?.date,
        batch_id: 2,
        isSelected: 0,
      },
      {
        label: 'Triangularis',
        date: this.functionName1[2]?.date,
        batch_id: 3,
        isSelected: 0,
      },
      {
        label: ' Word Search',
        date: this.functionName1[3]?.date,
        batch_id: 4,
        isSelected: 0,
      },
      {
        label: 'Word Wheel',
        date: this.functionName1[4]?.date,
        batch_id: 5,
        isSelected: 0,
      },
      {
        label: 'Crossword',
        date: this.functionName1[5]?.date,
        batch_id: 6,
        isSelected: 0,
      },
    ];

    console.log(this.functionName);

    this.selectedDropdownIndustryValue =
      event.objOrganizationHierarchy.hierarchyName;
    this.batch_name = event.objHeirarchyBatchesMaster.batchName;
    this.EditcubesFaceMaster = event?.lstCubeFaceAndFaceDetails;

    for (
      let i = 0;
      i < this.editBatchResponse?.lstCubeFaceAndFaceDetails?.length;
      i++
    ) {
      this.selectedItems.push(
        this.editBatchResponse?.lstCubeFaceAndFaceDetails?.[i]?.cubesFacesId
      );

      this.editPayloadata = this.editBatchResponse?.lstCubeFaceAndFaceDetails;

      if (Array.isArray(this.selectedItems)) {
        for (let i = 0; i < this.functionName.length; i++) {
          const indexToUpdate = this.selectedItems.findIndex(
            (item) => item === i + 1
          );

          if (indexToUpdate !== -1) {
            this.functionName[i].isSelected = 1;
          } else {
            this.functionName[i].isSelected = 0;
          }
        }
      } else {
        console.error('this.selectedItems is not an array');
      }
    }
    // const payload = {
    //   Data: {
    //     objHeirarchyBatchesMaster: {
    //       IdBatch: event?.idBatch,
    //       IdOrgHierarchy: event?.objHeirarchyBatchesMaster.idOrgHierarchy,
    //       IdOrganization: event?.objHeirarchyBatchesMaster?.idOrganization,
    //       BatchName: event?.objHeirarchyBatchesMaster?.batchName,
    //       IsActive: event?.objHeirarchyBatchesMaster?.isActive,
    //       IdCmsUser: event?.objHeirarchyBatchesMaster?.idCmsUser,
    //     },
    //     lstCubefaceBatchMaster: [
    //       {
    //         CubefaceBatchId: 1,
    //         CubesFacesId: event?.lstCubeFaceAndFaceDetails[0].cubesFacesId,
    //         IdBatch: event?.idBatch,
    //         IsActive: 'A',
    //         ScheduledDateTime: event?.objHeirarchyBatchesMaster.updatedDateTime,
    //       },
    //     ],
    //   },
    // };

    // const escapedobjHeirarchyBatchesMaster = JSON.stringify(
    //   payload.Data.objHeirarchyBatchesMaster
    // );
    // const escapedlstCubefaceBatchMaster = JSON.stringify(
    //   payload.Data.lstCubefaceBatchMaster
    // );
    //

    // const escapedJsonString = `{\"objHeirarchyBatchesMaster\":${escapedobjHeirarchyBatchesMaster},\"lstCubefaceBatchMaster\":${escapedlstCubefaceBatchMaster}`;
    // const jsonString = JSON.stringify(escapedJsonString);
    //
    // const jsonStringremovelast = jsonString.slice(0, -1);
    // const body = '{"Data":' + jsonStringremovelast + '}"}';
    //

    // this.apiservice.editBatch(body).subscribe((res) => {
    //
    // });
  }

  viewBatch(event: any) {
    this.viewBatchId = event?.idBatch;
    this.viewStage = event?.objOrganizationHierarchy?.hierarchyName;
    this.selectedItems = [];
    this.editBatchResponse = event;
    for (
      let i = 0;
      i < this.editBatchResponse?.lstCubeFaceAndFaceDetails.length;
      i++
    ) {
      this.selectedItems.push(
        this.editBatchResponse?.lstCubeFaceAndFaceDetails?.[i]?.cubesFacesId
      );

      if (Array.isArray(this.selectedItems)) {
        for (let i = 0; i < this.functionName.length; i++) {
          const indexToUpdate = this.selectedItems.findIndex(
            (item) => item === i + 1
          );

          if (indexToUpdate !== -1) {
            this.functionName[i].isSelected = 1;
          } else {
            this.functionName[i].isSelected = 0;
          }
        }
      } else {
        console.error('this.selectedItems is not an array');
      }
    }
  }
  openModal(msg: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      centered: true,
    });

    // You can pass data to the modal if needed
    modalRef.componentInstance.someData = msg;
    modalRef.componentInstance.screen = 'function';
  }
  ctrlFocus(e: any) {
    setTimeout(function () {
      let isOpenDP = e.isOpen();
      let isClosed = e['close'];
    }, 500);
  }

  ctrlBlur(e: any) {
    let isOpenDP = e.isOpen();
  }
  minEndDateChecking() {
    let startDate = this.formattedDate;
    if (startDate != null || startDate != undefined) {
      this.minEndDate = this.formattedDate;
    }
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
}
