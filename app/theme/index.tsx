import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export const theme = extendTheme({})

type ChakraThemeProviderProps = {
	children: ReactNode
}

export const ChakraThemeProvider = ({ children }: ChakraThemeProviderProps) => {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
