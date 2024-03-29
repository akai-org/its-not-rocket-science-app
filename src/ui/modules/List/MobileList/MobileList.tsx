import { useSelector } from 'react-redux'
import { storageCartInfo } from 'store'
import { AddItem } from './AddItem'
import { List } from './List/List'
import { MobileWrapper } from 'ui/components'
import { memo } from 'react'

export const MobileList = memo(function MobileList() {
  const storageCartData = useSelector(storageCartInfo)
  return (
    <MobileWrapper pb="150px">
      <AddItem />
      {storageCartData.cartLists.map((cartList) => (
        <List {...cartList} key={cartList.id} />
      ))}
    </MobileWrapper>
  )
})
