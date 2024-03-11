import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  email: string = 'prueba@empresa.com'
  localization: string = 'Calle Prueba, 52'
  phone: string = '+34 123456789'
  timetable: string[] = [
    'Lunes: 08AM - 17PM',
    'Martes: 08AM - 17PM',
    'Miércoles: 08AM - 17PM',
    'Jueves: 08AM - 17PM',
    'Viernes: 08AM - 17PM',
    'Sábado: 08AM - 17PM',
    'Domingo: 08AM - 17PM',

  ]
}
