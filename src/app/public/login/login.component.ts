import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  /**
   * Realiza el inicio de sesión
   */
  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const params = this.loginForm.getRawValue();
      this.authService.logIn(params)
        .subscribe(
          res => {
            if (res.token !== null && res.token !== undefined) {
              this.authService.setUser(params.email);
              this.authService.setToken(res.token);
              this.isLoading = false;
              this.router.navigate(['/productos']);
            } else {
              this.isLoading = false;
              this.notificationService.showMessage('Error', 'Nombre de usuario o contraseña incorrecta. Por favor, inténtelo de nuevo.', 'error');
            }
          },
          error => {
            if (error.status === 401){
              this.isLoading = false;
              this.notificationService.showMessage('Error', 'Nombre de usuario o contraseña incorrecta. Por favor, inténtelo de nuevo.', 'error');
            } else {
              this.isLoading = false;
              this.notificationService.showMessage('Error', ' Ocurrió un error al iniciar sesión. Inténtelo de nuevo.', 'error');
            }
          }
        );
    } else {
      this.notificationService.showMessage('Campos inválidos', 'Por favor verifique los campos.', 'warning');
    }
  }
}
