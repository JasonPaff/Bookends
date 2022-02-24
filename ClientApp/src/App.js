import React from 'react';
import {Route} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import './custom.css'
import GoogleKeywordSearch from "./components/Search/GoogleKeywordSearch";
import Register from "./components/Accounts/Register";
import Login from "./components/Accounts/Login";

export function App() {
    return (
        <Layout>
            <Route exact path='/' component={Home}/>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route path='/search' component={GoogleKeywordSearch}/>
        </Layout>
    );
}
