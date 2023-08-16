import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
export class EditQuestionComponent {

  selectedDropdownValue: string = 'Organization'; 
  activeIndexTab: any

  answerOption=[{
    "option":'Option 1'
  },
  
  {
    "option":'Option 2'
  },
  {
    "option":'Option 3'
  },
  {
    "option":'Option 4'
  },

  
  ]

  
  updateSelectedValue(value:any){
    this.selectedDropdownValue=value

  }

  selectOption(index:any){
    this.activeIndexTab=index
  }
}
