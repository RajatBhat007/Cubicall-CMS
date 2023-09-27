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
  isChecked: any;
  cubesFaceMaster: any;
  dateForm: FormGroup;
  minEndDate: any;
  editBatchResponse: any = [0];
  selectedDate: NgbDate | undefined;
  date: any;
  selectedDateFromCalender: any;
  errordate: boolean = false;
  isChecked1: boolean = false;
  selectedItems: any = [];
  viewBatchId: number = 0;
  viewStage: string = '';
  edit: boolean = false;
  EditcubesFaceMaster: any;
  isDisabledCreateUser: boolean = true;
  isActive: string = '';
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
    console.log(this.today);

    this.dateForm = this.fb.group({
      startDate: ['', Validators.required],
    });

    this.scheduledTime = new Date();
    console.log(this.scheduledTime.getFullYear());
    const year = this.scheduledTime.getFullYear();
    console.log(year);

    const month = String(this.scheduledTime.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(this.scheduledTime.getDate()).padStart(2, '0');
    this.formattedDate = `${year}-${month}-${day}`;
    console.log(this.formattedDate);
  }

  ngOnInit(): void {
    console.log(this.isChecked);
    this.apiservice.getApiData().subscribe((data) => {
      this.apiData = data;
      this.idCMSUser = this.apiData?.user?.idCmsUser;
      this.idOrgnization = this.apiData?.user?.idOrganization;

      console.log(this.idCMSUser);
      console.log(this.apiData);
    });

    // this.idOrgnization=this.apiData?.user?.idOrganization
    if (this.activeIndexSubTab == 0) {
      this.apiservice.getStagesName(this.idCMSUser).subscribe((res) => {
        console.log(res);
        this.stagesName = res;
        this.hierachicalStageName = this.stagesName?.hierarchyName;
      });
    }
  }
  // get startDateControl() {
  //   return this.dateForm.get('startDate');
  // }

  updateSelectedIndustryValue(value: any, dataForstages: any) {
    console.log(dataForstages);
    this.selectedDropdownIndustryValue = value;
    this.IdOrgHierarchy = dataForstages.idOrganizationHirarchy;
    this.scheduledTime = new Date();
    console.log(this.scheduledTime.getFullYear());
    const year = this.scheduledTime.getFullYear();
    console.log(year);

    const month = String(this.scheduledTime.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
    const day = String(this.scheduledTime.getDate()).padStart(2, '0');
    this.formattedDate = `${year}-${month}-${day}`;
    console.log(this.formattedDate);
    console.log(this.IdOrgHierarchy);
    console.log(this.selectedDropdownIndustryValue);
  }
  updateSelectedBusinessTypeValue(value: any) {
    this.selectedDropdownBusinessTypeValue = value;
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index;
    console.log(this.activeIndexSubTab);

    if (this.activeIndexSubTab == 1) {
      this.apiservice.getBatch(this.idOrgnization).subscribe((res) => {
        console.log(res);
        this.BatchData = res;
        this.CmsBatchList = this.BatchData[0]?.lstBatches;
        console.log(this.CmsBatchList);
        this.totalBatches = this.CmsBatchList?.length;
        console.log(this.totalBatches);

        this.count[0].value = this.totalBatches;
        console.log(this.count[0].value);

        console.log(this.CmsBatchList);

        this.filteredBatches = this.CmsBatchList?.reduce(
          (filtered: any, org: { lstBatches: any[] }) => {
            const batches =
              org?.lstBatches?.filter(
                (batch) => batch.objHeirarchyBatchesMaster.isActive === 'A'
              ) || [];

            return [...filtered, ...batches];
          },
          []
        );

        this.count[1].value = this.activeBatches?.length;
        this.inactiveBatches =
          this.CmsBatchList?.objHeirarchyBatchesMaster?.filter(
            (org: { status: string }) => org.status === 'D'
          );

        this.count[2].value = this.inactiveBatches?.length;
      });
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
    console.log(this.selectedDateFromCalender);
    if (this.selectedDateFromCalender != undefined) {
      console.log(ID);
      this.cubeFaceId[ID - 1].ScheduledDateTime = this.selectedDateFromCalender;
      console.log(this.cubeFaceId);
      this.selectedDateFromCalender = this.formattedDate;
    } else {
      this.errordate = true;
    }
  }
  getCheckboxValue(event: any, idBatch: any, i: any) {
    // if (this.edit) {
    //  console.log( this.EditcubesFaceMaster  ,'edit cube');
    //  if (event.currentTarget.checked){
    //   console.log('unchaked');

    //  }

    // } else {

    // }

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
      console.log(idBatch);
    } else {
      this.isActive == 'D';
      console.log(idBatch);
      console.log(this.cubeFaceId[idBatch - 1].CubesFacesId);
      console.log(idBatch);

      // new ----------------------------------

      // ---------------------------------
      if (idBatch !== -1) {
        console.log('hreleleo');

        this.cubeFaceId.splice(idBatch - 1, 1);
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
      console.log(payload);

      const escapedJsonString = `{\"objHeirarchyBatchesMaster\":${escapedobjHeirarchyBatchesMaster},\"lstCubefaceBatchMaster\":${escapedlstCubefaceBatchMaster}`;
      const jsonString = JSON.stringify(escapedJsonString);
      console.log(jsonString);
      const jsonStringremovelast = jsonString.slice(0, -1);
      const body = '{"Data":' + jsonStringremovelast + '}"}';
      console.log(body);
      this.apiservice.editBatch(body).subscribe((res) => {
        console.log(res);

        this.openModal('Done! The Batch has been Edit successfully.');
        this.checkboxes.forEach((element: any) => {
          element.nativeElement.checked = false;
        });
        this.ngOnInit();
        this.cubeFaceId = [];
        this.batch_name = '';
        this.selectedDropdownIndustryValue = 'Select from the drop-down';

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
        console.log(this.batch_name);
        console.log(this.cubeFaceId);
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
        console.log(payload);
        const escapedJsonString = `{\"objHeirarchyBatchesMaster\":${escapedobjHeirarchyBatchesMaster},\"lstCubefaceBatchMaster\":${escapedlstCubefaceBatchMaster}`;
        const jsonString = JSON.stringify(escapedJsonString);
        console.log(jsonString);
        const jsonStringremovelast = jsonString.slice(0, -1);
        const body = '{"Data":' + jsonStringremovelast + '}"}';
        this.apiservice.createBatch(body).subscribe((res) => {
          console.log(res);
          this.openModal('Done! The Batch has been created successfully.');
          this.checkboxes.forEach((element: any) => {
            element.nativeElement.checked = false;
          });
          this.ngOnInit();
          this.cubeFaceId = [];
          this.batch_name = '';
          this.selectedDropdownIndustryValue = 'Select from the drop-down';

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
    console.log(this.selectedItems);
    this.edit = true;
    console.log(event);
    this.editBatchResponse = event;
    this.selectedDropdownIndustryValue =
      event.objOrganizationHierarchy.hierarchyName;
    this.batch_name = event.objHeirarchyBatchesMaster.batchName;
    this.EditcubesFaceMaster = event?.lstCubeFaceAndFaceDetails;
    console.log(this.EditcubesFaceMaster);

    for (
      let i = 0;
      i < this.editBatchResponse?.lstCubeFaceAndFaceDetails?.length;
      i++
    ) {
      this.selectedItems.push(
        this.editBatchResponse?.lstCubeFaceAndFaceDetails?.[i]?.cubesFacesId
      );

      console.log(this.selectedItems);

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
    const payload = {
      Data: {
        objHeirarchyBatchesMaster: {
          IdBatch: event?.idBatch,
          IdOrgHierarchy: event?.objHeirarchyBatchesMaster.idOrgHierarchy,
          IdOrganization: event?.objHeirarchyBatchesMaster?.idOrganization,
          BatchName: event?.objHeirarchyBatchesMaster?.batchName,
          IsActive: event?.objHeirarchyBatchesMaster?.isActive,
          IdCmsUser: event?.objHeirarchyBatchesMaster?.idCmsUser,
        },
        lstCubefaceBatchMaster: [
          {
            CubefaceBatchId: 1,
            CubesFacesId: event?.lstCubeFaceAndFaceDetails[0].cubesFacesId,
            IdBatch: event?.idBatch,
            IsActive: 'A',
            ScheduledDateTime: event?.objHeirarchyBatchesMaster.updatedDateTime,
          },
        ],
      },
    };

    const escapedobjHeirarchyBatchesMaster = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster
    );
    const escapedlstCubefaceBatchMaster = JSON.stringify(
      payload.Data.lstCubefaceBatchMaster
    );
    console.log(payload);

    const escapedJsonString = `{\"objHeirarchyBatchesMaster\":${escapedobjHeirarchyBatchesMaster},\"lstCubefaceBatchMaster\":${escapedlstCubefaceBatchMaster}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';
    console.log(body);

    // this.apiservice.editBatch(body).subscribe((res) => {
    //   console.log(res);
    // });
  }

  viewBatch(event: any) {
    console.log(event);
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

      console.log(this.selectedItems);

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
    console.log(typeof e, '-----ctrlFocus-------', e.validate());
    setTimeout(function () {
      let isOpenDP = e.isOpen();
      let isClosed = e['close'];
      console.log(isClosed, '--isClosed---isOpenDP--00000000---', isOpenDP);
    }, 500);
  }

  ctrlBlur(e: any) {
    // console.log('-----ctrlBlur-------', e);
    let isOpenDP = e.isOpen();
    console.log(typeof isOpenDP, '-----isOpenDP-111111111----', isOpenDP);
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
