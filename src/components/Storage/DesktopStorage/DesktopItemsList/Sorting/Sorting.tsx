import React from 'react'
import { Box, Flex, Select, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'

const Sorting = () => {
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
    <Box w="100%" mr="10px" color="#D5D5D5">
      <Flex flexDirection="row">
        <Text>sortuj po:</Text>
        <Select
          onChange={handleChange}
          variant="unstyled"
          w="140px"
          ml="10px"
          color="black"
        >
          <option value="newest">najnowsze</option>
          <option value="oldest">najstarsze</option>
          <option value="alphabetically">alfabetycznie</option>
        </Select>
      </Flex>
    </Box>
  )
}

export default Sorting