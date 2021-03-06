import React, { useState } from 'react';
import {Navbar, NavLink, NavbarBrand, NavbarText, NavbarToggler, Collapse, Button,
Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

function Navigation({animation, setAnimation, automatic, setAutomatic}) {
    const [collapsed, setCollapsed] = useState(true);

    return(
        <div>
            <Navbar
                color="light"
                expand="md"
                light
                className={`rounded px-2 ${collapsed ? 'rounded-pill' : 'rounded-3'}`}
            >
                <NavbarBrand href="/">
                EmojiPred
                </NavbarBrand>
                <NavbarToggler onClick={() => setCollapsed(!collapsed)} />
                <Collapse isOpen={!collapsed} navbar>
                <Nav
                    className="me-auto"
                    navbar
                >
                    <a href="https://drive.google.com/file/d/1zKbIOUoP9lPOX7euO_BwnhD_egMc-rJw/view?usp=sharing" target="_blank" rel="noreferrer">
                    <NavItem>
                        <NavLink>Paper</NavLink>
                    </NavItem>
                    </a>

                    <UncontrolledDropdown
                    inNavbar
                    nav
                    >
                    <DropdownToggle
                        caret
                        nav
                    >
                        Authors
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem>
                        Jahnvi Kumari
                        </DropdownItem>
                        <DropdownItem>
                        Varun Khurana
                        </DropdownItem>
                        <DropdownItem>
                        Harsh Kumar
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <NavbarText>
                <a href="https://github.com/hadron43/emoji-pred-website" target="_blank" rel="noreferrer">
                    <Button className="rounded-pill"
                        outline
                        color='dark'>
                        <i class='bi bi-github h5'> Github</i>
                    </Button>
                    </a>
                    <span className="mx-1"></span>
                    <Button className="rounded-pill"
                        outline={!automatic}
                        onClick={() => setAutomatic(!automatic)}
                        color="warning">
                        <i class={'bi bi-lightning-charge'}></i>
                    </Button>
                    <span className="mx-1"></span>
                    <Button className="rounded-pill"
                        outline={!animation}
                        onClick={() => setAnimation(!animation)}
                        color={`${!animation ? 'danger' : 'success'}`}>
                        <i class={`bi bi-camera-video${animation ? '' : '-off'}`}></i>
                    </Button>
                </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default Navigation;