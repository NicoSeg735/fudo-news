import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ErrorDialogComponent } from '@app/components/layout/error-dialog/error-dialog.component'
import { INew } from '@app/interfaces/new'
import { NewsService } from '@app/services/news.service'
import { LucideAngularModule } from 'lucide-angular'

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ErrorDialogComponent, LucideAngularModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public source: string = ''
  public slug: string = ''
  public article: INew | null = null
  public error: { statusCode: number; message: string } | null = null
  public publishedFormattedDate!: string

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

        this.publishedFormattedDate = new Date(
          article.publishedAt
        ).toLocaleDateString()
      },
      error: (error) => {
        this.error = {
          statusCode: error.statusCode,
          message: error.message
        }
      }
    })
  }
}
