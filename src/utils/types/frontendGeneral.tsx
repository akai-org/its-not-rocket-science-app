import { Dispatch, SetStateAction } from 'react'
import { Category, PopulatedItem } from 'mongo'

export type sortingType = 'grid' | 'list'

export type listAddItem = 'custom' | 'existing'

export type Role = 'ADMIN' | 'EDITOR' | 'READER'

export interface ItemsQueryParams {
  page: number
}

export interface MainViewProps {
  items: PopulatedItem[]
  itemsCount: number
  categories?: Category[]
  setItems?: Dispatch<SetStateAction<PopulatedItem[]>>
}
