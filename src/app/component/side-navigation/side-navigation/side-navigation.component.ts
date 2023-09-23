import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit {
  sidebar = [
    {
      content: 'Setup',
      image: 'assets/images/sidenavigation/Setup.png',
    },
    {
      content: 'Game Themes',
      image: 'assets/images/sidenavigation/Game-themes.png',
    },
    // {
    //   content: 'Main-Screen',
    //   image: 'assets/images/sidenavigation/Main-screen.png',
    // },
    // {
    //   content: 'Users',
    //   image: 'assets/images/sidenavigation/Users.png',
    // },
    // {
    //   content: 'RTU',
    //   image: 'assets/images/sidenavigation/RTU.png',
    // },
  ];

  activeIndex: any = 0;
  activeTab: Boolean = false;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    if (this.activeIndex == 0) {
      this._router.navigateByUrl('/home/setup');
    }
  }

  NavigateTo(index: any) {
    console.log(index);

    console.log(this.activeTab);
    this.activeIndex = index;
    this.activeTab = true;

    if (this.activeIndex == 0) {
      this._router.navigateByUrl('/home/setup');
    } else if (this.activeIndex == 1) {
      this._router.navigateByUrl('/home/game-theme');
    } else if (this.activeIndex == 3) {
      //  this._router.navigateByUrl('/home/users-report');
    } else if (this.activeIndex == 4) {
      //  this._router.navigateByUrl('/home/rtu');
    }

    // this._router.navigateByUrl('/game-theme')
  }
}
