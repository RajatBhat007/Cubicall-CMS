import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-game-theme',
  templateUrl: './game-theme.component.html',
  styleUrls: ['./game-theme.component.scss']
})
export class GameThemeComponent implements OnInit {

  activeIndexTab: any = 0
  activeIndexSubTab: any = 0
  activeIndexDraftSubmit: any = 1

  activeTabGameThemes: Boolean = false

  selectedDropdownValue: string = 'Organization';
  circleClassName: string = ''

  selectedFileName: string = '';
  status: any
  selectedFileNameAnswer: string = ''
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('fileInput') fileInputAnswer: any;
  questionFileSelected: boolean = false;

  constructor(public _router: Router, private _route: ActivatedRoute, public authService: AuthService, public http: ApiServiceService) { }

  matTab = [{
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

  count = [{
    "label": 'Total',
    "value": 80
  },
  {
    "label": 'Active',
    "value": 64
  },
  {
    "label": 'Inactive',
    "value": 16
  },
  {
    "label": 'Rejected',
    "value": 12
  },

  ]

  subtab = [{
    "label": 'Content'

  },
  {
    "label": 'Game Points & Details'

  },
  {
    "label": 'Images'

  },


  ]

  tableData = [{
    "id": ''
  },
  {
    "id": ''
  },
  {
    "id": ''
  },
  {
    "id": ''
  },
  {
    "id": ''
  },





  ]

  rejectedTableData = [{
    "id": '',
    "color": ""
  }]
  ngOnInit(): void {
    this.View('1')
    // this.status='accepted'
    this.status = 'rejected'

    this.http.getQuestionList(1, 1).subscribe((res) => {
      console.log(res);





    })


  }

  onFileChange(event: any) {
    console.log(event);

    const file = event.target.files[0];
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

  }

  onFileChangeAnswer(event: any) {
    console.log(event);

    const file = event.target.files[0];
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

  updateSelectedValue(value: any) {
    this.selectedDropdownValue = value

  }
  NavigateToTab(index: any) {
    this.activeIndexTab = index
  }
  NavigateToSubTab(index: any) {
    this.activeIndexSubTab = index
  }
  navigateToEditQuestion() {
    this._router.navigateByUrl('home/edit-question')
  }

  View(value: any) {
    console.log(value);
    this.activeIndexDraftSubmit = value

  }

  logout() {
    this.authService.logout()
    this._router.navigateByUrl('')
  }
}
