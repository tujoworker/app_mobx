/**
 * App logic
 *
 * @author Tobias Høegh <tobias@tujo.no>
 */

//load classes and components
import React, { Component } from 'react';

import { observer } from 'mobx-react';

import Store, { Page } from './classes/PagesStore';
import PageView from './components/PageView';
import Toolbar from './components/Toolbar';
import { LoadingView, ErrorView } from './components/StatusViews';

import './css/app.scss';
import Config from './config';

//run the main app logic with @observer to make sure the mobx is working
//1. first show a stats by using {this.state.statesView}
//2. then Fetch runs in componentDidMount
//3. the data will be added to the store.
//4. once the store gets data the components PageView and Toolbar will automaticly update its content
@observer
class App extends Component {
    constructor(props) {
        super(props);
        //once the user visits the page, show this first
        this.state = { statesView: <LoadingView text="Loading data ..." /> };
    }

    componentDidMount() {
        return (
            fetch(Config.APIURL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })
                .then(response => response.json())
                .then(this.onSuccess.bind(this))
                .catch(this.onError.bind(this))
        );
    }

    onSuccess(data) {
        try {
            this.setState({
                statesView: <div />
            });
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
