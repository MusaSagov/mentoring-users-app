import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from '@users/core/http';

import { CLIENT_ID } from '../client-id.token';
import { GithubTokenDTO } from '../models/github-token-DTO.model';
import { GithubUserDTO } from '../models/github-user-DTO.model';

@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  http = inject(HttpClient);
  apiService = inject(ApiService);
  clientId = inject(CLIENT_ID);

  public accessToken = new BehaviorSubject<string | null>(this.getStoredAccessToken());

  public loginWithGithub() {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + this.clientId);
  }

  public getAccessToken(code: string): Observable<GithubTokenDTO> {
    return this.apiService.get<GithubTokenDTO>('/githubAPI/getAccessToken?code=' + code);
  }

  public getGithubUser(token: string): Observable<GithubUserDTO> {
    return this.apiService.post<GithubUserDTO, GithubTokenDTO>('/githubAPI/getUser', { token });
  }

  public getStoredAccessToken() {
    return localStorage.getItem('github');
  }

  public setStoredAccessToken(token: string) {
    return localStorage.setItem('github', token);
  }

  public clearStoredAccessToken() {
    return localStorage.removeItem('github');
  }
}
