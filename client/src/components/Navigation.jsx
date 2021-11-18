import React, { useState } from 'react';
import {Navbar, NavLink, NavbarBrand, NavbarText, NavbarToggler, Collapse, Button,
Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

function Navigation({animation, setAnimation}) {
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
                    <NavItem>
                    <NavLink href="/components/">
                        Components
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="">
                        GitHub
                    </NavLink>
                    </NavItem>
                    <UncontrolledDropdown
                    inNavbar
                    nav
                    >
                    <DropdownToggle
                        caret
                        nav
                    >
                        Options
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem>
                        Option 1
                        </DropdownItem>
                        <DropdownItem>
                        Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                        Reset
                        </DropdownItem>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <NavbarText>
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