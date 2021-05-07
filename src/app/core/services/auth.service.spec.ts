import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const routerMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RouterTestingModule,
        AuthService,
        { provide: Router, useValue: routerMock }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  const user: User = {
    id: 1,
    firstName: 'Laura',
    lastName: 'Torres',
    email: 'example@example.com',
    password: 'examplePassword'
  };

  const token: Token = {
    token: 'adv3u4inenfs'
  };

  it('Debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('Debería almacenar el user en el localstorage', () => {
    service.setUser(user.email);
    const userStorage = localStorage.getItem('user');
    expect(user.email).toEqual(userStorage);
  });

  it('Debería almacenar el token en el localstorage', () => {
    service.setToken(token.token);
    const tokenStorage = localStorage.getItem('token');
    expect(tokenStorage).toEqual(token.token);
  });

  it('Debería obtener el user del localstorage', () => {
    localStorage.setItem('user', user.email);
    const userStorage = service.getCurrentUser();
    expect(userStorage).toEqual(user.email);
  });

  it('Debería obtener el token del localstorage', () => {
    localStorage.setItem('token', token.token);
    const tokenStorage = service.getToken();
    expect(tokenStorage).toEqual(token.token);
  });

  it('Debería iniciar sesión', () => {
    const params = {
      email: user.email,
      password: user.password
    };

    service.logIn(params).subscribe((res) => {
      expect(res).toEqual(token);
    });

    const req = httpMock.expectOne('https://run.mocky.io/v3/5a0c1048-107d-499f-b6ed-eb5a9a060ac8');
    expect(req.request.method).toBe('POST');
    req.flush(token);
  });
});
