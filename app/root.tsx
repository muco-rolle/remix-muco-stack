import { Outlet } from '@remix-run/react'
import { Document } from '~/config/root'
export { CatchBoundary, ErrorBoundary, meta } from '~/config/root'

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}
