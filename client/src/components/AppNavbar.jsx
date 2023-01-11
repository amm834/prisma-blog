import React from 'react';
import {Navbar, Dropdown, Avatar} from "flowbite-react";
import {Link} from "react-router-dom";

const AppNavbar = () => {
    return (
        <>
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Brand>
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                              <Link to="/">Shop</Link>
    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings"
                                       img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                       rounded={true}/>}
                    >
                        <Dropdown.Header>
        <span className="block text-sm">
          Bonnie Green
        </span>
                            <span className="block truncate text-sm font-medium">
          name@flowbite.com
        </span>
                        </Dropdown.Header>
                        <Dropdown.Item>
                            Dashboard
                        </Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle/>
                </div>
                <Navbar.Collapse>
                    <Navbar.Link
                        active={true}
                    >
                        <Link to="/">Home</Link>
                    </Navbar.Link>
                    <Navbar.Link>
                        <Link to="/posts/create">Write</Link>
                    </Navbar.Link>
                    <Navbar.Link href="/#">
                        <Link to="/register">Register</Link>
                    </Navbar.Link>
                    <Navbar.Link href="/#">
                        <Link to="/login">Login</Link>
                    </Navbar.Link>

                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default AppNavbar;