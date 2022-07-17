import {
  Flex,
  Heading,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from '@chakra-ui/react'
import ModalEditList from '../../../../components/Modals/ModalEditList/ModalEditList'
import { PopulatedCartList } from '../../../../../mongo/models/cart'
import ListItem from '../ListItem/ListItem'
import { fetcher } from '../../../../../utils/requests'
import { useDispatch } from 'react-redux'
import { removeExisitngCartList } from '../../../../../store/Slices/storageCartSlice'
import ListMenu from '../../../../components/Menus/ListMenu'
import { API_URL } from '../../../../../utils/constants'

interface Props extends PopulatedCartList {}

const List = (props: Props) => {
  const {
    isOpen: isOpenEditList,
    onOpen: onOpenEditList,
    onClose: onCloseEditList,
  } = useDisclosure()

  const dispatch = useDispatch()

  const deleteCartList = async () => {
    try {
      const deletedCartList = await fetcher(API_URL + '/api/cart/delete', {
        method: 'DELETE',
        body: { id: props.id },
      })
      dispatch(removeExisitngCartList(deletedCartList))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Accordion
      allowMultiple
      borderRadius="6px"
      bgColor="white"
      border="1px solid #C4C4C4"
      mt="20px"
    >
      <AccordionItem border="none">
        <Flex>
          <AccordionButton w="100%" justifyContent="space-between">
            <Text
              fontSize="20px"
              lineHeight="25px"
              noOfLines={1}
              textAlign="left"
              my="5px"
              ml="10px"
              color="#4A5568"
              fontWeight="500"
            >
              {props.name}
            </Text>
            <AccordionIcon />
          </AccordionButton>
          <Flex pt="5px" mr="20px">
            <ListMenu onEdit={onOpenEditList} onDelete={deleteCartList} />
          </Flex>
        </Flex>
        <AccordionPanel pb={4}>
          <Flex flexWrap="wrap" p="20px">
            {/* TODO: Usuwanie listy */}
            <Table p="20px">
              <Thead>
                <Tr fontSize="16px" fontWeight="700">
                  <Th w="50%">NAZWA</Th>
                  <Th w="50%">OPIS</Th>
                  <Th textAlign="right" w="1%" minW="140px">
                    ILOŚĆ SZTUK
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.items.map((item) => (
                  <ListItem key={item.id} {...item} />
                ))}
              </Tbody>
            </Table>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
      <ModalEditList
        cartList={props}
        name="defaultowa lista"
        onClose={onCloseEditList}
        isOpen={isOpenEditList}
        isCentered
      />
    </Accordion>
  )
}

export default List