import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public dataSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient) { }

  public getPosts(): Promise<any> {
    const token = localStorage.getItem('token') || '';
    const data = localStorage.getItem('userLoginData') || "";
    const userData = JSON.parse(data);
    const headerOptions = new HttpHeaders()
      .set('Content-Type', 'application/json;charset=utf-8;')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache')
      .set('userType', userData.type)
      .set('userId', userData._id)
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.get(`${environment.apiUrl}/posts`, options));
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
    return lastValueFrom(this.http.post(`${environment.apiUrl}/posts/search`, payload, options));
  }

  public deletePost(postId: any): Promise<any> {
    const token = localStorage.getItem('token') || null;
    const headerOptions = new HttpHeaders()
      .set('Content-Type', "application/json:charset=utf-8;")
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions }
    return lastValueFrom(this.http.delete(`${environment.apiUrl}/posts/` + postId, options));
  }

  public findPost(postId: any): Promise<any> {
    const token = localStorage.getItem('token') || null;
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions }
    return lastValueFrom(this.http.get(`${environment.apiUrl}/posts/` + postId, options));
  }

  public createPost(payload: any): Promise<any> {
    const token = localStorage.getItem('token') || null;
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.post(`${environment.apiUrl}/posts`, payload, options));
  }

  public updatePost(payload: any, postId: any): Promise<any> {
    const token = localStorage.getItem('token') || null;
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return lastValueFrom(this.http.put(`${environment.apiUrl}/posts/` + postId, payload, options));
  }
}
