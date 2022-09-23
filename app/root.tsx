import { Outlet } from '@remix-run/react'
import { Document } from '~/config/root'
export { meta } from '~/config/root'

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}

export const unstable_shouldReload = () => false
