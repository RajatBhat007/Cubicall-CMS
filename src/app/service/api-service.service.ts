import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  URLstring = environment.apiURL
  open: any;
  Path='CubiCallGameNewAPi/api' 

  constructor(public Http:HttpClient) { }

  getQuestionList(param1: number, param2: number): Observable<any>{
    const params = {
      OrgId: param1,
      CubesFacesGameId: param2
     
    };
    var tempurl = `${this.URLstring}`+`${this.Path}/GetAllQuestionList`
    return this.Http.get(tempurl,{ params: params })

  }

  login(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
      var tempurl = `${this.URLstring}`+`${this.Path}/CMSLogin`
      return this.Http.post(tempurl,data,httpOptions)

  }
 
}
