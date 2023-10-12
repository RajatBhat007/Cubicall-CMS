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
    if (this.apiData?.role?.idRoleType == 5) {
      this.sidebar = [
        {
          content: 'Game Themes',
          image: 'assets/images/sidenavigation/Game-themes.png',
        },
      ];
      this._router.navigateByUrl('home/game-theme');
      this.activeIndex = 0;
    } else if(this.apiData?.role?.idRoleType == 4) {
      this.sidebar = [
        {
          content: 'Setup',
          image: 'assets/images/sidenavigation/Setup.png',
        },
        {
          content: 'Game Themes',
          image: 'assets/images/sidenavigation/Game-themes.png',
        },
        {
        content: 'Users',
        image: 'assets/images/sidenavigation/Users.png',
      },
      ];
      if (this.activeIndex == 0) {
        this._router.navigateByUrl('/home/setup');
      } else if(this.activeIndex == 1){
        this._router.navigateByUrl('home/game-theme');
      }
      else{
        this._router.navigateByUrl('home/users');
      }
    }
    else{

      this.sidebar = [
        {
          content: 'Setup',
          image: 'assets/images/sidenavigation/Setup.png',
        },
        {
          content: 'Game Themes',
          image: 'assets/images/sidenavigation/Game-themes.png',
        },
      ];
      if (this.activeIndex == 0) {
        this._router.navigateByUrl('/home/setup');
      } else {
        this._router.navigateByUrl('home/game-theme');
      }

    }
  }

  getApiData() {
    this.http.getApiData().subscribe((data) => {
      this.apiData = data;
      if (this.apiData?.role?.idRoleType > 3) {
        this.activeIndex = 1;
      }
    });
  }

  NavigateTo(index: any) {
    this.activeIndex = index;
    this.activeTab = true;
    if (this.apiData?.role?.idRoleType != 5) {
      if (this.activeIndex == 0) {
        this._router.navigateByUrl('/home/setup');
      } else if (this.activeIndex == 1) {
        this._router.navigateByUrl('/home/game-theme');
      } else if (this.activeIndex == 2) {
         this._router.navigateByUrl('/home/users-report');
      } else if (this.activeIndex == 3) {
        //  this._router.navigateByUrl('/home/rtu');
      }
    }
  }
}
