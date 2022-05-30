import React from "react";
import { Route, Switch } from "react-router-dom";
import Actor from "../actors/Actor";
import Movie from "../movies/Movie";
import Movies from "../movies/Movies";

const Home = () => {
    return (
        <h3>    </h3>
    );
};
const NoMatchPage = () => {
    return (
        <h3>404 - Not found</h3>
    );
};

const AppRoutes = () =>
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/actor" exact component={Actor} />
        <Route path="/movie" exact component={Movie} />
        <Route path="/movies" exact component={Movies} />
        <Route component={NoMatchPage} />
    </Switch>

export default AppRoutes;
