import { useColorMode } from '@chakra-ui/react'

export const useColors = () => {
  const { colorMode } = useColorMode()
  const mode = colorMode === 'light'

  //First value for light mode
  //Second value for dark mode

  //font colors
  const fontPrimary = mode ? 'black' : 'white'
  const fontPrimaryOpposite = mode ? 'white' : 'black'
  const fontSecondary = mode ? '#2D3748' : 'white'
  const fontNeutral = mode ? '#C4C4C4' : '#C4C4C4'

  //border colors
  //borders of containers
  const borderPrimary = mode ? '#C4C4C4' : '#505970'
  //borders of inputs
  const borderSecondary = mode ? '#D4D4D4' : '#333f57'

  //shadow colors
  const shadowPrimary = mode ? '#D5D5D5' : 'black'

  //background colors
  const backgroundPrimary = mode ? 'white' : '#1A202C'

  //logo AKAI
  const logoAkai = mode
    ? 'logo-akai-light-theme.png'
    : 'logo-akai-dark-theme.png'

  //others
  const orangePrimary = '#FF7700'
  const errorPrimary = 'red.500'

  return {
    fontPrimary,
    fontPrimaryOpposite,
    fontSecondary,
    fontNeutral,
    borderPrimary,
    borderSecondary,
    shadowPrimary,
    backgroundPrimary,
    orangePrimary,
    errorPrimary,
    logoAkai,
  }
}
