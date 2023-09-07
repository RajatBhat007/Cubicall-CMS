import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  private apiResponseSubject = new BehaviorSubject<any>({});
  apiResponse$ = this.apiResponseSubject.asObservable();

  URLstring = environment.apiURL;
  open: any;
  Path = 'CubiCallGameNewAPi/api';
  mayurPath='CubicallApi-Mayur/api'
  private getisAuthenticated = false;
  activeSubTabindex: any = 0;
  constructor(public Http: HttpClient) {
    this.getisAuthenticated =
      localStorage.getItem('isAuthenticated') === 'true';
  }

  getQuestionList(param1: number, param2: number): Observable<any> {
    const params = {
      OrgId: param1,
      CubesFacesGameId: param2,
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/GetAllQuestionList`;
    return this.Http.get(tempurl, { params: params });
  }

  login(data: any) {
    this.getisAuthenticated = true;
    localStorage.setItem('isAuthenticated', 'true');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/CMSLogin`;
    console.log(tempurl);

    return this.Http.post(tempurl, data, httpOptions);
  }

  importQutionFile(file: File, idOrgHierarchy: any) {
    const formData = new FormData();
    formData.append('postedFile', file);
    formData.append('IdOrgHierarchy', idOrgHierarchy.toString());

    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/ImportQuestionFromExcel
      `;
    console.log(tempurl);
    return this.Http.post(tempurl, formData);
  }
  importAnswerFile(file: File, idOrgHierarchy: any) {
    const formData = new FormData();
    formData.append('postedFile', file);
    formData.append('IdOrgHierarchy', idOrgHierarchy.toString());

    var tempurl = `${this.URLstring}` + `${this.Path}/ImportAnswerFromExcel`;
    console.log(tempurl);
    return this.Http.post(tempurl, formData);
  }

  logout(): void {
    this.getisAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }

  isAuthenticated(): boolean {
    return this.getisAuthenticated;
  }
  getIndustryType(): Observable<any> {
    var tempurl = `${this.URLstring}` + `${this.Path}/GetIndustryList`;
    return this.Http.get(tempurl);
  }

  getBusinessType(): Observable<any> {
    var tempurl = `${this.URLstring}` + `${this.Path}/GetBusinessTypeList`;
    return this.Http.get(tempurl);
  }

  getOrganisation(): Observable<any> {
    var tempurl = `${this.URLstring}` + `${this.Path}/GetOrganization`;
    return this.Http.get(tempurl);
  }
  createOrganisation(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/CreateOrganization`;
    console.log(tempurl);

    return this.Http.post(tempurl, data, httpOptions);
  }

  createCmsRole(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/CreateCMSRole`;
    console.log(tempurl);

    return this.Http.post(tempurl, data, httpOptions);
  }

  setApiResponse(response: any) {
    this.apiResponseSubject.next(response);
  }

  GetCmsRoleFunctionList(data: any): Observable<any> {
    var tempurl =
      `${this.URLstring}` + `${this.Path}/GetCMSRoleFunctionList?OrgId=${data}`;
    return this.Http.get(tempurl);
  }

  getRolesList(data: any): Observable<any> {
    var tempurl = `${this.URLstring}` + `${this.Path}/GetRoles?OrgId=${data}`;
    return this.Http.get(tempurl);
  }

  getCMSUserDetails(data: any){
    var tempurl = `${this.URLstring}` + `${this.mayurPath}/GetCMSUserDetails?CMSUID=${data}`;
    return this.Http.get(tempurl);
  }

}
