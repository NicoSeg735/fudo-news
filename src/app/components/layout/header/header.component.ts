import { Component } from '@angular/core'
import { RouterLink, RouterLinkActive } from '@angular/router'
import { SearchComponent } from './components/search/search.component'
import { NetworkService } from '@app/services/network.service'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public isOnline: boolean = true

  constructor(private networkService: NetworkService) {
    this.networkService.online$.subscribe((online) => {
      this.isOnline = online
    })
  }
}
