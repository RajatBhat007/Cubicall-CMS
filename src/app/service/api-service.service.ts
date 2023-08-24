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
  private getisAuthenticated = false;

  constructor(public Http:HttpClient) {
    this.getisAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

   }

  getQuestionList(param1: number, param2: number): Observable<any>{
    const params = {
      OrgId: param1,
      CubesFacesGameId: param2
     
    };
    var tempurl = `${this.URLstring}`+`${this.Path}/GetAllQuestionList`
    return this.Http.get(tempurl,{ params: params })

  }


  getIndustryType(): Observable<any>{
    
    var tempurl = `${this.URLstring}`+`${this.Path}/GetIndustryList`
    return this.Http.get(tempurl)

  }

  getBusinessType(): Observable<any>{
    
    var tempurl = `${this.URLstring}`+`${this.Path}/GetBusinessTypeList`
    return this.Http.get(tempurl)

  }

  getOrganisation(): Observable<any>{
   
    var tempurl = `${this.URLstring}`+`${this.Path}/GetOrganization`
    return this.Http.get(tempurl)

  }

  

  login(data:any){
    this.getisAuthenticated = true;
    localStorage.setItem('isAuthenticated', 'true');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
      var tempurl = `${this.URLstring}`+`${this.Path}/CMSLogin`
    console.log(tempurl);
    
    return this.Http.post(tempurl,data,httpOptions)

  }

  createOrganisation(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
      var tempurl = `${this.URLstring}`+`${this.Path}/CreateOrganization`
    console.log(tempurl);
    
    return this.Http.post(tempurl,data,httpOptions)
  }

  
  logout(): void {
    this.getisAuthenticated = false;
    localStorage.removeItem('isAuthenticated');

  }

  isAuthenticated(): boolean {
    return this.getisAuthenticated;
  }
}
