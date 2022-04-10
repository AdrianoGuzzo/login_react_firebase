import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/Login";
import Main from "./Main/Main";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample({ db }) {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/cadastro">
                    <Register db={db} />
                </Route>
                <Route path="/principal/:id">
                    <Main db={db} />
                </Route>
            </Switch>
        </Router>
    );
}