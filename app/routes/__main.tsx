import { Outlet } from '@remix-run/react'

export { CatchBoundary, ErrorBoundary } from '~/config/root'

export default function MainLayout() {
	return <Outlet />
}
