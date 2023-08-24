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
  activeSubTabindex:any=0
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
 
  importQutionFile(file: File, idOrgHierarchy:any){
    const formData = new FormData();
    formData.append('postedFile', file);
    formData.append('IdOrgHierarchy', idOrgHierarchy.toString());

  
    
      var tempurl = `${this.URLstring}`+`${this.Path}/ImportQuestionFromExcel
      `
    console.log(tempurl);
    return this.Http.post(tempurl,formData)

  }
  importAnswerFile(file: File, idOrgHierarchy:any){
    const formData = new FormData();
    formData.append('postedFile', file);
    formData.append('IdOrgHierarchy', idOrgHierarchy.toString());

    var tempurl = `${this.URLstring}`+`${this.Path}/ImportAnswerFromExcel`
    console.log(tempurl);
    return this.Http.post(tempurl,formData)

  }
  

  logout(): void {
    this.getisAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }

  isAuthenticated(): boolean {
    return this.getisAuthenticated;
  }
  activeSubTabvalue(data:any): void{
    this.activeSubTabindex=data
   console.log(this.activeSubTabindex);
   
  }
}
