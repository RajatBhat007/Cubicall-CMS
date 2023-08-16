import { Component, OnInit,ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-rtu-screen',
  templateUrl: './rtu-screen.component.html',
  styleUrls: ['./rtu-screen.component.scss']
})
export class RtuScreenComponent implements OnInit{
  activeIndexTab:any=0
  activeIndexSubTab:any=0
  activeIndexDraftSubmit:any=1

  activeTabGameThemes:Boolean=false

  selectedDropdownValue: string = 'Organization'; 
  circleClassName: string = ''

  selectedFileName: string = '';
  status:any

  @ViewChild('fileInput') fileInput: any;
  constructor(public  _router: Router,private _route: ActivatedRoute) { }

  matTab=[{
    "content":'Defuse the Bomb',
    "color":"#7B7FCF"
  },{
    "content":'Mystery Term',
    "color":"#D43539"
  },{
    "content":'Triangularis',
    "color":"#FAA54A"
  },{
    "content":'Word Search',
    "color":"#55BC87"
  }
  ,{
    "content":'Word Wheel',
    "color":"#FBA2D4"
  }  ,{
    "content":'Crossword',
    "color":"#903FB1"
  } 
]

count=[{
  "label":'Total',
  "value": 80
},
{
  "label":'Active',
  "value": 64
},
{
  "label":'Inactive',
  "value": 16
},
{
  "label":'Rejected',
  "value": 12
},

]

subtab=[{
  "label":'Content'
  
}

]

tableData=[{
  "id":''
},
{
  "id":''
},
{
  "id":''
},
{
  "id":''
},
{
  "id":''
},





]

rejectedTableData=[{
  "id":'',
  "color":""
}]
ngOnInit(): void {
  this.View('1')
  // this.status='accepted'
  this.status='rejected'
  

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

  updateSelectedValue(value:any){
    this.selectedDropdownValue=value

  }
  NavigateToTab(index:any){
    this.activeIndexTab=index
  }
  NavigateToSubTab(index:any){
   this.activeIndexSubTab=index
  }
  navigateToEditQuestion(){
    this._router.navigateByUrl('home/sidenav/edit-question')
  }

  View(value:any){
    console.log(value);
    this.activeIndexDraftSubmit=value
    
  }
}
