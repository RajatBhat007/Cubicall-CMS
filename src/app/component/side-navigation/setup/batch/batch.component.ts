import { Component } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss'],
})
export class BatchComponent {
  selectedDropdownIndustryValue: string = 'Select from the drop-down';
  selectedDropdownBusinessTypeValue: string = 'Select from the drop-down';
  activeIndexSubTab: any = 0;
  activeIndexTab: any;
  activeUpdateButton: boolean = false;
  activeIndexSubTab0: any = 0;
  batch_name: any = '';
  isChecked: any;
  functionName = [
    {
      label: 'Defuse the Bomb',
      date: 'Click to Set a Date',
      batch_id: 1,
    },
    {
      label: 'Mystery Team',
      date: 'Click to Set a Date',
      batch_id: 2,
    },
    {
      label: 'Triangularis',
      date: 'Click to Set a Date',
      batch_id: 3,
    },
    {
      label: ' Word Search',
      date: 'Click to Set a Date',
      batch_id: 4,
    },
    {
      label: 'Word Wheel',
      date: 'Click to Set a Date',
      batch_id: 5,
    },
    {
      label: 'Crossword',
      date: 'Click to Set a Date',
      batch_id: 6,
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
  cubeFaceId: any;

  constructor(public apiservice: ApiServiceService) {
    console.log(this.activeUpdateButton);
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
      this.apiservice.getStages(this.idOrgnization).subscribe((res) => {
        console.log(res);
        this.stagesName = res;
        this.hierachicalStageName = this.stagesName?.hierarchyName;
      });
    }
  }

  updateSelectedIndustryValue(value: any, dataForstages: any) {
    console.log(dataForstages);
    this.selectedDropdownIndustryValue = value;
    this.IdOrgHierarchy = dataForstages.idOrgHierarchy;
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
            console.log(org);

            const batches =
              org?.lstBatches?.filter(
                (batch) => batch.objHeirarchyBatchesMaster.isActive === 'A'
              ) || [];
            console.log(batches);

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
  getCheckboxValue(index: any) {
    this.cubeFaceId = index;
    console.log(this.cubeFaceId);
  }
  createBatch() {
    console.log(this.batch_name);
    const payload = {
      Data: {
        objHeirarchyBatchesMaster: {
          IdOrgHierarchy: Number(this.IdOrgHierarchy),
          BatchName: this.batch_name,
          IsActive: '',
          IdOrganization: Number(this.idOrgnization),
          IdCmsUser: Number(this.idCMSUser),
          lstCubefaceBatchMaster: [
            {
              CubesFacesId: this.cubeFaceId,
              IdBatch: 1,
              ScheduledDateTime: this.formattedDate,
            },
          ],
        },
      },
    };
    const escapedobjHeirarchyBatchesMaster = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster
    );
    const escapedIdOrgHierarchy = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.IdOrgHierarchy
    );
    const escapedBatchName = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.BatchName
    );
    const escapedIsActive = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.IsActive
    );
    const escapedIdOrganization = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.IdOrganization
    );
    const escapedIdCmsUser = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.IdCmsUser
    );
    const escapedlstCubefaceBatchMaster = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.lstCubefaceBatchMaster
    );
    const escapeCubesFacesId = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.lstCubefaceBatchMaster[0]
        .CubesFacesId
    );
    const escapedIdBatch = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.lstCubefaceBatchMaster[0].IdBatch
    );
    const escapedScheduledDateTime = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.lstCubefaceBatchMaster[0]
        .ScheduledDateTime
    );

    console.log(payload);

    const escapedJsonString = `{\"objHeirarchyBatchesMaster\":${escapedobjHeirarchyBatchesMaster},\"IdOrgHierarchy\":${escapedIdOrgHierarchy},\"BatchName\":${escapedBatchName},\"IsActive\":${escapedIsActive},\"IdOrganization\":${escapedIdOrganization},\"IdCmsUser\":${escapedIdCmsUser},\"lstCubefaceBatchMaster\":${escapedlstCubefaceBatchMaster},\"CubesFacesId\":${escapeCubesFacesId},\"IdBatch\":${escapedIdBatch},\"IsActive\":${escapedIsActive},\"ScheduledDateTime\":${escapedScheduledDateTime}`;
    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    this.apiservice.createBatch(body).subscribe((res) => {
      console.log(res);
    });
  }
  editBatch(event: any) {
    console.log(event);
    // const payload = {
    //   Data: {
    //     objHeirarchyBatchesMaster:[{
    //         IdBatch:Number(1),
    //         IdOrgHierarchy:Number(1) ,
    //         IdOrganization:Number(1),
    //         BatchName:"abc",
    //         IsActive:"",
    //         IdCmsUser:Number(1)
    //     }],
    //     lstCubefaceBatchMaster:[
    //         {
    //             CubefaceBatchId:Number(1),
    //             CubesFacesId:Number(1),
    //             IdBatch:Number(1),
    //             IsActive:"",
    //             ScheduledDateTime: "2023-03-20"
    //         }
    //     ]
    // }
    // };
    const payload = {
      Data: {
        objHeirarchyBatchesMaster: {
          IdBatch: 1,
          IdOrgHierarchy: 1,
          IdOrganization: 1,
          BatchName: 'abc',
          IsActive: 'A',
          IdCmsUser: 1,
        },
        lstCubefaceBatchMaster: [
          {
            CubefaceBatchId: 1,
            CubesFacesId: 1,
            IdBatch: 1,
            IsActive: 'A',
            ScheduledDateTime: '2023-03-20',
          },
        ],
      },
    };

    const escapedobjHeirarchyBatchesMaster = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster
    );
    const escapedIdBatch = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.IdBatch
    );
    const escapedIdOrgHierarchy = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.IdOrgHierarchy
    );
    const escapedIdOrganization = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.IdOrganization
    );
    const escapedBatchName = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.BatchName
    );
    const escapedIsActive = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.IsActive
    );
    const escapedIdCmsUser = JSON.stringify(
      payload.Data.objHeirarchyBatchesMaster.IdCmsUser
    );
    const escapedCubefaceBatchId = JSON.stringify(
      payload.Data.lstCubefaceBatchMaster[0].CubefaceBatchId
    );
    const escapedCubesFacesId = JSON.stringify(
      payload.Data.lstCubefaceBatchMaster[0].CubesFacesId
    );
    const escapedIdBatchInner = JSON.stringify(
      payload.Data.lstCubefaceBatchMaster[0].IdBatch
    );
    const escapedScheduledDateTime = JSON.stringify(
      payload.Data.lstCubefaceBatchMaster[0].ScheduledDateTime
    );

    // Create a new JSON string with escaped values
    //   const escapedJsonString = `{
    //     objHeirarchyBatchesMaster:{
    //         IdBatch:1,
    //         IdOrgHierarchy: 1,
    //         IdOrganization: 1,
    //         BatchName:"abc",
    //         IsActive:"A",
    //         IdCmsUser:1
    //     },
    //     "lstCubefaceBatchMaster":[
    //         {
    //             CubefaceBatchId:1,
    //             CubesFacesId:1,
    //             IdBatch":,
    //             IsActive:"A",
    //             ScheduledDateTime: "2023-03-20"
    //         }
    //     ]
    // }`;

    const escapedJsonString = JSON.stringify({
      objHeirarchyBatchesMaster: {
        IdBatch: escapedIdBatch,
        IdOrgHierarchy: escapedIdOrgHierarchy,
        IdOrganization: escapedIdOrganization,
        BatchName: escapedBatchName,
        IsActive: escapedIsActive,
        IdCmsUser: escapedIdCmsUser,
      },
      lstCubefaceBatchMaster: [
        {
          CubefaceBatchId: escapedCubefaceBatchId,
          CubesFacesId: escapedCubesFacesId,
          IdBatch: escapedIdBatchInner,
          IsActive: escapedIsActive,
          ScheduledDateTime: escapedScheduledDateTime,
        },
      ],
    });

    // Now you have a valid JSON string with escaped values that matches the provided payload structure
    console.log(escapedJsonString);

    // Now you have a valid JSON string with escaped values
    console.log(escapedJsonString);

    const jsonString = JSON.stringify(escapedJsonString);
    console.log(jsonString);
    const jsonStringremovelast = jsonString.slice(0, -1);
    const body = '{"Data":' + jsonStringremovelast + '}"}';

    this.apiservice.editBatch(body).subscribe((res) => {
      console.log(res);
    });
  }
}
