import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  
})

export class SideNavigationComponent implements OnInit{
  
  sidebar=[{
    "content":'Setup'
  },{
    "content":'Game Themes'
  },{
    "content":'Main-Screen'
  },{
    "content":'Users'
  }
  ,{
    "content":'RTU'
  } 
]
activeIndex:any=1
activeTab:Boolean=false
constructor(private _router: Router,private _route: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activeIndex==1){
      this._router.navigate(['./game-theme'], { relativeTo: this._route });

    }

  }
 
  NavigateTo(index:any){
    console.log(this.activeTab);
    this.activeIndex=index
    this.activeTab=true
    

    
    // this._router.navigateByUrl('/game-theme')
   
  }
  
}
