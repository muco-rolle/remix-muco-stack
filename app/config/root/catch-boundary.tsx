import { Button, Container, Image, Text, VStack } from '@chakra-ui/react'
import { Link, useCatch } from '@remix-run/react'
import { MotionBox } from '~/components'
import { Document } from './document'

export function CatchBoundary() {
	const { data, status, statusText } = useCatch()

	let message

	switch (status) {
		case 401:
			message = (
				<Text>
					Oops! Looks like you tried to visita page that you do not have access
					to.
				</Text>
			)
			break
		case 404:
			message = <Text>We can't seem to find the page you are looking for</Text>

			break
		default:
			throw new Error(data || statusText)
	}

	return (
		<Document>
			<Container maxW="container.lg">
				<VStack spacing="8">
					<MotionBox
						animate={{ y: 20 }}
						transition={{
							repeat: Infinity,
							duration: 2,
							repeatType: 'reverse',
						}}
						width={['100%', '70%', '60%', '60%']}
						margin="0 auto">
						<Image
							src="/images/errors/not-found-error.svg"
							alt="Not Found Error Illustration"
							loading="lazy"
						/>
					</MotionBox>

					<VStack spacing="6">
						<Text fontSize="2xl">{message}</Text>
						<Button
							size="lg"
							colorScheme="yellow"
							as={Link}
							to="/"
							prefetch="intent">
							Back to Home
						</Button>
					</VStack>
				</VStack>
			</Container>
		</Document>
	)
}
