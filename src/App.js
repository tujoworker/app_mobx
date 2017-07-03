/**
 * App logic
 *
 * @author Tobias Høegh <tobias@tujo.no>
 */

//load classes and components
import React, { Component } from 'react';
import Fetch from 'react-fetch';

import { observer } from 'mobx-react';

import Store, { Page } from './classes/PagesStore';
import PageView from './components/PageView';
import Toolbar from './components/Toolbar';
import { LoadingView, ErrorView } from './components/StatusViews';

import './css/app.scss';
import Config from './config';

//run the main app logic with @observer to make sure the mobx is working
//1. first show a stats by using {this.state.statesView}
//2. then the app runs Fetch and gets tha data from the API
//3. the data will be added to the store.
//4. once the store gets data the components PageView and Toolbar will automaticly update its content
@observer
class App extends Component {
    constructor(props) {
        super(props);
        //once the user visits the page, show this first
        this.state = { statesView: <LoadingView text="Loading data ..." /> };
    }

    onSuccess(data) {
        try {
            // console.log(data);
            this.setState({
                statesView: <div />
            });
            // this.rows = [];
            Object.keys(data).forEach(k => {
                if (!Number.isInteger(parseFloat(k))) {
                    return;
                }
                Store.contentStack.push(new Page(data[k]));
            });
            Store.goToPage(Store.nr);
        } catch (e) {
            this.setState({
                statesView: <ErrorView text={e.message} />
            });
        }
    }

    onError(error) {
        this.setState({
            statesView: <ErrorView text={error.message} />
        });
    }

    render() {
        return (
            <div>
                {this.state.statesView}
                <Fetch
                    url={Config.APIURL}
                    onSuccess={this.onSuccess.bind(this)}
                    onError={this.onError.bind(this)}
                />
                <div className="pg-app">
                    <div className="pg-app-inner">
                        {Store.current && <Toolbar />}
                        {Store.current && <PageView />}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
