import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RuleRequest} from '../../models/RuleRequest';
import {MetadataResponse} from '../../models/MetadataResponse';
import {RuleEvaluationResponse} from '../../models/RuleEvaluationResponse';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private readonly BASE_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getMetadata(): Observable<MetadataResponse> {
    return this.http.get<MetadataResponse>(`${this.BASE_URL}/rule-builder/metadata`);
  }

  createRule(payload: RuleRequest): Observable<any> {
    return this.http.post(`${this.BASE_URL}/rule-builder/create`, payload);
  }

  evaluateRulesForUser(userId: number): Observable<RuleEvaluationResponse> {
    return this.http.get<RuleEvaluationResponse>(`${this.BASE_URL}/rule-evaluator/${userId}`);
  }
}
