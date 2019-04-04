import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { AccountDetails, CountDown, EventResults, Login, SportDetail, TreeSports } from './vgen.model';
import { StorageService } from '../utility/storage/storage.service';

interface HttpOptions {
  headers: HttpHeaders;
}

@Injectable({
  providedIn: 'root'
})
export class VgenService {
  private baseApiUrl: string;
  private token: string;

  constructor(private appSettings: AppSettings, private http: HttpClient, private storageService: StorageService) {
    this.baseApiUrl = this.appSettings.baseApiUrl;
  }

  /**
   * Ritorna l'header HTTP configurato per una chiamata API JSON e autorizzazione
   * @returns HttpHeaders
   */
  public getHttpJsonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + this.getCurrentToken()
    });
  }

  // Set the token.
  public setToken(token: string): void {
    this.token = token;
  }

  // Remove the token.
  public removeToken(): void {
    this.token = undefined;
  }

  // Retrieve the current token.
  public getCurrentToken(): string {
    if (this.token) {
      return this.token;
    } else {
      return this.storageService.getData('tokenData');
    }
  }

  /**
   * Make login and store auth token
   *
   * @param username username
   * @param password password
   */
  login(username: string, password: string): Promise<Login> {
    const httpOptions: HttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };
    const url: string = this.baseApiUrl + '/token';
    return this.http
      .post<Login>(
        url,
        'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password) + '&grant_type=password',
        httpOptions
      )
      .toPromise();
  }

  me(): Promise<AccountDetails> {
    const httpOptions: HttpOptions = {
      headers: this.getHttpJsonHeaders()
    };
    const url: string = this.baseApiUrl + '/api/account/me';
    return this.http.get<AccountDetails>(url, httpOptions).toPromise();
  }

  programmetree(sportId: number, categoryType: string): Promise<TreeSports> {
    const url: string = this.baseApiUrl + '/api/virtual/tree';
    const params: HttpParams = new HttpParams().set('SportIds', sportId.toString()).set('CategoryTypes', categoryType);

    return this.http.get<TreeSports>(url, { params: params }).toPromise();
  }

  latesResult(sportId: number, categoryType: string): Promise<EventResults> {
    const url: string =
      this.baseApiUrl + '/api/virtual/lastresults/' + encodeURIComponent(sportId.toString()) + '/' + encodeURIComponent(categoryType);

    return this.http.get<EventResults>(url).toPromise();
  }

  async raceDetails(sportId: number, matchId: number): Promise<SportDetail> {
    const url: string =
      this.baseApiUrl + '/api/virtual/detail/' + encodeURIComponent(sportId.toString()) + '/' + encodeURIComponent(matchId.toString());

    return this.http.get<SportDetail>(url).toPromise();
  }

  countdown(sportId: number, matchId: number): Promise<CountDown> {
    const url: string =
      this.baseApiUrl + '/api/virtual/countdown/' + encodeURIComponent(sportId.toString()) + '/' + encodeURIComponent(matchId.toString());

    return this.http.get<CountDown>(url).toPromise();
  }
}
