import { Box, ButtonGroup, Checkbox, Flex, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai'

interface CategoryProps {
  // FIXME: nie wolno używać key jako propsów
  id: string
  value: string
  categoryName: string
}

const Category = ({ id, value, categoryName }: CategoryProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(categoryName)

  return (
    <Flex h="30px">
      <Checkbox key={id} value={value}></Checkbox>

      {isEditing ? (
        <Flex justifyContent="space-between" w="100%">
          <Input
            ml="10px"
            h="30px"
            fontSize="14px"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <ButtonGroup ml="10px" size="sm">
            <AiOutlineCheck onClick={() => setIsEditing(false)} size="25px" />
            <AiOutlineClose onClick={() => setIsEditing(false)} size="25px" />
          </ButtonGroup>
        </Flex>
      ) : (
        <Flex lineHeight="30px" justifyContent="space-between" w="100%">
          <Box ml="10px">{categoryName}</Box>
          <AiOutlineEdit onClick={() => setIsEditing(true)} size="25px" />
        </Flex>
      )}
    </Flex>
  )
}

export default Category
