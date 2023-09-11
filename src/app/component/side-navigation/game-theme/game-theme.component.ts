import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
@Component({
selector: 'app-game-theme',
templateUrl: './game-theme.component.html',
styleUrls: ['./game-theme.component.scss']
})
export class GameThemeComponent implements OnInit {
activeSubSubTab: any = 0
activeIndexTab:  any = 0
activeAll: string = '1';
activeIndexSubTab: any = 0
activeIndexsubSubTab: any = 0
activeIndexDraftSubmit: any = 1
activeIndexRejectedSubmit: any = 1
activeTab: any = 0
activeTabGameThemes: Boolean = false
selectedDropdownIndustryValue:string='Select from the drop-down'
isEditButtonVisible: boolean = false;
selectedDropdownValue: string = 'Organization Name';
circleClassName: string = ''
activeTabIndex: string = '1';
isTab0Active: boolean = false;
isTab1Active: boolean = false;
selectedFileName: string = '';
status: any
selectedFileNameAnswer: string = ''
@ViewChild('fileInput') fileInput: any;
@ViewChild('fileInput') fileInputAnswer: any;
questionFileSelected: boolean = false;
selectedFile: File | null = null;
selectedAnswerFile: File | null = null;
isEditMode: boolean = false;
currentSection: string = '';
isupload = false;
isStatusTab: boolean =false;
isactive = false; 



constructor(public _router: Router, private _route: ActivatedRoute, public authService: AuthService, public http: ApiServiceService, ) { 

}


matTab = [{
"content": 'Defuse the Bomb',
"color": "#7B7FCF",
icon: 'assets/images/defusethebomb.png',
}, {
"content": 'Mystery Term',
"color": "#D43539",
icon: 'assets/images/mystery.png',

}, {
"content": 'Triangularis',
"color": "#FAA54A",
icon: 'assets/images/triangularis.png',
}, {
"content": 'Word Search',
"color": "#55BC87",
icon: 'assets/images/wordsearch.svg',
}
, {
"content": 'Word Wheel',
"color": "#FBA2D4",
icon: 'assets/images/wordwheel.png',
}, {
"content": 'Crossword',
"color": "#903FB1",
icon: 'assets/images/crossword.png',
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
"label": 'Configure Images'

},
{
"label": 'Contant Approval'
}

]
subsubtab = [{
"label": 'Game Time'

},
{
"label": 'Attempt'

},
{
"label": 'Streak'

}]
tableData = [
{
"id": '',
"game": '',
},
{
"id": '',
"game": '',
"tile": '',
},
];

tableData1 = [
{
"id": '',
"streak": '',
"point": '',
},
{
"id": '',
"streak": '',
"point": '',
},
];


// setActiveTabByString(tabIndex: string) {
// }

// setActiveTabByNumber(tabIndex: number) {
// }


// setActiveTab(tabIndex: string) {
//   this.activeTabIndex = tabIndex;
// }

rejectedTableData = [{
"id": '',
"color": ""
}]
ngOnInit(): void {
this.View('1')
// this.status='accepted'
this.status = 'rejected'
this.isupload = false
this.http.getQuestionList(1, 1).subscribe((res) => {
console.log(res);





})


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

uploadQutionfile(){
const idOrgHierarchy=localStorage.getItem('idOrgHierarchy')
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

if (this.selectedFile && idOrgHierarchy !== null) {
this.http.importQutionFile(this.selectedFile,idOrgHierarchy).subscribe((res) => {
console.log(res);
// this._router.navigateByUrl('home')
window.alert('succes')

},
(error: HttpErrorResponse) => {
if (error.status === 404) {
window.alert('404 Not Found Error')
// Handle the 404 error, such as displaying a message to the user
} else {

window.alert(error.error)
// Handle other errors
}
}
);
}
}

onFileChangeAnswer(event: any) {
console.log(event);

const file = event.target.files[0];
this.selectedAnswerFile=event.target.files[0];
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

uploadAnswerfile(){
const idOrgHierarchy=localStorage.getItem('idOrgHierarchy')

if (this.selectedAnswerFile && idOrgHierarchy !== null) {
this.http.importAnswerFile(this.selectedAnswerFile,idOrgHierarchy).subscribe((res) => {
console.log(res);
// this._router.navigateByUrl('home')
window.alert('succes')

},
(error: HttpErrorResponse) => {
if (error.status === 404) {
window.alert('404 Not Found Error')
// Handle the 404 error, such as displaying a message to the user
} else {
window.alert(error.error)
// Handle other errors
}
}
);
}
}

updateSelectedValue(value: any) {
this.selectedDropdownValue = value

}
updateSelectedIndustryValue(value: any) {
this.selectedDropdownIndustryValue = value
}
NavigateToTab(index: any) {
this.activeIndexTab = index
}
NavigateToSubTab(index: any) {
this.activeIndexSubTab = index
if(this.activeIndexSubTab =='0'){
this.isStatusTab == true
}
if(this.activeIndexSubTab =='0'){
this.isactive == true
}
if(this.activeIndexsubSubTab =='0'){
}
}
navigateToEditQuestion() {
this._router.navigateByUrl('home/edit-question')
this.isEditButtonVisible = !this.isEditButtonVisible;
}
toggleEditButtonVisibility() {
this.isEditButtonVisible = !this.isEditButtonVisible;
}
//  navigateToGameEdit() {
//     this._router.navigateByUrl('home/game-edit');
//   }  
navigateToGameEdit() {
this._router.navigateByUrl('home/gameedit') ;
this.http.isAttempted=true;
}
navigateToCreateimg(){
this._router.navigateByUrl('home/createimg') ;

}
View(value: any) {
console.log(value);
this.activeAll =  value;
this.activeIndexDraftSubmit = value;
this.activeIndexRejectedSubmit = value;
if(value == '1'){
this.isupload=false;
}
else{
this.isupload=true;
}
}

logout() {
this.authService.logout()
this._router.navigateByUrl('')
}
changeActiveTab(index: number) {
this.activeIndexDraftSubmit = index;
}
setActiveTab(tabIndex: number) {
this.activeTab = tabIndex;
}
activateSubSubTab(index: number) {
this.activeSubSubTab = index;
}
openAttempted(){
this.http.isAttempted = true;
this.http.isopenGameTime = false;
this.http.isopenStreakTime = false;
this._router.navigateByUrl('home/gameedit') ;
}
openStreakTime(){
this.http.isAttempted = false;
this.http.isopenGameTime = false;
this.http.isopenStreakTime = true;
this._router.navigateByUrl('home/gameedit') ;
}
openGameTime(){
this.http.isAttempted = false;
this.http.isopenGameTime = true;
this.http.isopenStreakTime = false;
this._router.navigateByUrl('home/gameedit') ;
}

toggleEditMode() {
this.isEditMode = !this.isEditMode;
}

approveItem(res: any) {
}

rejectItem(res: any) {
}
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
setActiveAll() {
}

}
