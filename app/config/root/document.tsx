import { withEmotionCache } from '@emotion/react'
import type { ReactNode } from 'react'
import { ClientStyleContext, ServerStyleContext } from '~/config/emotion'

import { ColorModeScript } from '@chakra-ui/react'
import {
	Links,
	LiveReload,
	Meta,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import React from 'react'
import { ChakraThemeProvider, theme } from '~/theme'
type DocumentProps = {
	children: ReactNode
	title?: string
}

export const Document = withEmotionCache(
	({ children, title }: DocumentProps, emotionCache) => {
		const serverStyles = React.useContext(ServerStyleContext)
		const clientStyles = React.useContext(ClientStyleContext)

		// ref: https://github.com/mui-org/material-ui/issues/30436#issuecomment-1003339715
		React.useEffect(() => {
			// eslint-disable-next-line no-param-reassign
			emotionCache.sheet.container = document.head

			const { tags } = emotionCache.sheet
			emotionCache.sheet.flush()
			tags.forEach((tag) => {
				// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-explicit-any
				;(emotionCache.sheet as any)._insertTag(tag)
			})
			clientStyles?.reset()
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [])

		return (
			<html lang="en">
				<head>
					{title ? <title>{title}</title> : null}
					<Meta />
					<Links />
					{serverStyles?.map((style) => (
						<style
							data-emotion={`${style.key} ${style.ids.join(' ')}`}
							key={style.key}
							// eslint-disable-next-line react/no-danger
							dangerouslySetInnerHTML={{ __html: style.css }}
						/>
					))}
				</head>
				<body>
					<ColorModeScript initialColorMode={theme.config?.initialColorMode} />
					<ChakraThemeProvider>{children}</ChakraThemeProvider>
					<ScrollRestoration />
					<Scripts />
					{process.env.NODE_ENV === 'development' && <LiveReload />}
				</body>
			</html>
		)
	},
)
