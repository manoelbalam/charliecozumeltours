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

  getExperienceData(experienceId: string): Observable<any>{
    const method = 'GET';
    const path = '/restapi/v2.0/experience/'+experienceId+'/components?componentType=ALL';
    const url = `${this.baseUrl}${path}`;
    const headers = this.buildHeader(method, path)
    
    return this.httpClient.get<ResponseType[]>(url, headers).pipe(
      map((response: any) => response)
    );
  }

  getExperience(experienceIds: any): Observable<any>{
    const data: any[] = [];

    for ( const Id of experienceIds){
      const experience = this.getExperienceData(Id)
      // console.log('experience: ' + experience );
      experience.forEach((experience: any) =>
        data.push({
          index: 0,
          id: Id,
          activated: experience.activation.activated,
          title: experience.title,
          photos: experience.photos,
          itinerary: experience.itinerary,
          defaultPriceId: experience.pricingCategories.defaultId,
          pricing: experience.pricing.experiencePriceRules,
          languages : experience.guidanceTypes.GUIDED,
          duration : experience.duration,
          difficultyLevel : experience.difficultyLevel,
          minAge : experience.minAge,
          requirements : experience.requirements,
          extras : experience.extras
        }));
      }
      return of(data);
    }
}
