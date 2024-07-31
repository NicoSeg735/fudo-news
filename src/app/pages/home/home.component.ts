import { Component, OnInit, ChangeDetectorRef } from '@angular/core'
import { INewsResult } from '@app/interfaces/new'
import { NewsService } from '@app/services/news.service'
import { EMPTY, Observable, of } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { CardComponent } from './components/card/card.component'
import { AsyncPipe } from '@angular/common'
import { ErrorDialogComponent } from '@app/components/layout/error-dialog/error-dialog.component'
import { ActivatedRoute } from '@angular/router'
import { LucideAngularModule } from 'lucide-angular'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    AsyncPipe,
    ErrorDialogComponent,
    LucideAngularModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public newsResult$!: Observable<INewsResult>
  public error: { statusCode: number; message: string } | null = null
  public query!: string
  public isLoading: boolean = true

  constructor(
    private service: NewsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.newsResult$ = this.route.queryParams.pipe(
      switchMap((params) => {
        this.query = params['q']
        this.isLoading = true
        this.cdr.detectChanges()
        return this.service.getNewsList(this.query).pipe(
          catchError((error) => {
            this.error = {
              statusCode: error.statusCode,
              message: error.message
            }
            this.isLoading = true
            this.cdr.detectChanges()
            return EMPTY
          })
        )
      })
    )
    this.newsResult$.subscribe((newsResult) => {
      this.newsResult$ = of(newsResult)
      this.isLoading = false
      this.cdr.detectChanges()
    })
  }
}
