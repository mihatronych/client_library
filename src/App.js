import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import StickyFooter from "./components/StickyFooter";
import {observer} from "mobx-react-lite";
import {check} from "./http/user_api";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            check().then(data => {
                user.setUser(data)
                user.setIsAuth(true)
            }).finally(() => setLoading(false))
        }, 500) //это имитация запроса потом setTimeout можно удалить
    }, [])
    if (loading) {
        return <Spinner animation={"grow"}/>
    }
  return (
      <BrowserRouter>
          <NavBar/>
        <AppRouter />
          <StickyFooter/>
      </BrowserRouter>
  );
});

export default App;
