import { Flex, Text, Image } from '@chakra-ui/react'
import { useColors } from '../../../theme/useColors'

const Footer = () => {
  const colors = useColors()

  return (
    <Flex
      bg={colors.backgroundPrimary}
      w="100vw"
      h="40px"
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Text>Powered by </Text>
      <Image src={colors.logoAkai} alt="Logo AKAI" />
    </Flex>
  )
}

export default Footer
