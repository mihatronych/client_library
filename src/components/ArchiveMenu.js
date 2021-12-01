import React from 'react';
import DropdownItem from "react-bootstrap/DropdownItem";
import {DropdownButton, Nav} from "react-bootstrap";

const ArchiveMenu = () => {
    return (
        <Nav className="ml-auto" style={{color: 'white'}}>
        <DropdownButton id={"archive_menu_dpb"} title="Архив" className="ml-2" variant={"outline-light"} style={{zIndex:100}}>
            <DropdownItem href={"/authors"} id={"archive_menu_authors"} style={{minWidth:"250px"}}>
                Авторы
            </DropdownItem>
            <DropdownItem href={"/publication"} id={"archive_menu_publications"}>
                Публикации
            </DropdownItem >
            <DropdownItem href={"/themes"} id={"archive_menu_themes"}>
                Темы
            </DropdownItem>
            <DropdownItem href={"/regions"} id={"archive_menu_regions"}>
                Регионы
            </DropdownItem>
        </DropdownButton>
        </Nav>
    );
};

export default ArchiveMenu;