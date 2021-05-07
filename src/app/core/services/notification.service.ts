import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showMessage(title: string, content: string, type: SweetAlertIcon): void {
    Swal.fire(title, content, type);
  }

}
