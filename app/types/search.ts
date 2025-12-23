// types/search.ts
export enum SearchSuggestionType {
  BUSINESS = 'business',
  PLACE = 'place',
  BREAK = 'break'
}

export interface SearchSuggestion {
  id: string
  title: string
  description: string
  image: string
  entityType: SearchSuggestionType
}

export interface SearchSuggestionResponse {
  results: SearchSuggestion[]
  total: number
  query: string
}
