import { Component } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss'],
})
export class GameEditComponent {
  selectedDropdownValue: string = 'Organization';
  activeIndexTab: any;
  currentValue: number = 1;
  currentValue1: number = 2;
  changeTimeText: any;
  changePointText: any;
  changeTitle1: any;
  isChangeTitle2: any;
  value: any;
  GameTile = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: ApiServiceService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.value = params;
    });

    if (this.http.isopenGameTime == true) {
      this.changeTimeText = 'Min';
      this.changePointText = 'Min';
      this.changeTitle1 = 'Game Time';
      this.isChangeTitle2 = 'Tile Time';
      this.GameTile = false;
    } else if (this.http.isAttempted == true) {
      this.changeTimeText = 'No';
      this.changePointText = 'Points';
      this.changeTitle1 = 'Attempt No';
      this.isChangeTitle2 = 'Points';
      this.GameTile = true;
    } else if (this.http.isopenStreakTime == true) {
      this.changeTimeText = 'No';
      this.changePointText = 'Points';
      this.changeTitle1 = 'Streak';
      this.isChangeTitle2 = 'Points';
      this.GameTile = true;
    }
  }
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

  updateSelectedValue(value: any) {
    this.selectedDropdownValue = value;
  }

  selectOption(index: any) {
    this.activeIndexTab = index;
  }

  logout() {
    // this.authService.logout()
    // this._router.navigateByUrl('')
  }

  increaseValue() {
    this.currentValue += 1;
  }

  decreaseValue() {
    if (this.currentValue > 1) {
      this.currentValue -= 1;
    }
  }
  increaseValue1() {
    this.currentValue1 += 1;
  }

  decreaseValue1() {
    if (this.currentValue1 > 2) {
      this.currentValue1 -= 1;
    }
  }
  data1 = [{ label: 'Attempt 2: +5 points' }];
  data2 = [{ label: 'Attempt 3: -2 points' }];
  data3 = [{ label: 'Attempt 4: -5 points' }];
  // increaseValueBox1() {
  //   this.currentValueBox1 += 10; // Increase the value for box1 by 10
  // }

  // decreaseValueBox1() {
  //   if (this.currentValueBox1 > 10) {
  //     this.currentValueBox1 -= 10; // Decrease the value for box1 by 10, but not below 10
  //   }
  // }

  // increaseValueBox2() {
  //   this.currentValueBox2 += 10; // Increase the value for box2 by 10
  // }

  // decreaseValueBox2() {
  //   if (this.currentValueBox2 > 10) {
  //     this.currentValueBox2 -= 10; // Decrease the value for box2 by 10, but not below 10
  //   }
  // }
  close() {
    this.router.navigate(['/home/game-theme']);
  }
}
