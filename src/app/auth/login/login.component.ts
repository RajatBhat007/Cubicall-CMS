import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  password: string = ''; 
  showPassword: boolean = false; 
  uname: string = ''; 
  isAuthenticated: boolean = false;
  username:any
  password_:any
  lowercaseUsername:any

  constructor(private _router: Router,private _route: ActivatedRoute,private authService:AuthService,private http:ApiServiceService) { }
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

 
  login(): void {
  
    const payload = {
      Data: {
        UserName: this.uname,
        Password: this.password
      }
    };
    
    const escapedUserName = JSON.stringify(payload.Data.UserName);
    const escapedPassword = JSON.stringify(payload.Data.Password);

 
    const escapedJsonString = `{\"UserName\":${escapedUserName},\"Password\":${escapedPassword}`;
    const jsonString = JSON.stringify(escapedJsonString);
    const jsonStringremovelast=jsonString.slice(0,-1)
    const body = '{"Data":'+jsonStringremovelast +'}"}';
    
   

    this.http.login(body).subscribe((res) => {
      console.log(res);
        
        this._router.navigateByUrl('home')

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

    if (this.authService.login(this.uname, this.password)) {
       this.lowercaseUsername = this.uname.toLowerCase(); // Convert to lowercase

    
    } 
  }
}
