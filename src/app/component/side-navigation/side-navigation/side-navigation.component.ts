import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiServiceService } from 'src/app/service/api-service.service';

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
  apiData: any = [];
  activeTab: Boolean = false;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private location: Location,
    public http: ApiServiceService
  ) {}

  ngOnInit(): void {
    this.getApiData();

    if (this.activeIndex == 0) {
      this._router.navigateByUrl('/home/setup');
    } else {
      this._router.navigateByUrl('home/game-theme');
    }
  }

  getApiData() {
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      if (this.apiData?.role?.idRoleType > 3) {
        this.activeIndex = 1;
      }
      console.log(this.apiData);
    });
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
