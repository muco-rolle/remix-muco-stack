import { CacheProvider } from '@emotion/react'
import type { EntryContext } from '@remix-run/node'
import { Response } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import isbot from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { PassThrough } from 'stream'
import { createEmotionCache, ServerStyleContext } from '~/config/emotion'

const ABORT_DELAY = 5000

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
) {
	const cache = createEmotionCache()

	const callbackName = isbot(request.headers.get('user-agent'))
		? 'onAllReady'
		: 'onShellReady'

	return new Promise((resolve, reject) => {
		let didError = false

		const { pipe, abort } = renderToPipeableStream(
			<ServerStyleContext.Provider value={null}>
				<CacheProvider value={cache}>
					<RemixServer context={remixContext} url={request.url} />
				</CacheProvider>
			</ServerStyleContext.Provider>,
			{
				[callbackName]: () => {
					const body = new PassThrough()

					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(body, {
							headers: responseHeaders,
							status: didError ? 500 : responseStatusCode,
						}),
					)

					pipe(body)
				},
				onShellError: (err: unknown) => {
					reject(err)
				},
				onError: (error: unknown) => {
					didError = true

					console.error(error)
				},
			},
		)

		setTimeout(abort, ABORT_DELAY)
	})
}
