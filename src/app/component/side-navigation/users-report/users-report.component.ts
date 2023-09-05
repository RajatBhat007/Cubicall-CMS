import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users-report',
  templateUrl: './users-report.component.html',
  styleUrls: ['./users-report.component.scss']
})
export class UsersReportComponent {
  activeSubIndexTab: any=0;
  tableTitleValue: string='Vendors';
  selectedFromTable: any;
  constructor(public _router: Router, private _route: ActivatedRoute, public authService: AuthService, public http: ApiServiceService) { }
  activeIndexTab: any = 0;
  selectedDropdownValue:any;
  isOpenPerformance:boolean=true;
  isOpenEngagement:boolean=false;
  showPassword:boolean=true;
  selectedValue:string='All Vendorwise Report'
  matTab = [{
    "content": 'Performance',
   
    "Image":'/assets/images/Performance.svg'
  }, {
    "content": 'Engagement',
    
    "Image":'/assets/images/Engagement.svg'
  }
  ]

  matSubTab = [{
    "content": 'Defuse the Bomb',
    "color": "#7B7FCF"
  }, {
    "content": 'Mystery Term',
    "color": "#D43539"
  }, {
    "content": 'Triangularis',
    "color": "#FAA54A"
  }, {
    "content": 'Word Search',
    "color": "#55BC87"
  }
    , {
    "content": 'Word Wheel',
    "color": "#FBA2D4"
  }, {
    "content": 'Crossword',
    "color": "#903FB1"
  }
  ]

  tableContent=[{
    "UserName":'User1',
    "AHT":'0000000',
    "FCR":'000%',
    "Quality":'000%',
    'Service_level':'000%',
    'Performance':'High'
  },
  {
    "UserName":'User2',
    "AHT":'0000000',
    "FCR":'000%',
    "Quality":'000%',
    'Service_level':'000%',
    'Performance':'High'
  },
  {
    "UserName":'User3',
    "AHT":'0000000',
    "FCR":'000%',
    "Quality":'000%',
    'Service_level':'000%',
    'Performance':'Moderate'
  },
  {
    "UserName":'User4',
    "AHT":'0000000',
    "FCR":'000%',
    "Quality":'000%',
    'Service_level':'000%',
    'Performance':'Moderate'
  },
  {
    "UserName":'User5',
    "AHT":'0000000',
    "FCR":'000%',
    "Quality":'000%',
    'Service_level':'000%',
    'Performance':'Low'
  },
  {
    "UserName":'User6',
    "AHT":'0000000',
    "FCR":'000%',
    "Quality":'000%',
    'Service_level':'000%',
    'Performance':'Low'
  }
]


tableContentForEngagement=[{
  "ScreenTime":'740',
  "Total_Attempts":'20',
  "Engagement":'High'
},
{
  "ScreenTime":'740',
  "Total_Attempts":'20',
  "Engagement":'High',
},
{
  "ScreenTime":'740',
  "Total_Attempts":'20',
  "Engagement":'High',
},
{
  "ScreenTime":'740',
  "Total_Attempts":'20',
  "Engagement":'High',
},
{
  "ScreenTime":'740',
  "Total_Attempts":'20',
  "Engagement":'High',
}
,{
  "ScreenTime":'740',
  "Total_Attempts":'20',
  "Engagement":'High',
}
]



  ngOnInit():void{
    this.selectedValue = 'All Vendorwise Report';
    
    
  }
  selectedTableValue(value: string) {
    this.selectedValue = value; // Set the selected value

    switch (value) {
        case 'All Vendorwise Report':
            this.tableTitleValue = 'Vendors';
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
        case 'All Batchwise Report':
            this.tableTitleValue = 'Batchwise';
            break;
        case 'All Userwise Report':
            this.tableTitleValue = 'User';
            break;
        default:
            this.tableTitleValue = 'Vendors';
            break;
    }

    console.log(this.tableTitleValue);
}

  updateSelectedValue(value: any) {
    this.selectedDropdownValue = value

  }
  NavigateToTab(index: any) {
    this.activeIndexTab = index

    if(this.activeIndexTab==0){
      this.isOpenPerformance=true;
      this.isOpenEngagement=false;

    }
    else if(this.activeIndexTab==1){
      this.isOpenPerformance=false;
      this.isOpenEngagement=true;
      
    }
  }
  NavigateToSubTab(index:any){
    this.activeSubIndexTab = index;

  }
  logout() {
    this.authService.logout()
    this._router.navigateByUrl('')
  }
  openInfoFormTable(index:any){
    let newIndex=index+1;
    this.selectedFromTable=this.tableTitleValue + newIndex;

  }

}
