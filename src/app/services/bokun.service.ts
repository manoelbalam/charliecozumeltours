import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environment.development';

interface Photo {
  id: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})

export class BokunService {

  private accessKey = environment.apiKey;
  private secretKey = environment.apiSecret;
  private baseUrl = 'https://api.bokun.io';
   
  constructor(private httpClient: HttpClient) { }
  
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

  getExperience(experienceIds: any): Observable<any>{
    const experienceParsed : any[] = [];
    // const method = 'GET';
    // const path = '/restapi/v2.0/experience/'+experienceIds[2]+'/components?componentType=ALL';
    // const url = `${this.baseUrl}${path}`;
    // const headers = this.buildHeader(method, path)
    // // https://api.bokun.io/restapi/v2.0/experience/938509/components?componentType=ACTIVATION'
    // return this.httpClient.get(url, headers).pipe(
    //   map(data => {
    //     data.photos.forEach(photos => {
    //       console.log(photos);
    //       // category.items.forEach(item => {
    //       //   item.categoryName = category.name;
    //       // });
    //     });
    //     return data;
    //   })
    // );

    // return this.httpClient.get<ResponseType[]>(url, headers).pipe(
    // const experienceParsed = this.httpClient.get<ResponseType[]>(url, headers).pipe(
    //   map((response: any) => response)
    // //   map(apiResponse =>{
    // //     return apiResponse
    // //   })
    // );
    // experienceIds.array.forEach(element => {
    //   console.log(element);
    // });
    const photos = this.getExperiencePhotos(experienceIds[2])
    console.log("getExperience.photos: " + photos);
    return photos;
  }

  getExperiencePhotos(experienceId: string): Observable<any>{
    const method = 'GET';
    // https://api.bokun.io/restapi/v2.0/experience/938509/components?componentType=ACTIVATION'
    const path = '/restapi/v2.0/experience/'+experienceId+'/components?componentType=ALL';
    const url = `${this.baseUrl}${path}`;
    const headers = this.buildHeader(method, path)
    
    return this.httpClient.get<ResponseType[]>(url, headers).pipe(
      map((response: any) => response)
    );
  }
  
  getActiveExperience(experienceId: any): Observable<any>{
    const method = 'GET';
    // https://api.bokun.io/restapi/v2.0/experience/938509/components?componentType=ACTIVATION'
    const path = '/restapi/v2.0/experience/'+experienceId+'/components?componentType=ACTIVATION';
    const url = `${this.baseUrl}${path}`;
    const headers = this.buildHeader(method, path)
    return this.httpClient.get<any[]>(url, headers);
    // for (var experienceId of experienceIds) {
      // console.log(experienceId); // prints values: 10, 20, 30, 40
      // const res = this.httpClient.get(url, headers).pipe(
      // map((response: any) => response));
      // console.log('res: ' + res); 
      // console.log('res: ' + response); 
    // }
    // return experienceIds
    // return this.httpClient.get(url, headers).pipe(
    //   map((response: any) => response)
    // );
  }
  // makeRequest(method:any, path: any){
  //   const fullPath = path;
  //   const url = `${this.baseUrl}${fullPath}`;
  //   // Format timestamp in UTC
  //   const timestamp = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US', 'UTC');
  //   // Generate string to sign
  //   const stringToSign = `${timestamp}${this.accessKey}${method}${fullPath}`;

  //   // Create HMAC SHA1 signature
  //   const hash = CryptoJS.HmacSHA1(stringToSign, this.secretKey);
  //   const signature = CryptoJS.enc.Base64.stringify(hash);

  //   // Construct headers
  //   const headers = new HttpHeaders({
  //     'X-Bokun-Date': timestamp,
  //     'X-Bokun-AccessKey': this.accessKey,
  //     'X-Bokun-Signature': signature,
  //     'Content-Type': 'application/json'
  //   });

  //   // Send GET request
  //   // return this.httpClient.get(url, { headers });
  //   return this.httpClient.get(url, { headers }).pipe(
  //     map((response: any) => response.photos)
  //   );
  // }
  // getTimezones(): Observable<any> {
  //   const method = 'GET';
  //   const path = '/restapi/v2.0/timezones';
  //   const fullPath = path;
  //   const url = `${this.baseUrl}${fullPath}`;
  //   return this.makeRequest(method, path)
  // }
  
}
