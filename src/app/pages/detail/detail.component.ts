import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { INew } from '@app/interfaces/new'
import { NewsService } from '@app/services/news.service'

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public source: string = ''
  public slug: string = ''
  public article: INew | null = null
  errorMessage: string | null = null

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug')
      const source = params.get('source')
      if (slug && source) {
        this.getArticle(slug, source)
      }
    })
  }

  getArticle(slug: string, source: string): void {
    this.newsService.getArticleBySlugAndSource(slug, source).subscribe({
      next: (article: INew) => {
        this.article = article
      },
      error: (err: Error) => {
        this.errorMessage = err.message
      }
    })
  }
}
