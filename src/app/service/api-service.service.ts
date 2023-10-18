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
  Path1 ='CubicallGameNewApi/api';

  private getisAuthenticated = false;
  isAttempted = false;
  isopenGameTime = false;
  isopenStreakTime = false;
  activeSubTabindex: any = 0;
  isGameTile = false;
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

  importQutionFile(
    file: File,
    idOrgHierarchy: any,
    userId: any,
    CubesFacesGameId: any,
    OrgID: any
  ) {
    const formData = new FormData();
    formData.append('postedFile', file);
    formData.append('IdOrgHierarchy', idOrgHierarchy.toString());
    formData.append('userId', userId);
    formData.append('CubesFacesGameId', CubesFacesGameId);
    formData.append('OrgID', OrgID);

    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/ImportQuestionAnsFromExcel
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

  getRolesList(data: any, roleid: any): Observable<any> {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/GetRoles?OrgId=${data}&&RoleId=${roleid}`;
    return this.Http.get(tempurl);
  }
  getCMSUserDetails(data: any, uid: any) {
    var tempurl =
      `${this.URLstring}` + `${this.Path}/GetCMSUsers?oid=${data}&uid=${uid}`;
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

  getApiData(): Observable<any> {
    return this.apiDataSubject.asObservable();
  }

  createAdminUser(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/CreateAdminUser`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  postOrganizationHierarchy(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/CreateOrgHirLevel`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  getAdminUserDetails(data: any) {
    var tempurl =
      `${this.URLstring}` + `${this.Path}/GetCMSAdminUserDetails?oid=${data}`;
    return this.Http.get(tempurl);
  }

  getVendorDetails(data: any, data2: any) {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/GetOrgHierarchy?OrgId=${data}&ParentIdOrgHierarchy=${data2}`;
    return this.Http.get(tempurl);
  }

  getBatch(data: any) {
    var tempurl =
      `${this.URLstring}` + `${this.Path}/Batch/Get?OrgId=${data}&BatchId=-1`;
    return this.Http.get(tempurl);
  }
  createBatch(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/Batch/Create`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  getStages(data: any) {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/GetBottomToTopHeirarchyName?OrgId=${data}`;
    return this.Http.get(tempurl, data);
  }

  getStagesName(data: any) {
    var tempurl = `${this.URLstring}` + `${this.Path}/GetStages?userId=${data}`;
    return this.Http.get(tempurl, data);
  }

  editBatch(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/Batch/Edit`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  CreateFunction(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/CreateFunction`;

    return this.Http.post(tempurl, data, httpOptions);
  }

  CreateUser(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/CreateUser`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  getRoleType(): Observable<any> {
    var tempurl = `${this.URLstring}` + `${this.Path}/GetRoleTypes`;
    return this.Http.get(tempurl);
  }

  GetOrgHierarchyTree(data: any, data2: any) {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/GetOrgHierarchyTree?OrgId=${data}&ParentOrgHierarchyId=${data2}`;
    return this.Http.get(tempurl);
  }

  getCubeFaceGameTime(data: any, id: any): Observable<any> {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/GetCubeFaceGameTimeDetails?OrgId=${data}&CubesFacesGameId=${id}`;
    return this.Http.get(tempurl);
  }
  getCubeFaceGameAttempt(data: any, id: any): Observable<any> {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/GetCubeFaceGameAttemptDetails?OrgId=${data}&AttemptNoId=${id}`;
    return this.Http.get(tempurl);
  }
  getCubeFaceGameStreak(data: any, id: any): Observable<any> {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/GetCubeFaceGameStreakDetails?OrgId=${data}&StreakId=${id}`;
    return this.Http.get(tempurl);
  }

  setCubeFaceGameTime(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/InsUpdCubeFaceGameTime`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  setCubeFaceGameAttempt(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl =
      `${this.URLstring}` + `${this.Path}/InsUpdCubeFaceGameAttempt`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  setCubeFaceGameStreakDetails(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/InsUpdCubeFaceGameStreak`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  postVerificationEmail(data: any, data2: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/PostVerificationEmail?OrgID=${data}&IdCmsUser=${data2}`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  getAllQuestionAnswerList(data: any, id: any,IdCmsUser:any): Observable<any> {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path1}/GetAllQuestionAnswerList?OrgId=${data}&CubesFacesGameId=${id}&IdCmsUser=${IdCmsUser}`;
    return this.Http.get(tempurl);
  }

  editQuestionAns(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    var tempurl = `${this.URLstring}` + `${this.Path}/EditQuestionAns`;
    return this.Http.post(tempurl, data, httpOptions);
  }

  getAllGetUserReportBy_OrgHierarchy(data: any, id: any): Observable<any> {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/GetUserReport_OrgHierarchy?IdOrgHierarchy=${data}&CubesFacesGameId=${id}`;
    return this.Http.get(tempurl);
  }

  getAllGetUserReportBy_Batches(data: any, id: any,batchId:any): Observable<any> {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/GetUserReport_CubesFacesGame?Id_CmsUser=${data}&CubesFacesGameId=${id}&BatchId=${batchId}`;
    return this.Http.get(tempurl);
  }
  getAllGetUserReportBy_Users(data: any): Observable<any> {
    var tempurl =
      `${this.URLstring}` +
      `${this.Path}/GetUserReport_User?UID=${data}`;
    return this.Http.get(tempurl);
  }
}
