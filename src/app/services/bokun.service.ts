import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environment.development';

@Injectable({
  providedIn: 'root'
})
export class BokunService {

  private accessKey = environment.apiKey;
  private secretKey = environment.apiSecret;
  private baseUrl = 'https://api.bokun.io';
   
  constructor(private httpClient: HttpClient) { }
  
  makeRequest(method:any, path: any){
    const fullPath = path;
    const url = `${this.baseUrl}${fullPath}`;
    // Format timestamp in UTC
    const timestamp = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US', 'UTC');
    // Generate string to sign
    const stringToSign = `${timestamp}${this.accessKey}${method}${fullPath}`;

    // Create HMAC SHA1 signature
    const hash = CryptoJS.HmacSHA1(stringToSign, this.secretKey);
    const signature = CryptoJS.enc.Base64.stringify(hash);

    // Construct headers
    const headers = new HttpHeaders({
      'X-Bokun-Date': timestamp,
      'X-Bokun-AccessKey': this.accessKey,
      'X-Bokun-Signature': signature,
      'Content-Type': 'application/json'
    });

    // Send GET request
    // return this.httpClient.get(url, { headers });
    return this.httpClient.get(url, { headers }).pipe(
      map((response: any) => response.photos)
    );
  }
  
  buildHeader(method:any, path: any){
    const fullPath = path;
    const url = `${this.baseUrl}${fullPath}`;
    // Format timestamp in UTC
    const timestamp = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US', 'UTC');
    // Generate string to sign
    const stringToSign = `${timestamp}${this.accessKey}${method}${fullPath}`;

    // Create HMAC SHA1 signature
    const hash = CryptoJS.HmacSHA1(stringToSign, this.secretKey);
    const signature = CryptoJS.enc.Base64.stringify(hash);

    // Construct headers
    const headers = new HttpHeaders({
      'X-Bokun-Date': timestamp,
      'X-Bokun-AccessKey': this.accessKey,
      'X-Bokun-Signature': signature,
      'Content-Type': 'application/json'
    });
    return { headers }
  }

  getExperiencePhotos(experienceId: string): Observable<any>{
    // const experience_id = 938509;
    const method = 'GET';
    const path = '/restapi/v2.0/experience/'+experienceId+'/components?componentType=PHOTOS';
    const url = `${this.baseUrl}${path}`;
    const headers = this.buildHeader(method, path)
    return this.httpClient.get(url, headers).pipe(
      map((response: any) => response.photos)
    );
    // return this.makeRequest(method, path)
  }

  getTimezones(): Observable<any> {
    const method = 'GET';
    const path = '/restapi/v2.0/timezones';
    const fullPath = path;
    const url = `${this.baseUrl}${fullPath}`;
    return this.makeRequest(method, path)
  }
  
}
