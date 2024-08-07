import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Recipe } from './models/recipe';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl + '/Recipe';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  query(): Observable<any> {
    return this.http.get(this.apiUrl + "/query");
  }

  addRecipe(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  uploadRecipe(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/upload', data);
  }

  deleteRecipe(id: string, recipeId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/${recipeId}`);
}

  editRecipe(data: Recipe): Observable<any> {
    return this.http.post(this.apiUrl + '/edit', data);
  }
}
