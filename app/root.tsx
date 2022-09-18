import type { ErrorBoundaryComponent, MetaFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

export const meta: MetaFunction = () => {
	return {
		charset: 'utf-8',
		title: 'Welcome to Remix Barebones Stack!',
		description:
			'A robust create-remix app, that applies best practices into a clean, batteries included template. PostgreSQL version. Deploys to Fly.io',
		keywords:
			'remix,create-remix,remix-stack,typescript,postgresql,prisma,tailwindcss,fly.io',
		'og:title': 'Remix Barebones Stack',
		'og:type': 'website',
		'og:url': 'https://remix-muco-stack.fly.dev',
		'og:image':
			'https://raw.githubusercontent.com/dev-xo/dev-xo/main/barebones-stack/assets/images/thumbnail-postgres-v1.png',
		'og:card': 'summary_large_image',
		'og:creator': '@DEV_XO1',
		'og:site': 'https://remix-muco-stack.fly.dev',
		'og:description':
			'A robust create-remix app, that applies best practices into a clean, batteries included template. PostgreSQL version. Deploys to Fly.io ',
		'twitter:image':
			'https://raw.githubusercontent.com/dev-xo/dev-xo/main/barebones-stack/assets/images/thumbnail-postgres-v1.png',
		'twitter:card': 'summary_large_image',
		'twitter:creator': '@DEV_XO1',
		'twitter:title': 'Remix Barebones Stack',
		'twitter:description':
			'A robust create-remix app, that applies best practices into a clean, batteries included template. PostgreSQL version. Deploys to Fly.io ',
	}
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
	console.error(error)
	return (
		<html>
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body className="flex flex-col justify-center items-center h-screen">
				{/* Add here the UI you want your users to see. */}
				<h1 className="text-2xl">Something went wrong!</h1>
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
