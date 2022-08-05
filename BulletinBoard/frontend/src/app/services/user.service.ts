import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public dataSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  public getUsers():Promise<any>{
    const token = localStorage.getItem('token') || null;
    const data = localStorage.getItem('userLoginData') || "";
    const userData = JSON.parse(data);
    const headerOptions = new HttpHeaders()
    .set('Content-Type' , "application/json;charset=utf-8;")
    .set('Authorization',`Bearer ${token}`)
    .set('userType',userData.type)
    .set('userId',userData._id);
    const options = { headers : headerOptions };
    return lastValueFrom(this.http.get(`${environment.apiUrl}/users`,options));
  }

  public findByName(payload: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const data = localStorage.getItem('userLoginData') || "";
    const userData = JSON.parse(data);
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('userType', userData.type)
      .set('userId', userData._id);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users/search`, payload, options));
  }

  public deleteUser(userId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.delete(`${environment.apiUrl}/users/` + userId, options));
  }

  public createUser(payload:any):Promise<any>{
    const token = localStorage.getItem('token') || null;
    const headerOptions = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);
    const options = { headers: headerOptions}
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users`,payload,options));
  }

  public findUser(payload:any,userId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${environment.apiUrl}/users/` + userId,payload, options));
  }
}
