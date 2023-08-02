import { Component } from '@angular/core';

@Component({
  selector: 'app-game-theme',
  templateUrl: './game-theme.component.html',
  styleUrls: ['./game-theme.component.scss']
})
export class GameThemeComponent {
  activeIndexTab:any=0
  activeIndexSubTab:any=0
  activeTabGameThemes:Boolean=false

  selectedDropdownValue: string = 'Organization'; 
  circleClassName: string = ''
  matTab=[{
    "content":'Defuse the Bomb'
  },{
    "content":'Mystery Term'
  },{
    "content":'Triangularis'
  },{
    "content":'Word Search'
  }
  ,{
    "content":'Word Wheel'
  }  ,{
    "content":'Crossword'
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
  
},
{
  "label":'Game Points & Details'
 
},
{
  "label":'Images'
  
},
{
  "label":'Pop-up'
 
},

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
  updateSelectedValue(value:any){
    this.selectedDropdownValue=value

  }
  NavigateToTab(index:any){
    this.activeIndexTab=index
  }
  NavigateToSubTab(index:any){
   this.activeIndexSubTab=index
  }
}
