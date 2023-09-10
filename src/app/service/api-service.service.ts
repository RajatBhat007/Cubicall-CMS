import { Injectable } from '@angular/core';
import { environment } from 'src/assets/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  activeSubTabvalue(activeIndexSubTab: any) {
    throw new Error('Method not implemented.');
  }
  private apiResponseSubject = new BehaviorSubject<any>({});
  apiResponse$ = this.apiResponseSubject.asObservable();
  private apiDataSubject = new BehaviorSubject<any>(null);

  URLstring = environment.apiURL;
  open: any;
  Path = 'CubicallGameNewApi_test/api';

  private getisAuthenticated = false;
  isAttempted=false;
  isopenGameTime= false;
  isopenStreakTime=false;
  activeSubTabindex: any = 0;
  isGameTile=false;
  private responseData: any;
  constructor(public Http: HttpClient) {
    this.getisAuthenticated =
      localStorage.getItem('isAuthenticated') === 'true';
    const storedData = localStorage.getItem('apiData');
    if (storedData) {
      this.apiDataSubject.next(JSON.parse(storedData));
    }
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

    return this.Http.post(tempurl, data, httpOptions).pipe(
      // Store the response data and set isAuthenticated to true upon success
      tap((response) => {
        this.responseData = response;
        localStorage.setItem('apiData', JSON.stringify(this.responseData));
        this.apiDataSubject.next(this.responseData);
      })
    );
  }

  getResponseData(): any {
    // Get the stored response data

    return this.responseData;
  }

  importQutionFile(file: File, idOrgHierarchy: any) {
    const formData = new FormData();
    formData.append('postedFile', file);
    formData.append('IdOrgHierarchy', idOrgHierarchy.toString());

    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/ImportQuestionFromExcel
      `;

    return this.Http.post(tempurl, formData);
  }
  importAnswerFile(file: File, idOrgHierarchy: any) {
    const formData = new FormData();
    formData.append('postedFile', file);
    formData.append('IdOrgHierarchy', idOrgHierarchy.toString());

    var tempurl = `${this.URLstring}` + `${this.Path}/ImportAnswerFromExcel`;

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

    return this.Http.post(tempurl, data, httpOptions);
  }

  createCmsRole(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/CreateCMSRole`;

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

  createOrganisationHierarchy(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl =
      `${this.URLstring}` + `${this.Path}/CreateOrganizationHierarchy`;

    return this.Http.post(tempurl, data, httpOptions);
  }
  getCMSUserDetails(data: any) {
    var tempurl =
      `${this.URLstring}` + `${this.Path}/GetCMSUserDetails?CMSUID=${data}`;
    return this.Http.get(tempurl);
  }

  getApiData(): Observable<any> {
    return this.apiDataSubject.asObservable();
  }

  createAdminUser(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl =`${this.URLstring}` + `${this.Path}/CreateAdminUser`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  getBatch(data:any){
    var tempurl = `${this.URLstring}` + `${this.Path}/Batch/Get?OrgId=${data}&BatchId=-1`;
    return this.Http.get(tempurl);

  }
  createBatch(data:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl =`${this.URLstring}` + `${this.Path}/Batch/Create`;
    return this.Http.post(tempurl, data, httpOptions);
  }
}
