import { Button, Container, Heading, VStack } from '@chakra-ui/react'
import { Link } from '@remix-run/react'

export default function IndexRoute() {
	return (
		<Container>
			<VStack>
				<Heading>Remix Muco Stack</Heading>
				<Button as={Link} to="/hell">
					Remix Docs
				</Button>
			</VStack>
		</Container>
	)
}
