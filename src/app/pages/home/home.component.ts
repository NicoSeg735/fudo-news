import { Component, OnInit } from '@angular/core'
import { INewsResult } from '@app/interfaces/new'
import { NewsService } from '@app/services/news.service'
import { EMPTY, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { CardComponent } from './components/card/card.component'
import { AsyncPipe } from '@angular/common'
import { ErrorDialogComponent } from '@app/components/layout/error-dialog/error-dialog.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, AsyncPipe, ErrorDialogComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public newsResult$!: Observable<INewsResult>
  public error: { statusCode: number; message: string } | null = null

  constructor(private service: NewsService) {}

  ngOnInit(): void {
    this.newsResult$ = this.service.getNewsList().pipe(
      catchError((error) => {
        this.error = {
          statusCode: error.statusCode,
          message: error.message
        }
        return EMPTY
      })
    )
  }
}
