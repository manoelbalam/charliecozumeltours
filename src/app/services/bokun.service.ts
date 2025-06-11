import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { formatDate } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../env.prod';

@Injectable({
  providedIn: 'root'
})

export class BokunService {

  private accessKey = environment.apiKey;
  private secretKey = environment.apiSecret;
  private baseUrl = 'https://api.bokun.io';
  private expResponse: any[] = [];
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
    const data: any[] = [];
    const item: any[] = [];

    for ( const Id of experienceIds){
      const experience = this.getExperiencePhotos(Id)
      experience.forEach((experience: any) =>
        data.push({
          id: Id,
          title: experience.title,
          photos: experience.photos,
          itinerary: experience.itinerary,
          activation: experience.activation,
          pricing: experience.pricing.experiencePriceRules
        }));
        console.log('getExperience.experience: ' + experience)
      }
      return of(data);
    }
    
  getExperiencePhotos(experienceId: string): Observable<any>{
      const method = 'GET';
      const path = '/restapi/v2.0/experience/'+experienceId+'/components?componentType=ALL';
      const url = `${this.baseUrl}${path}`;
      const headers = this.buildHeader(method, path)
      
      return this.httpClient.get<ResponseType[]>(url, headers).pipe(
        map((response: any) => response)
      );
    }
    
    getActiveExperience(experienceId: any): Observable<any>{
      const method = 'GET';
      const path = '/restapi/v2.0/experience/'+experienceId+'/components?componentType=ACTIVATION';
      const url = `${this.baseUrl}${path}`;
      const headers = this.buildHeader(method, path)
      return this.httpClient.get<any[]>(url, headers);
    }
}
