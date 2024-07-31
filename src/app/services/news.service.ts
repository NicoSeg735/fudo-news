import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { environment } from '@env/environment.development'
import { INew, INewsResult } from '@interfaces/new'
import {
  generateSlugByTitle,
  generateSourceSlug
} from '@app/utils/string-utils'

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private API_URL = environment.API_URL
  private API_KEY = environment.API_KEY

  constructor(private http: HttpClient) {}

  getNewsList(): Observable<INewsResult> {
    const params = new HttpParams()
      .set('pageSize', '10')
      .set('language', 'es')
      .set('apiKey', this.API_KEY)

    return this.http
      .get<INewsResult>(`${this.API_URL}everything?q=${'restaurant'}`, {
        params
      })
      .pipe(
        map((result: INewsResult) => {
          result.articles = result.articles
            .filter((article: INew) => article.urlToImage !== null)
            .map((article: INew) => {
              const slug = generateSlugByTitle(article.title)

              const source = {
                ...article.source,
                slug: generateSourceSlug(
                  article.source.id ?? article.source.name
                )
              }
              return { ...article, slug, source }
            })
          return result
        })
      )
  }

  getArticleBySlugAndSource(slug: string, source: string): Observable<INew> {
    const params = new HttpParams()
      .set('pageSize', '1')
      .set('language', 'es')
      .set('apiKey', this.API_KEY)

    return this.http
      .get<INewsResult>(
        `${this.API_URL}everything?q=${slug.replace(/-/g, '+')}`,
        { params }
      )
      .pipe(
        map((result: INewsResult) => {
          const articleFounded = result?.articles.find(
            (article) =>
              generateSourceSlug(article.source.id ?? article.source.name) ===
              source
          )
          console.log(articleFounded)

          if (!articleFounded) {
            throw new Error('Article not found')
          }

          return articleFounded
        })
      )
  }
}
