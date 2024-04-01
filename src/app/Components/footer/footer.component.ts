import { Component } from '@angular/core';

//TODO => Responsive

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  email: string = 'prueba@empresa.com'
  localization: string = 'Calle Prueba, 52 - San Vicente del Raspeig'
  phone: string = '+34 123456789'
  timetable: string[] = [
    'Lunes: 08:00 - 17:30',
    'Martes: 08:00 - 17:45',
    'Miércoles: 08:30 - 17:00',
    'Jueves: 12:00 - 16:00',
    'Viernes: 09:30 - 12:00',
    'Sábado: 10:45 - 13:30',
    'Domingo: Cerrado',
  ]
}
