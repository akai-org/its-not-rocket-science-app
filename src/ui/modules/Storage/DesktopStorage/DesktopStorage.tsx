import { Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react'
import FiltersControlls from './Filters/Filters'
import DesktopItemsList from './DesktopItemsList/DesktopItemsList'
import { MainViewProps } from '../../../../utils/types/frontendGeneral'
import { useSelector } from 'react-redux'
import { storageCartInfo } from '../../../../store/store'
import { useEffect } from 'react'
import { HiInformationCircle } from 'react-icons/hi'
import ModalAddToList from '../../../components/Modals/ModalAddToList/ModalAddToList'
import Router from 'next/router'
import StorageEdit from './StorageEdit/StorageEdit'
import { useAddNewList } from '../../../../utils/effects/useAddNewList'
import DesktopWrapper from '../../../components/Wrappers/DesktopWrapper/DesktopWrapper'
import { useColors } from '../../../../theme/useColors'

const DesktopStorage = ({ items, itemsCount }: MainViewProps) => {
  const toast = useToast()
  const colors = useColors()
  const storageCartData = useSelector(storageCartInfo)
  const {
    isOpen: isOpenDetails,
    onOpen: onOpenDetails,
    onClose: onCloseDetails,
  } = useDisclosure()
  const id = 'add-to-list-toast'

  Router.events.on('beforeHistoryChange', () => {
    toast.closeAll()
  })
  const addNewList = useAddNewList(onCloseDetails)

  useEffect(() => {
    if (!toast.isActive(id) && storageCartData.newCartList.length !== 0) {
      toast({
        id,
        position: 'top',
        render: () => (
          <Button
            bgColor={colors.orangePrimary}
            w="300px"
            p="15px"
            borderRadius="10px"
            h="60px"
            color="white"
            onClick={() => {
              onOpenDetails()
              toast.closeAll()
            }}
          >
            <Flex flexDirection="column" w="100%" justifyContent="flex-start">
              <Flex lineHeight="20px" alignItems="center">
                <HiInformationCircle size="22px" />
                <Text fontWeight="normal" fontSize="lg" ml="5px">
                  Wybrano przedmioty
                </Text>
              </Flex>
              <Text fontSize="sm" fontWeight="light" ml="30px" textAlign="left">
                Kliknij aby wybra?? list??
              </Text>
            </Flex>
          </Button>
        ),
        duration: 36000000,
        isClosable: false,
      })
    } else if (storageCartData.newCartList.length === 0) {
      toast.closeAll()
    }
  }, [storageCartData.newCartList.length, isOpenDetails])

  return (
    <DesktopWrapper>
      <StorageEdit />
      <FiltersControlls />
      <DesktopItemsList itemsCount={itemsCount} items={items} />
      <ModalAddToList
        addNewCartList={addNewList}
        items={storageCartData.newCartList}
        onClose={onCloseDetails}
        isOpen={isOpenDetails}
        isCentered
      />
    </DesktopWrapper>
  )
}

export default DesktopStorage
