import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../user.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private readonly http: HttpClient) {}

  getProfile(currentUsername: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.profileUrl(currentUsername));
  }

  putProfile(data: Partial<UserInfo>, username: string): Observable<UserInfo> {
    return this.http.put<UserInfo>(this.profileUrl(username), data);
  }

  patchProfile(data: Partial<UserInfo>, username: string): Observable<UserInfo> {
    return this.http.patch<UserInfo>(this.profileUrl(username), data);
  }

  private profileUrl(username: string): string {
    return `${environment.SERVER_URL}api/profile/${encodeURIComponent(username)}/`;
  }
}
