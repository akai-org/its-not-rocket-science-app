import { Item, ItemModel } from '../mongo/models/item'
import { ITEMS_QUERY_LIMIT } from '../utils/constants'
import { validateSortParam } from '../utils/dataValidation/validateSortParam'

export type SortType = 'newest' | 'oldest' | 'alphabetically'

export async function fetchItems(
  skip = 0,
  limit: number = ITEMS_QUERY_LIMIT,
  filterOptions?: { category?: string; searchTerm?: string; sort?: SortType }
): Promise<Item[]> {
  let items
  const match: {
    'searchedCategory.name'?: string
    $or?: object[]
  } = {}
  if (filterOptions?.category) {
    match['searchedCategory.name'] = filterOptions.category
  }

  let sortType: SortType = !filterOptions?.sort ? 'newest' : filterOptions.sort

  if (!validateSortParam(sortType)) {
    sortType = 'newest'
  }

  if (filterOptions?.searchTerm) {
    match.$or = []
    const regex = new RegExp(filterOptions.searchTerm, 'i')
    match.$or.push({ name: { $regex: regex } })
    match.$or.push({ description: { $regex: regex } })
  }

  const sort: { updatedAt?: any; name?: any } = {
    updatedAt: sortType !== 'newest' ? 1 : -1,
  }

  if (sortType === 'alphabetically') {
    delete sort.updatedAt
    sort.name = 1
  }

  const parseCategory = [
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',
        as: 'searchedCategory',
      },
    },
    { $unwind: '$searchedCategory' },
  ]

  const queryBody = [
    {
      $match: match,
    },
    {
      $addFields: {
        id: '$_id',
      },
    },
  ]

  const filterAlwaysByCategory =
    (filterOptions?.category && filterOptions?.searchTerm) ||
    filterOptions?.category

  const filterBySearch = filterOptions?.searchTerm

  // FIXME: te sorty jakoś by wprowadzić sprytniej, bo duża redundancja

  if (filterAlwaysByCategory) {
    items = ItemModel.aggregate([...parseCategory, ...queryBody]).sort(sort)
  } else if (filterBySearch) {
    items = ItemModel.aggregate([...queryBody]).sort(sort)
  } else {
    items = ItemModel.find()
  }
  return await items.skip(skip).limit(limit).sort(sort)
}

export async function fetchItemsCount(): Promise<number> {
  const itemsCount = await ItemModel.count()
  return itemsCount
}
