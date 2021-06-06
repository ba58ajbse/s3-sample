import React from 'react'
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Box } from '@chakra-ui/react'

const SignOut: React.FC = () => {
  return (
    <Box w="160px" m="0 0 0 auto">
      <AmplifySignOut />
    </Box>
  )
}

export default SignOut
