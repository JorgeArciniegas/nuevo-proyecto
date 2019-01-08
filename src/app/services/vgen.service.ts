import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import {
  AccountDetails,
  CountDown,
  EventResults,
  Login,
  TreeSports
} from './vgen.model';

interface HttpOptions {
  headers: HttpHeaders;
}

@Injectable({
  providedIn: 'root'
})
export class VgenService {
  private baseApiUrl: string;

  constructor(private appSettings: AppSettings, private http: HttpClient) {
    this.baseApiUrl = this.appSettings.baseApiUrl;
  }

  /**
   * Make login and store auth token
   *
   * @param username username
   * @param password password
   */
  async login(username: string, password: string): Promise<string> {
    const httpOptions: HttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    let result: string;
    const url: string = this.baseApiUrl + '/token';
    await this.http
      .post<Login>(
        url,
        'username=' +
          encodeURIComponent(username) +
          '&password=' +
          encodeURIComponent(password) +
          '&grant_type=password',
        httpOptions
      )
      .toPromise()
      .then(
        (response: Login): void => {
          localStorage.setItem('tokenData', response.access_token);
          result = 'Login success';
        }
      )
      .catch(e => {
        result = e.error.error_description;
      });

    return result;
  }

  me(): Promise<AccountDetails> {
    const url: string = this.baseApiUrl + '/api/account/me';
    return this.http.get<AccountDetails>(url).toPromise();
  }

  programmetree(sportId: number, categoryType: string): Promise<TreeSports> {
    const url: string = this.baseApiUrl + '/api/virtual/tree';
    const params: HttpParams = new HttpParams()
      .set('SportIds', sportId.toString())
      .set('CategoryTypes', categoryType);

    return this.http.get<TreeSports>(url, { params: params }).toPromise();
  }

  latesResult(sportId: number, categoryType: string): Promise<EventResults> {
    const url: string =
      this.baseApiUrl +
      'api/virtual/lastresults/' +
      encodeURIComponent(sportId.toString()) +
      '/' +
      encodeURIComponent(categoryType);

    return this.http.get<EventResults>(url).toPromise();
  }

  raceDetails(sportId: number, matchId: number): Promise<EventResults> {
    const url: string =
      this.baseApiUrl +
      'api/virtual/detail/' +
      encodeURIComponent(sportId.toString()) +
      '/' +
      encodeURIComponent(matchId.toString());

    return this.http.get<EventResults>(url).toPromise();
  }

  countdown(sportId: number, matchId: number): Promise<CountDown> {
    const url: string =
      this.baseApiUrl +
      'api/virtual/countdown/' +
      encodeURIComponent(sportId.toString()) +
      '/' +
      encodeURIComponent(matchId.toString());

    return this.http.get<CountDown>(url).toPromise();
  }
}
