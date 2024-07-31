import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent implements OnInit {
  @Input() statusCode!: number
  @Input()
  message!: string

  errorMessages: { [key: number]: string } = {
    404: 'No pudimos encontrar la página que buscabas.',
    500: 'Ocurrió un error interno en el servidor.',
    401: 'No tienes permisos para acceder a esta página.',
    429: 'Demasiadas solicitudes. Intenta de nuevo más tarde.'
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.errorMessages[this.statusCode]) {
      this.message = this.errorMessages[this.statusCode]
    }
  }

  goHome(): void {
    this.router.navigate(['/'])
  }
}
