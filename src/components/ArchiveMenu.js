import React from 'react';
import DropdownItem from "react-bootstrap/DropdownItem";
import {DropdownButton, Nav} from "react-bootstrap";

const ArchiveMenu = () => {
    return (
        <Nav className="ml-auto" style={{color: 'white'}}>
        <DropdownButton title="Архив" className="ml-2" variant={"outline-light"} style={{zIndex:100}}>
            <DropdownItem href={"/authors"}>
                Авторы
            </DropdownItem>
            <DropdownItem href={"/publication"}>
                Публикации
            </DropdownItem >
            <DropdownItem href={"/themes"}>
                Темы
            </DropdownItem>
            <DropdownItem href={"/regions"}>
                Регионы
            </DropdownItem>
        </DropdownButton>
        </Nav>
    );
};

export default ArchiveMenu;