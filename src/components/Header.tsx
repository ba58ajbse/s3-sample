import React from 'react'
import styled from 'styled-components'
import SignOut from './SignOut'

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <SignOut />
    </StyledHeader>
  )
}

export default Header

const StyledHeader = styled.header`
  height: 60px;
  width: 100%;
`
