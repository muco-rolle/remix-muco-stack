import { Document } from './document'

export function ErrorBoundary({ error }: { error: Error }) {
	console.error(error)
	return (
		<Document>
			<h1>An unknown error occured.</h1>
		</Document>
	)
}
