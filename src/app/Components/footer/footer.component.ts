import { Component } from '@angular/core';

//TODO => Responsive

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  email: string = 'newtraditions02@gmail.com'
  phone: string = '+34 123456789'
  timetable: string[] = [
    'Lunes: 08:00 - 16:30 / 19:00 - 01:00',
    'Martes: 08:00 - 16:30 / 19:00 - 01:00',
    'Miércoles: Cerrado',
    'Jueves: Cerrado',
    'Viernes: 08:00 - 16:30 / 19:00 - 01:00',
    'Sábado: 08:00 - 16:30 / 19:00 - 01:00',
    'Domingo: 08:00 - 16:30 / 19:00 - 01:00'
  ]
}