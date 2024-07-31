import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { SearchComponent } from './components/search/search.component'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}
