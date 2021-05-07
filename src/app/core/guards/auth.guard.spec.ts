import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let httpMock: HttpTestingController;
  const routerMock = {navigate: jasmine.createSpy('navigate')};
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('Debe inicializarse', () => {
    expect(guard).toBeTruthy();
  });

  it('Debe permitir el ingreso de un usuario autenticado', () => {
    spyOn(authService, 'isLogged').and.returnValue(true);
    expect(guard.canActivate()).toEqual(true);
  });

  it('Debe permitir el ingreso de un usuario autenticado', () => {
    spyOn(authService, 'isLogged').and.returnValue(true);
    expect(guard.canLoad()).toEqual(true);
  });
});
