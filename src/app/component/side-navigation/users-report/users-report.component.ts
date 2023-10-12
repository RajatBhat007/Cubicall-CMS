import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { saveAs } from 'file-saver';


import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

@Component({
  selector: 'app-users-report',
  templateUrl: './users-report.component.html',
  styleUrls: ['./users-report.component.scss'],
})
export class UsersReportComponent {
  activeSubIndexTab: any = 0;
  tableTitleValue: string = 'Vendors';
  selectedFromTable: any;
  process: any;
  subprocess: any;
  stagewise: any;
  Batchwise: any;
  userwise: any;
  vendorwise: any;
  currentLevel: any;
  currentStage = 0;
  level: any = 1;
  apiData: any;
  userReportDataByOrgHierarchy: any;
  orgHierarchyId: any;
  userReportDataByBatches: any;
  batchId: number=0;
  adminName: any;
  userData: any;
  excelType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  cubewisedata: any;
  groupedData: any;
  userIDgroup: any;

  constructor(
    public _router: Router,
    private _route: ActivatedRoute,
    public authService: AuthService,
    public http: ApiServiceService
  ) {}
  activeIndexTab: any = 0;
  selectedDropdownValue: any;
  isOpenPerformance: boolean = true;
  isOpenEngagement: boolean = false;
  showPassword: boolean = true;
  organisationName: string = '';
  organisationRoleName: string = '';
  selectedValue: string = 'All Vendorwise Report';
  data = [
    // Your data here
  ];
  batchAverages:any=[];

  matTab = [
    {
      content: 'Performance',

      Image: '/assets/images/Performance.svg',
    },
    {
      content: 'Engagement',

      Image: '/assets/images/Engagement.svg',
    },
  ];

  matSubTab = [
    {
      content: 'Overall',
      color: '#7B7FCF',
    },
    {
      content: 'Defuse the Bomb',
      color: '#7B7FCF',
    },
    {
      content: 'Mystery Term',
      color: '#D43539',
    },
    {
      content: 'Triangularis',
      color: '#FAA54A',
    },
    {
      content: 'Word Search',
      color: '#55BC87',
    },
    {
      content: 'Word Wheel',
      color: '#FBA2D4',
    },
    {
      content: 'Crossword',
      color: '#903FB1',
    },
  ];

  tableContent = [
    {
      UserName: 'User1',
      AHT: '0000000',
      FCR: '000%',
      Quality: '000%',
      Service_level: '000%',
      Performance: 'High',
      process: [
        {
          UserName: 'User1',
          AHT: '0000000',
          FCR: '000%',
          Quality: '000%',
          Service_level: '000%',
          Performance: 'High',
          subprocess: [
            {
              UserName: 'User1',
              AHT: '0000000',
              FCR: '000%',
              Quality: '000%',
              Service_level: '000%',
              Performance: 'High',
              stagewise: [
                {
                  UserName: 'User1',
                  AHT: '0000000',
                  FCR: '000%',
                  Quality: '000%',
                  Service_level: '000%',
                  Performance: 'High',
                  Batchwise: [
                    {
                      UserName: 'User1',
                      AHT: '0000000',
                      FCR: '000%',
                      Quality: '000%',
                      Service_level: '000%',
                      Performance: 'High',
                      Userwise: [
                        {
                          UserName: 'User1',
                          AHT: '0000000',
                          FCR: '000%',
                          Quality: '000%',
                          Service_level: '000%',
                          Performance: 'High',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          UserName: 'User2',
          AHT: '0000000',
          FCR: '000%',
          Quality: '000%',
          Service_level: '000%',
          Performance: 'Low',
          subprocess: [
            {
              UserName: 'User2',
              AHT: '0000000',
              FCR: '000%',
              Quality: '000%',
              Service_level: '111%',
              Performance: 'High',
              stagewise: [
                {
                  UserName: 'User2',
                  AHT: '0000000',
                  FCR: '000%',
                  Quality: '000%',
                  Service_level: '000%',
                  Performance: 'High',
                  Batchwise: [
                    {
                      UserName: 'User2',
                      AHT: '0000000',
                      FCR: '000%',
                      Quality: '000%',
                      Service_level: '000%',
                      Performance: 'High',
                      Userwise: [
                        {
                          UserName: 'User2',
                          AHT: '0000000',
                          FCR: '000%',
                          Quality: '000%',
                          Service_level: '000%',
                          Performance: 'High',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      UserName: 'User2',
      AHT: '0000000',
      FCR: '000%',
      Quality: '000%',
      Service_level: '000%',
      Performance: 'High',
      process: [
        {
          UserName: 'User1',
          AHT: '0000000',
          FCR: '000%',
          Quality: '000%',
          Service_level: '000%',
          Performance: 'High',
          subprocess: [
            {
              UserName: 'User1',
              AHT: '0000000',
              FCR: '000%',
              Quality: '000%',
              Service_level: '000%',
              Performance: 'High',
              stagewise: [
                {
                  UserName: 'User1',
                  AHT: '0000000',
                  FCR: '000%',
                  Quality: '000%',
                  Service_level: '000%',
                  Performance: 'High',
                  Batchwise: [
                    {
                      UserName: 'User1',
                      AHT: '0000000',
                      FCR: '000%',
                      Quality: '000%',
                      Service_level: '000%',
                      Performance: 'High',
                      Userwise: [
                        {
                          UserName: 'User1',
                          AHT: '0000000',
                          FCR: '000%',
                          Quality: '000%',
                          Service_level: '000%',
                          Performance: 'High',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      UserName: 'User3',
      AHT: '0000000',
      FCR: '000%',
      Quality: '000%',
      Service_level: '000%',
      Performance: 'Moderate',
      process: [
        {
          UserName: 'User1',
          AHT: '0000000',
          FCR: '121%',
          Quality: '90%',
          Service_level: '000%',
          Performance: 'High',
          subprocess: [
            {
              UserName: 'User1',
              AHT: '0000000',
              FCR: '000%',
              Quality: '000%',
              Service_level: '000%',
              Performance: 'High',
              stagewise: [
                {
                  UserName: 'User1',
                  AHT: '0000000',
                  FCR: '000%',
                  Quality: '000%',
                  Service_level: '000%',
                  Performance: 'High',
                  Batchwise: [
                    {
                      UserName: 'User1',
                      AHT: '0000000',
                      FCR: '000%',
                      Quality: '000%',
                      Service_level: '000%',
                      Performance: 'High',
                      Userwise: [
                        {
                          UserName: 'User1',
                          AHT: '0000000',
                          FCR: '000%',
                          Quality: '000%',
                          Service_level: '000%',
                          Performance: 'High',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          UserName: 'User1',
          AHT: '0000000',
          FCR: '121%',
          Quality: '90%',
          Service_level: '000%',
          Performance: 'Moderate',
          subprocess: [
            {
              UserName: 'User1',
              AHT: '0000000',
              FCR: '000%',
              Quality: '000%',
              Service_level: '000%',
              Performance: 'High',
              stagewise: [
                {
                  UserName: 'User1',
                  AHT: '0000000',
                  FCR: '000%',
                  Quality: '000%',
                  Service_level: '000%',
                  Performance: 'High',
                  Batchwise: [
                    {
                      UserName: 'User1',
                      AHT: '0000000',
                      FCR: '000%',
                      Quality: '000%',
                      Service_level: '000%',
                      Performance: 'High',
                      Userwise: [
                        {
                          UserName: 'User1',
                          AHT: '0000000',
                          FCR: '000%',
                          Quality: '000%',
                          Service_level: '000%',
                          Performance: 'Moderate',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          UserName: 'User1',
          AHT: '0000000',
          FCR: '113%',
          Quality: '110%',
          Service_level: '000%',
          Performance: 'High',
          subprocess: [
            {
              UserName: 'User1',
              AHT: '0000000',
              FCR: '000%',
              Quality: '000%',
              Service_level: '000%',
              Performance: 'High',
              stagewise: [
                {
                  UserName: 'User1',
                  AHT: '0000000',
                  FCR: '000%',
                  Quality: '000%',
                  Service_level: '000%',
                  Performance: 'High',
                  Batchwise: [
                    {
                      UserName: 'User1',
                      AHT: '0000000',
                      FCR: '000%',
                      Quality: '000%',
                      Service_level: '000%',
                      Performance: 'High',
                      Userwise: [
                        {
                          UserName: 'User1',
                          AHT: '0000000',
                          FCR: '000%',
                          Quality: '000%',
                          Service_level: '000%',
                          Performance: 'Moderate',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      UserName: 'User4',
      AHT: '0000000',
      FCR: '000%',
      Quality: '000%',
      Service_level: '000%',
      Performance: 'Moderate',
      process: [
        {
          UserName: 'User1',
          AHT: '0000000',
          FCR: '000%',
          Quality: '000%',
          Service_level: '000%',
          Performance: 'High',
          subprocess: [
            {
              UserName: 'User1',
              AHT: '0000000',
              FCR: '000%',
              Quality: '000%',
              Service_level: '000%',
              Performance: 'High',
              stagewise: [
                {
                  UserName: 'User1',
                  AHT: '0000000',
                  FCR: '000%',
                  Quality: '000%',
                  Service_level: '000%',
                  Performance: 'High',
                  Batchwise: [
                    {
                      UserName: 'User1',
                      AHT: '0000000',
                      FCR: '000%',
                      Quality: '000%',
                      Service_level: '000%',
                      Performance: 'High',
                      Userwise: [
                        {
                          UserName: 'User1',
                          AHT: '0000000',
                          FCR: '000%',
                          Quality: '000%',
                          Service_level: '000%',
                          Performance: 'High',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      UserName: 'User5',
      AHT: '0000000',
      FCR: '000%',
      Quality: '000%',
      Service_level: '000%',
      Performance: 'Low',
      process: [
        {
          UserName: 'User1',
          AHT: '0000000',
          FCR: '000%',
          Quality: '000%',
          Service_level: '000%',
          Performance: 'High',
          subprocess: [
            {
              UserName: 'User1',
              AHT: '0000000',
              FCR: '000%',
              Quality: '000%',
              Service_level: '000%',
              Performance: 'High',
              stagewise: [
                {
                  UserName: 'User1',
                  AHT: '0000000',
                  FCR: '000%',
                  Quality: '000%',
                  Service_level: '000%',
                  Performance: 'High',
                  Batchwise: [
                    {
                      UserName: 'User1',
                      AHT: '0000000',
                      FCR: '000%',
                      Quality: '000%',
                      Service_level: '000%',
                      Performance: 'High',
                      Userwise: [
                        {
                          UserName: 'User1',
                          AHT: '0000000',
                          FCR: '000%',
                          Quality: '000%',
                          Service_level: '000%',
                          Performance: 'High',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      UserName: 'User6',
      AHT: '0000000',
      FCR: '000%',
      Quality: '000%',
      Service_level: '000%',
      Performance: 'Low',
      process: [
        {
          UserName: 'User1',
          AHT: '0000000',
          FCR: '000%',
          Quality: '000%',
          Service_level: '000%',
          Performance: 'High',
          subprocess: [
            {
              UserName: 'User1',
              AHT: '0000000',
              FCR: '000%',
              Quality: '000%',
              Service_level: '000%',
              Performance: 'High',
              stagewise: [
                {
                  UserName: 'User1',
                  AHT: '0000000',
                  FCR: '000%',
                  Quality: '000%',
                  Service_level: '000%',
                  Performance: 'High',
                  Batchwise: [
                    {
                      UserName: 'User1',
                      AHT: '0000000',
                      FCR: '000%',
                      Quality: '000%',
                      Service_level: '000%',
                      Performance: 'High',
                      Userwise: [
                        {
                          UserName: 'User1',
                          AHT: '0000000',
                          FCR: '000%',
                          Quality: '000%',
                          Service_level: '000%',
                          Performance: 'High',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  tableContentForEngagement = [
    {
      ScreenTime: '740',
      Total_Attempts: '20',
      Engagement: 'High',
    },
    {
      ScreenTime: '740',
      Total_Attempts: '20',
      Engagement: 'High',
    },
    {
      ScreenTime: '740',
      Total_Attempts: '20',
      Engagement: 'High',
    },
    {
      ScreenTime: '740',
      Total_Attempts: '20',
      Engagement: 'High',
    },
    {
      ScreenTime: '740',
      Total_Attempts: '20',
      Engagement: 'High',
    },
    {
      ScreenTime: '740',
      Total_Attempts: '20',
      Engagement: 'High',
    },
  ];

  ngOnInit(): void {
    this.selectedValue = 'All Batchwise Report';
    this.currentLevel = this.tableContent;
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      console.log(this.apiData);
      this.organisationRoleName = this.apiData?.role?.roleName;
      this.organisationName = this.apiData?.role?.organizationName;
      this.adminName = this.apiData?.user?.name;

      this.orgHierarchyId= this.apiData?.user?.idOrgHierarchy;
    });
    this.getUserReportBy_Batches()

  }
  selectedTableValue(value: string) {
    this.selectedValue = value; // Set the selected value

    switch (value) {
      case 'All Vendorwise Report':
        this.tableTitleValue = 'Vendors';
        this.currentLevel = this.tableContent;
        this.level = 0;
        break;
      case 'All Processwise Report':
        this.tableTitleValue = 'Process';
        break;
      case 'All Sub Processwise Report':
        this.tableTitleValue = 'Sub Process';
        break;
      case 'All Stagewise Report':
        this.tableTitleValue = 'Stage';
        break;
      // case 'All Organisation Hierarchywise Report':
      //   this.getUserReportByOrgHierarchy();
      //   this.tableTitleValue = 'Vendors';
      //   break;
      case 'All Batchwise Report':
        this.getUserReportBy_Batches();
        this.batchAverages=[]
        this.tableTitleValue = 'Batch';
        break;
      case 'All Userwise Report':
        this.getUserReportBy_Users(this.apiData?.user?.idCmsUser);
        this.tableTitleValue = 'User';
        break;
    
      default:
        this.tableTitleValue = 'Vendors';
        this.level = 0;
        break;
    }

    console.log(this.tableTitleValue);
  }

  updateSelectedValue(value: any) {
    this.selectedDropdownValue = value;
  }
  NavigateToTab(index: any) {
    this.activeIndexTab = index;
    console.log(this.activeIndexTab);
    
    if (this.activeIndexTab == 0) {
      this.isOpenPerformance = true;
      this.isOpenEngagement = false;
    } else if (this.activeIndexTab == 1) {
      this.isOpenPerformance = false;
      this.isOpenEngagement = true;
    }
  }
  NavigateToSubTab(index: any) {
    this.activeSubIndexTab = index;
    console.log(this.activeSubIndexTab);
    if(this.selectedValue=='All Organisation Hierarchywise Report'){
      // this.getUserReportByOrgHierarchy();
    }
    else if(this.selectedValue=='All Batchwise Report'){
      if (this.tableTitleValue==='User') {
        this.getUserReportBy_Users(this.userData?.userIDgroup[1])   
      } else {
        this.getUserReportBy_Batches();
      }
     
    }
    else if(this.selectedValue=='All Userwise Report'){
      this.getUserReportBy_Users( this.apiData?.user?.idCmsUser);
        }
   
        this.batchAverages=[]
  }
  logout() {
    this.authService.logout();
    this._router.navigateByUrl('');
  }

  openInfoFormTable(index: any) {

    // ---------------user data old--------------
    // console.log(index,this.tableTitleValue);
    // this.userData=this.userReportDataByOrgHierarchy[index];
    // this.selectedFromTable=this.userData?.batchName;
    // if(this.userData?.user_Id){
    //  this.tableTitleValue='User';
    //  this.getUserReportBy_Users(this.userData?.user_Id)
    // }
  
// --------------------------------------------
console.log(index,this.tableTitleValue);
this.userData=this.batchAverages[index];
this.selectedFromTable=this.userData?.batchName;
console.log(this.userData);

if(this.userData?.userIDgroup){
 this.tableTitleValue='User';
 console.log(this.userData?.userIDgroup);
 console.log(this.userData?.userIDgroup[1]);
 
 this.getUserReportBy_Users(this.userData?.userIDgroup[1])
}


    // let newIndex = index + 1;
    // this.selectedFromTable = this.tableTitleValue + newIndex;

    // Make sure this.tableContent is not null and index is valid

    // if (this.tableContent && index >= 0 && index < this.tableContent.length) {
    //   const selectedData = this.tableContent[index];
    //   if (selectedData && selectedData.process) {
    //     console.log(selectedData && selectedData.process);
    //     console.log(selectedData);
    //     console.log( selectedData.process);

    //     if (this.level == '1') {
    //       this.tableTitleValue = 'Process';
    //       this.process = selectedData.process;
    //       this.currentLevel = this.process;
    //       this.level++;
    //     } else if (this.level == '2') {
    //       this.subprocess = this.process[index]?.subprocess;
    //       this.tableTitleValue = 'sub-Process';
    //       this.currentLevel = this.subprocess;
    //       console.log(this.currentLevel);
    //       this.level++;
    //       console.log(this.level);
    //     } else if (this.level == '3') {
    //       this.stagewise = this.subprocess[index]?.stagewise;
    //       this.tableTitleValue = 'Stagewise';
    //       this.currentLevel = this.stagewise;

    //       this.level++;
    //       console.log(this.level);
    //     } else 
    //     if (this.level == '4') {
    //       this.Batchwise = this.stagewise[index]?.Batchwise;
    //       this.tableTitleValue = 'Batchwise';
    //       this.currentLevel = this.Batchwise;

    //       this.level++;
    //     } else  if (this.level == '5') {
    //       console.log(1112);
          
    //       this.userwise = this.Batchwise[index]?.Userwise;
    //       this.tableTitleValue = 'Userwise';
    //       this.currentLevel = this.userwise;
    //     } else {
    //       this.level = 0;
    //     }

    //     // console.log(this.process[0]?.find('subprocess'))
    //   }
    // }
  }
 


  getUserReportByOrgHierarchy(){
    console.log(this.orgHierarchyId);
    
    this.http.getAllGetUserReportBy_OrgHierarchy(this.orgHierarchyId,this.activeSubIndexTab).subscribe(res=>{
      this.userReportDataByOrgHierarchy=res;
      console.log(this.userReportDataByOrgHierarchy);
      
    })
  }
  getUserReportBy_Batches(){
    this.batchId=0;
    this.http.getAllGetUserReportBy_Batches(this.apiData?.user.idCmsUser,this.activeSubIndexTab,this.batchId).subscribe(res=>{
      this.userReportDataByOrgHierarchy=res;
      this.userReportDataByOrgHierarchy = this.userReportDataByOrgHierarchy.map((x: any, index: any) => {
        const averagePercentage = (x.fcr + x.quality + x.serviceLevel) / 3;
        let percentageCategory;
        switch (true) {
          case averagePercentage > 90:
            percentageCategory = 'High';
            break;
          case averagePercentage < 40:
            percentageCategory = 'Low';
            break;
          default:
            percentageCategory = 'Moderate';
        }
      
        return { ...x, percentage: percentageCategory };
      });
     
    this.groupedData = this.groupDataByBatchName( this.userReportDataByOrgHierarchy,'batch');

    // Calculate the average AHT for each group
    this.calculateAverages(this.groupedData,'batch');
    })


  }

  groupDataByBatchName(data: any[],user:any) {
    if (user=='user') {
      return data.reduce((groups, item) => {
        const key = item.firstName;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(item);
        return groups;
      }, {});
    } 
    else {
      return data.reduce((groups, item) => {
        const key = item.batchName;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(item);
        return groups;
      }, {});
    }
 
  }

  calculateAverages(groupedData:any,data:any) {
    if (data=='user') {
      console.log('user----------------------');
      
      console.log(groupedData);
    for (const firstName in groupedData) {
      if (groupedData.hasOwnProperty(firstName)) {
        const group = groupedData[firstName];
        console.log(group,'-----');
        
        const ahtSum = group.reduce((sum:any, item:any) => sum + Number(item.aht), 0);
        console.log(ahtSum,'ahtSum');
        
        const aht = ahtSum / group.length;
        const fcrSum = group.reduce((sum:any, item:any) => sum + item.fcrPercentage, 0);
        console.log(fcrSum);
        
        const fcr = fcrSum / group.length;
        const qualitySum = group.reduce((sum:any, item:any) => sum + item.quality, 0);
        const quality = qualitySum / group.length;
        const servicelevelSum = group.reduce((sum:any, item:any) => sum + item.serviceLevel, 0);
        const serviceLevel = servicelevelSum / group.length;
     
        this.batchAverages.push({ firstName,aht,fcr,quality,serviceLevel});
      } 
    }
    this.batchAverages = this.batchAverages.map((x: any, index: any) => {
      const averagePercentage = (x.fcr + x.quality + x.serviceLevel) / 3;
      let percentageCategory;
      switch (true) {
        case averagePercentage > 90:
          percentageCategory = 'High';
          break;
        case averagePercentage < 40:
          percentageCategory = 'Low';
          break;
        default:
          percentageCategory = 'Moderate';
      }
    
      return { ...x, percentage: percentageCategory };
    });
    console.log('bache avrage',this.batchAverages);
    
    }
     else {
      console.log(groupedData);
    for (const batchName in groupedData) {
      if (groupedData.hasOwnProperty(batchName)) {
        const group = groupedData[batchName];
        const ahtSum = group.reduce((sum:any, item:any) => sum + item.aht, 0);
        const aht = ahtSum / group.length;
        const fcrSum = group.reduce((sum:any, item:any) => sum + item.fcr, 0);
        const fcr = fcrSum / group.length;
        const qualitySum = group.reduce((sum:any, item:any) => sum + item.quality, 0);
        const quality = qualitySum / group.length;
        const servicelevelSum = group.reduce((sum:any, item:any) => sum + item.serviceLevel, 0);
        const serviceLevel = servicelevelSum / group.length;
        const userIDgroup=group.map((item:any)=>item.user_Id);
        console.log(this.userIDgroup);
        
        this.batchAverages.push({ batchName,aht,fcr,quality,serviceLevel,userIDgroup});
      } 
    }
    this.batchAverages = this.batchAverages.map((x: any, index: any) => {
      const averagePercentage = (x.fcr + x.quality + x.serviceLevel) / 3;
      let percentageCategory;
      switch (true) {
        case averagePercentage > 90:
          percentageCategory = 'High';
          break;
        case averagePercentage < 40:
          percentageCategory = 'Low';
          break;
        default:
          percentageCategory = 'Moderate';
      }
    
      return { ...x, percentage: percentageCategory };
    });
    console.log('bache avrage',this.batchAverages);
    
    }
    
  }
  getUserReportBy_Users(userid:any){
    this.batchAverages=[];
    console.log(this.activeIndexTab);
    this.http.getAllGetUserReportBy_Users(userid).subscribe(res=>{
      this.userReportDataByOrgHierarchy=res;
      console.log(this.userReportDataByOrgHierarchy);
      this.userReportDataByOrgHierarchy = this.userReportDataByOrgHierarchy.map((x: any, index: any) => {
        const averagePercentage = (x.fcrPercentage + x.quality + x.serviceLevel) / 3;
        let percentageCategory;
        switch (true) {
          case averagePercentage > 90:
            percentageCategory = 'High';
            break;
          case averagePercentage < 40:
            percentageCategory = 'Low';
            break;
          default:
            percentageCategory = 'Moderate';
        }
        return { ...x, percentage: percentageCategory };
      });
      this.groupedData = this.groupDataByBatchName( this.userReportDataByOrgHierarchy,'user');

      // Calculate the average AHT for each group
      this.calculateAverages(this.groupedData,'user');      
    
      console.log(this.activeIndexTab);
      if (this.activeSubIndexTab==1) {
           this.batchAverages=[];
            this.userReportDataByOrgHierarchy=this.userReportDataByOrgHierarchy.filter(
              (org: { cubesFacesGameId: number }) => org.cubesFacesGameId == this.activeSubIndexTab
            );
            this.groupedData = this.groupDataByBatchName( this.userReportDataByOrgHierarchy,'user');
            this.calculateAverages(this.groupedData,'user');      
                
         } else if(this.activeSubIndexTab==2) {
          this.batchAverages=[];
          this.userReportDataByOrgHierarchy=this.userReportDataByOrgHierarchy.filter(
            (org: { cubesFacesGameId: number }) => org.cubesFacesGameId == this.activeSubIndexTab
          );
          console.log(this.userReportDataByOrgHierarchy);
          
          this.groupedData = this.groupDataByBatchName( this.userReportDataByOrgHierarchy,'user');
          this.calculateAverages(this.groupedData,'user');      
           
         } else if(this.activeSubIndexTab==3) {
          this.batchAverages=[];
          this.userReportDataByOrgHierarchy=this.userReportDataByOrgHierarchy.filter(
            (org: { cubesFacesGameId: number }) => org.cubesFacesGameId == this.activeSubIndexTab
          );
          this.groupedData = this.groupDataByBatchName( this.userReportDataByOrgHierarchy,'user');
          this.calculateAverages(this.groupedData,'user');      
           
         } else if(this.activeSubIndexTab==4) {
          this.batchAverages=[];
          this.userReportDataByOrgHierarchy=this.userReportDataByOrgHierarchy.filter(
            (org: { cubesFacesGameId: number }) => org.cubesFacesGameId == this.activeSubIndexTab
          );
          this.groupedData = this.groupDataByBatchName( this.userReportDataByOrgHierarchy,'user');
          this.calculateAverages(this.groupedData,'user');      
           
         } else if(this.activeSubIndexTab==5) {
          this.batchAverages=[];
          this.userReportDataByOrgHierarchy=this.userReportDataByOrgHierarchy.filter(
            (org: { cubesFacesGameId: number }) => org.cubesFacesGameId == this.activeSubIndexTab
          );
          this.groupedData = this.groupDataByBatchName( this.userReportDataByOrgHierarchy,'user');
          this.calculateAverages(this.groupedData,'user');      
           
         } else if(this.activeSubIndexTab==6) {
          this.batchAverages=[];
          this.userReportDataByOrgHierarchy=this.userReportDataByOrgHierarchy.filter(
            (org: { cubesFacesGameId: number }) => org.cubesFacesGameId == this.activeSubIndexTab
          );
          this.groupedData = this.groupDataByBatchName( this.userReportDataByOrgHierarchy,'user');
          this.calculateAverages(this.groupedData,'user');      
           
         } 
    })
  }


  

  public exportAsExcelFile(): void {
    console.log(this.userReportDataByOrgHierarchy);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.userReportDataByOrgHierarchy);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });

     this.saveAsExcelFile(excelBuffer,this.tableTitleValue=='User'?'User':'Batch' );
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: this.excelType
    });
    saveAs(data, fileName + '_Report_' + new Date().getTime() + '.xlsx');
  }
  
  }


