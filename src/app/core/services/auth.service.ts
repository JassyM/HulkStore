import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token = '';
  public user: any;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  private setHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
  }

  /**
   * Inicia sesión
   * @param params parámetros email y password
   */
  public logIn(params): Observable<Token>{
    return this.http.post<Token>(`${environment.login}`, params);
  }

  /**
   * Elimina la sesión del usuario.
   */
  public logout(): void {
    const headers = this.setHeader();
    this.http.post(`${environment.logout}`, {}, { headers });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  /**
   * Agrega la sesión de usuario al localstorage.
   * @param user nombre de usuario
   */
  public setUser(username: string): void {
    localStorage.setItem('user', username);
  }

  /**
   * Agrega el token de acceso al localstorage.
   * @param token token actual de acceso.
   */
  public setToken(token): void {
    localStorage.setItem('token', token);
  }

  /**
   * Obtiene el token de acceso del localStorage
   * @return token almacenado o null.
   */
  public getToken(): string | null {
    const auth = localStorage.getItem('token');
    if (auth !== null && auth !== undefined) {
      return auth;
    } else {
      return null;
    }
  }

  /**
   * Obtiene el usuario del localStorage
   * @return usuario almacenado o null.
   */
  public getCurrentUser(): any {
    const user = localStorage.getItem('user');
    if (user !== null && user !== undefined) {
      return user;
    } else {
      return null;
    }
  }

  public isLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }

}
