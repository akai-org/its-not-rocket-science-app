import { Flex, Select, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { SortType } from '../../../services/itemsService'

export const SortingGeneral = () => {
  const router = useRouter()
  const query = router.query

  const sort = query.sort

  delete query.page

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value !== sort) {
      router.push({ query: { ...query, sort: value } })
    }
  }

  return (
    <Flex flexDirection="row">
      <Text>sortuj po:</Text>
      <Select
        onChange={handleChange}
        variant="unstyled"
        w="140px"
        ml="10px"
        color="black"
      >
        {/* TODO: Display options smarter */}
        <option value="newest">najnowsze</option>
        <option value="oldest">najstarsze</option>
        <option value="alphabetically">alfabetycznie</option>
      </Select>
    </Flex>
  )
}
