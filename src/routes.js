import Main from "./pages/Main";
import {
    ADD_MARK_ROUTE,
    ADD_PUBLICATION_ROUTE,
    AUTHORS_ROUTE, GRAPHS_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE, MARKS_ROUTE,
    PUBLICATION_ROUTE, REGIONS_ROUTE,
    REGISTRATION_ROUTE,
    THEMES_ROUTE, UPDATE_PUBLICATION_ROUTE,
} from "./utils/consts";
import Auth from "./pages/Auth";
import Publication from "./pages/Publication";
import Authors from "./pages/Authors";
import Themes from "./pages/Themes";
import Regions from "./pages/Regions";
import Publications from "./pages/Publications";
import AddPublication from "./pages/AddPublication";
import UpdatePublication from "./pages/UpdatePublication";
import Marks from "./pages/Marks";
import AddMark from "./pages/AddMark";
import Graphs from "./pages/Graphs";

// ТОЛЬКО АВТОРИЗОВАННЫЕ
export const authRoutes = [

]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PUBLICATION_ROUTE + '/:id',
        Component: Publication
    },
    {
        path: PUBLICATION_ROUTE,
        Component: Publications
    },
    {
        path: AUTHORS_ROUTE,
        Component: Authors
    },
    {
        path: THEMES_ROUTE,
        Component: Themes
    },
    {
        path: REGIONS_ROUTE,
        Component: Regions
    },
    {
        path: ADD_PUBLICATION_ROUTE,
        Component: AddPublication
    },
    {
        path: UPDATE_PUBLICATION_ROUTE + '/:id',
        Component: UpdatePublication
    },
    {
        path: MARKS_ROUTE+ '/:id',
        Component: Marks
    },
    {
        path: ADD_MARK_ROUTE+ '/:id',
        Component: AddMark
    },
    {
        path: GRAPHS_ROUTE,
        Component: Graphs
    }
]