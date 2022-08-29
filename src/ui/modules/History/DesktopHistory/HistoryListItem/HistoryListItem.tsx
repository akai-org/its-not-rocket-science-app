import { Badge, Box, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { historyInfo } from '../../../../../store/store'
import { useColors } from '../../../../../theme/useColors'
import HistoryListItemMessage from '../HistoryListItemMessage/HistoryListItemMessage'

interface Props {
  groupDate: string
}

const HistoryListItem: FC<Props> = ({ groupDate }) => {
  const colors = useColors()
  const logs = useSelector(historyInfo)?.logs.get(groupDate)

  return (
    <Flex
      w="60vw"
      m="10px auto 5px 15px"
      flexDirection="column"
      maxW="2000px"
      color={colors.fontSecondary}
    >
      <Box m="10px 0 0 10px" w="100%">
        <Text size="sm" fontWeight="normal" m="5px">
          {groupDate}
        </Text>
        {!logs
          ? null
          : logs.map((log) => {
              return (
                <Stack key={log.id} direction="row" mb="20px" w="100%">
                  <Icon
                    as={FaUserCircle}
                    mr="5px"
                    color={colors.fontPrimary}
                    fontSize="50px"
                  />
                  <Stack direction="column" w="90%" maxW="1600px">
                    <Stack direction="row">
                      <Heading size="sm">{log.author}</Heading>
                      <Text fontSize="sm">
                        {new Date(log.createdAt).toDateString()}
                      </Text>
                      <Badge variant="solid" colorScheme="orange" color="white">
                        {log.resource.type}
                        {/* props type */}
                      </Badge>
                    </Stack>
                    <Stack direction="row">
                      <HistoryListItemMessage name={log.resource.name} />
                    </Stack>
                  </Stack>
                </Stack>
              )
            })}
      </Box>
    </Flex>
  )
}

export default HistoryListItem
