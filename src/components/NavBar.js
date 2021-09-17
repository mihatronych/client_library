import React, {useContext, useState} from 'react';
import {Context} from "../index";
import  {Button, Navbar, Container} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import ArchiveMenu from "./ArchiveMenu";
import LanguageMenu from "./LanguageMenu";
import AdditionalMenu from "./AdditionalMenu";
import "../styles.css"
import Search from "./Search";
import {Grid} from "@material-ui/core";

const phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}



const NavBar = observer(() => {
    const {user, publication} = useContext(Context)
    const history = useHistory()


    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem("token");
    }

    const filterPosts = (posts, query) => {
        if (!query) {
            return posts;
        }

        return posts.filter((post) => {
            const postName = post.title;
            return postName.includes(query);
        });
    };

    const { search } = window.location;
    const query = new URLSearchParams(search).get('s');
    const [searchQuery, setSearchQuery] = useState(query || '');
    const filteredPosts = filterPosts(publication.publications, searchQuery);


    return (
        <div>
        <Navbar variant="dark" className="mb-3" style={{backgroundColor:'#C06C84', position:'fixed', zIndex:'3', height: "60px", width: "100%",}}>
            <Container className="d-flex">
                <div className="ico"/>
            <NavLink style={{color:'white'}} to={MAIN_ROUTE}>Главная</NavLink>
                <ArchiveMenu className='col-sm-1'/>
                <LanguageMenu className='col-sm-2'/>
                <AdditionalMenu/>
                <div className="ml-1 dropdown">
                    <div className="dropbtn">
                    <Search
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                    </div>
                            <div className="dropdown-content"  style={{maxHeight:"150px", overflowY:' scroll'}}>
                                {filteredPosts.map(post => (
                                    <a key={post.key} href={"/publication/"+post.id}>{post.title}</a>
                                ))}
                            </div>
                </div>
            {user.isAuth ?
                <Nav className="ml-auto" style={{color: 'white'}}>
                    <Grid variant={"outline-light"} style={{margin: 3}}>Пользователь: {user.user.name} </Grid>
                    <Button variant={"outline-light"} onClick={() => logOut()}>Выйти</Button>
                </Nav> :
                <Nav className="ml-auto" style={{color: 'white'}}>
                    <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
            }
            </Container>
        </Navbar>
            <div style={phantom} />
        </div>
    );
});

export default NavBar;