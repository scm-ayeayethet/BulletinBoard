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

  public getUsers(pageSize: number, pageIndex: number): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const data = localStorage.getItem('userLoginData') || "";
    const userData = JSON.parse(data);
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('Authorization', `Bearer ${token}`)
      .set('userType', userData.type)
      .set('userId', userData._id);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.get(`${environment.apiUrl}/users?page=${pageIndex}&upp=${pageSize}`, options));
  }

  public getUserDetail(userId: any): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const data = localStorage.getItem('userLoginData') || "";
    const userData = JSON.parse(data);
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Authorization', `Bearer ${token}`)
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.get(`${environment.apiUrl}/users/userId`));
  }
}
