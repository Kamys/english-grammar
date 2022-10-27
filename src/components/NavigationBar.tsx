import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

interface Props {

}

export const NavigationBar: React.FC<Props> = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>English grammar</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <LinkContainer to='/'>
              <Nav.Link>Learn today</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/repetition'>
              <Nav.Link>Repetition</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/progress'>
              <Nav.Link>Progress</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}