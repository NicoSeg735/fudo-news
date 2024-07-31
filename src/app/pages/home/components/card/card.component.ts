import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { INew } from '@interfaces/new'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() newInfo!: INew
}
