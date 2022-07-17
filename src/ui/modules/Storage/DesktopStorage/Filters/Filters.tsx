import { Button, Flex, Icon, Input, Select, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useFilters } from '../../../../../utils/effects/useFilters'

const Filters: FC = () => {
  const {
    categories,
    category,
    handleSubmit,
    searchTerm,
    setCategory,
    setSearchTerm,
    query,
  } = useFilters()
  return (
    <form onSubmit={handleSubmit}>
      <Flex
        flexDirection="column"
        p="20px"
        borderRadius="6px"
        border="1px solid #C4C4C4"
      >
        <Text fontSize="20px" fontWeight="500" color="#2D3748">
          Wyszukaj części w magazynie
        </Text>
        <Flex
          flexDirection="row"
          justifyContent="flex-start"
          mt="15px"
          fontSize="16px"
          fontWeight="500"
          color="#2D3748"
        >
          <Flex flexDirection="column" w="30%">
            <Text>Nazwa</Text>
            <Flex>
              <Input
                h="40px"
                border="1px solid #D4D4D4"
                fontWeight="400"
                placeholder="Nazwa Produktu"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Icon ml="3px" fontSize="30px" as={AiOutlineSearch} />
            </Flex>
          </Flex>
          <Flex flexDirection="column" ml="20px" w="30%">
            <Text>Kategoria</Text>
            <Select
              h="40px"
              border="1px solid #D4D4D4"
              fontWeight="400"
              value={(query.category as string | undefined) || category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Wszystkie</option>
              {categories.map(({ name, id }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </Flex>
        </Flex>
        <Flex justifyContent="flex-end" p="25px 0 5px 0">
          <Button
            type="submit"
            w="120px"
            h="40px"
            bgColor="#FF7700"
            color="white"
          >
            Wyszukaj
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}

export default Filters