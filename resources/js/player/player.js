import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Side from './side';

import PlayerInfo from './info';
import PlayerInfoEditor from './info/edit';

import PlayerGoal from './goal';
import PlayerGoalDetail from './goal/detail';
import PlayerGoalNew from './goal/new';
import PlayerGoalEdit from './goal/edit';

import PlayerMatch from './match';
import PlayerMatchDetail from './match/detail';

import PlayerMatchPrepareNew from './match/prepare/new';
import PlayerMatchPrepareEdit from './match/prepare/edit';
import PlayerMatchResultNew from './match/result/new';
import PlayerMatchResultEdit from './match/result/edit';

import PlayerFavourite from './favourite';
import PlayerFavouriteStore from './favourite/favourite';

import Notification from '../components/notification';



export default class PlayerApp extends Component {
    render() {
        return (
        <main className="l-container meeting-consent">
            <BrowserRouter>
                <div className="l-content position-relative">
                    {/* <Notification/> */}
                    <Switch>
                        <Route exact path="/player/info" component = {PlayerInfo} />
                        <Route exact path="/player/info/edit" component = {PlayerInfoEditor} />

                        <Route exact path="/player/goal" component = {PlayerGoal} />
                        <Route exact path="/player/goal/new" component = {PlayerGoalNew} />
                        <Route exact path="/player/goal/detail/:id" component = {PlayerGoalDetail} />
                        <Route exact path="/player/goal/edit/:id" component = {PlayerGoalEdit} />

                        <Route exact path="/player/match"    component = {PlayerMatch} />
                        <Route exact path="/player/match/detail/:id" component = {PlayerMatchDetail} />
                        <Route exact path="/player/match/prepare/new" component = {PlayerMatchPrepareNew} />
                        <Route exact path="/player/match/prepare/edit/:id" component = {PlayerMatchPrepareEdit} />
                        <Route exact path="/player/match/result/new/:id"       component = {PlayerMatchResultNew} />
                        <Route exact path="/player/match/result/edit/:id" component = {PlayerMatchResultEdit} /> 

                        <Route exact path="/player/favourite" component = {PlayerFavourite} />
                        <Route exact path="/player/favourite/store" component = {PlayerFavouriteStore} />

                    </Switch>
                </div>
                <Side />
            </BrowserRouter>
        </main>
        );
    }
}