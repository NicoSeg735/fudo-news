export interface INew {
  source: {
    id: string
    name: string
    slug?: string
  }
  author: string
  title: string
  description: string
  url: string
  urlToImage: string
  publishedAt: string
  content: string
  slug?: string
}

export interface INewsResult {
  status: string
  totalResults: number
  articles: INew[]
}
