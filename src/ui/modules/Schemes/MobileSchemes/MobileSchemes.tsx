import AddScheme from './AddScheme/AddScheme'
import MobileWrapper from '../../../components/Wrappers/MobileWrapper/MobileWrapper'
import Scheme from './Scheme/Scheme'
import { useSelector } from 'react-redux'
import { schemeInfo } from '../../../../store/store'

const MobileSchemes = () => {
  const schemeData = useSelector(schemeInfo)

  return (
    <MobileWrapper mx="10px">
      <AddScheme />
      {schemeData.schemas.map((schema) => (
        <Scheme schema={schema} key={schema.id} />
      ))}
    </MobileWrapper>
  )
}

export default MobileSchemes
