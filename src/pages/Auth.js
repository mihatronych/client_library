import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button} from "react-bootstrap";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import jwt_decode from "jwt-decode";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {login, registration} from "../http/user_api";

const Auth = observer(() => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const history = useHistory()
    const {user} = useContext(Context)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const storedToken = localStorage.getItem("token");
    if (storedToken){
        let decodedData = jwt_decode(storedToken, { header: true });
        let expirationDate = decodedData.exp;
        let current_time = Date.now() / 1000;
        if(expirationDate < current_time)
        {
            localStorage.removeItem("token");
        }
    }

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
                console.log(data)

            } else {
                console.log(email, name, password)
                data = await registration(email, name, password);
            }
            if(data) {
                user.setIsAuth(true)
                user.setUser(data)
                history.push(MAIN_ROUTE)
            }
        } catch (e) {
            history.push(LOGIN_ROUTE)
            return alert(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height:window.innerHeight - 54}}
        >
            <Card style={{width: 600, backgroundColor:'#C06C84', color:'white'}} className="p-5">
                <h2 className="m-auto">{!isLogin ?  "Регистрация": "Авторизация"}</h2>
                <Form className="d-flex flex-column">
                    {!isLogin ? <Form.Control
                        className="mt-3"
                        placeholder="Введите ваше имя/псевдоним..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />: <div/> }
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        type="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Button
                        onClick={click}
                        className="d-flex mt-3 justify-content-center"
                        variant={"dark"}
                        style={{backgroundColor:"#6C5B7B", textAlign:"center"}}
                    >
                        {!isLogin ? "Зарегистрироваться": "Войти"}
                    </Button>
                    {!isLogin ?
                        <div className="align-self-center">
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                        </div>
                        :
                        <div className="align-self-center">
                        Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>
                        </div>
                    }
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;