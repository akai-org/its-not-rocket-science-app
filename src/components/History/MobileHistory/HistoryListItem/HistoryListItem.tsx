import {
  Flex,
  Stack,
  Avatar,
  Heading,
  Text,
  useDisclosure,
  Modal,
} from '@chakra-ui/react'
import MoreInfoModal from '../MoreInfoModal/MoreInfoModal'

const HistoryListItem = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex m="10px auto 5px 15px" color="black" flexDirection="column">
      <Stack direction="row">
        <Avatar size="md" backgroundColor="black" />
        <Stack direction="column">
          <Stack direction="row">
            <Heading size="sm">Rafał Walkowiak</Heading>
            <Text fontSize="sm">21:37</Text>
          </Stack>
          <Text fontSize="sm">Wyciągnięto z magazynu:</Text>
          <Text fontSize="sm">Silnik od malucha x1, Śruba lewoskrętna x25</Text>
          <Text as="u" color="#FF7700" onClick={onOpen}>
            pokaż więcej
          </Text>
        </Stack>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <MoreInfoModal />
      </Modal>
    </Flex>
  )
}

export default HistoryListItem