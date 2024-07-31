import { Component } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { LucideAngularModule } from 'lucide-angular'
import { FormsModule } from '@angular/forms'
import { filter } from 'rxjs'

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [LucideAngularModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchQuery: string = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const hasQueryParam = this.route.snapshot.queryParamMap.has('q')
        if (event.url === '/' || !hasQueryParam) {
          this.searchQuery = ''
        }
      })
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/'], { queryParams: { q: this.searchQuery } })
    }
  }
}
