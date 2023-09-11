import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent {
  constructor(private route: ActivatedRoute, public _router: Router) {}
  value: any;
  selectedDropdownValue: string = 'Organization';
  activeIndexTab: any;

  answerOption = [
    {
      option: 'Option 1',
    },

    {
      option: 'Option 2',
    },
    {
      option: 'Option 3',
    },
    {
      option: 'Option 4',
    },
  ];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.value = params;
      console.log(this.value.value);
    });
    console.log('hello');
  }

  updateSelectedValue(value: any) {
    this.selectedDropdownValue = value;
  }

  selectOption(index: any) {
    this.activeIndexTab = index;
  }

  close() {
    // if (this.value.value === 'rtuEdit') {
    //   this._router.navigateByUrl('/home/rtu');
    // } else if (this.value.value === 'rtuView') {
    //   this._router.navigateByUrl('/home/rtu');
    // }
    this._router.navigate(['/home/game-theme']); 

  }
}