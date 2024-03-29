import { AddScheme } from './AddScheme'
import { MobileWrapper } from 'ui/components'
import { Scheme } from './Scheme'
import { useSelector } from 'react-redux'
import { schemeInfo } from 'store'
import { memo } from 'react'

export const MobileSchemes = memo(function MobileSchemes() {
  const schemeData = useSelector(schemeInfo)

  return (
    <MobileWrapper mx="10px">
      <AddScheme />
      {schemeData.schemas.map((schema) => (
        <Scheme schema={schema} key={schema.id} />
      ))}
    </MobileWrapper>
  )
})
