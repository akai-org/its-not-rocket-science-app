import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalProps,
  Image,
  Text,
  Flex,
  Box,
  Input,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Textarea,
  CheckboxGroup,
  Checkbox,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Category } from '../../../../mongo/models/category'
import { removeItem, updateItem } from '../../../../store/Slices/itemsSlice'
import { categoriesInfo } from '../../../../store/store'
import { API_URL } from '../../../../utils/constants'
import { fetcher } from '../../../../utils/requests'
import ProductButton from '../../Custom Buttons/ProductButton/ProductButton'
import DeletePopover from '../../Popovers/DeletePopover'
import { useColors } from '../../../../theme/useColors'

interface ModalEditItemProps extends Omit<ModalProps, 'children'> {
  name: string
  description: string
  imageUrl: string
  quantity: number
  id: string
  categories: Category[]
}

const ModalEditItem = (props: ModalEditItemProps) => {
  const dispatch = useDispatch()
  const categoriesData = useSelector(categoriesInfo)
  const [isEdit, setIsEdit] = useState(false)
  const [name, setName] = useState(props.name)
  const [description, setDescription] = useState(props.description)
  const [quantity, setQuantity] = useState(props.quantity)
  const [checkboxes, setCheckboxes] = useState<string[]>(
    props.categories.map((category) => category.id)
  )
  const colors = useColors()

  const initUpdateItem = async () => {
    try {
      const updatedItem = await fetcher(API_URL + '/api/items/update', {
        method: 'PUT',
        body: {
          id: props.id,
          item: { name, description, quantity, categories: checkboxes },
        },
      })
      dispatch(updateItem(updatedItem))
    } catch (error) {
      console.log(error)
    } finally {
      props.onClose()
    }
  }

  const deleteItem = async () => {
    try {
      const deletedItem = await fetcher(API_URL + '/api/items/delete', {
        method: 'DELETE',
        body: { id: props.id },
      })
      dispatch(removeItem(deletedItem))
    } catch (error) {
      console.log(error)
    } finally {
      props.onClose()
    }
  }

  return (
    <Modal {...props}>
      <ModalOverlay backdropFilter="blur(3px)" />
      <ModalContent maxW="40rem" bgColor={colors.backgroundPrimary}>
        <ModalHeader>Edycja produktu</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Image src={props.imageUrl} w="80px" h="80px" mr="10px" />
            <Box w="100%">
              <Input
                borderColor={colors.borderSecondary}
                h="30px"
                pl="5px"
                mb="5px"
                placeholder="Wprowad?? nazw??"
                value={name}
                onChange={(e) => {
                  setName(e.currentTarget.value)
                }}
                fontWeight="normal"
                fontSize="md"
              />
              <Flex lineHeight="30px" mt="5px">
                <Text>Ilo????:</Text>
                <NumberInput
                  borderColor={colors.borderSecondary}
                  allowMouseWheel
                  display="inline"
                  h="30px"
                  w="84px"
                  ml="10px"
                  fontSize="sm"
                  defaultValue={quantity}
                  onChange={(e) => {
                    setQuantity(parseInt(e))
                  }}
                  min={0}
                >
                  <NumberInputField h="32px" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Flex>
            </Box>
          </Flex>
          <Flex flexDirection="column">
            <Text mt="5px">Opis:</Text>
            <Textarea
              borderColor={colors.borderSecondary}
              p="5px"
              value={description}
              placeholder="Wprowad?? opis"
              onChange={(e) => {
                setDescription(e.currentTarget.value)
              }}
            />
          </Flex>
          <Flex flexDirection="column">
            <Text mt="5px">Kategorie:</Text>
            <CheckboxGroup
              value={checkboxes}
              onChange={(e) => setCheckboxes(e.map((el) => el.toString()))}
              colorScheme="orange"
            >
              <Flex flexDirection="column">
                {categoriesData.categories.map((category) => (
                  <Checkbox
                    key={category.id}
                    defaultChecked
                    value={category.id}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </Flex>
            </CheckboxGroup>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <ProductButton
            onClick={() => {
              setIsEdit(false)
              initUpdateItem()
            }}
            fontSize="sm"
            w="80px"
            ml="10px"
          >
            Zapisz
          </ProductButton>
          <ProductButton
            onClick={() => {
              props.onClose()
              setIsEdit(true)
            }}
            fontSize="sm"
            w="80px"
            ml="10px"
          >
            Zamknij
          </ProductButton>
          <DeletePopover
            label="Czy na pewno chcesz usun???? ten element?"
            onClick={deleteItem}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalEditItem
