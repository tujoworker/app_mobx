/**
 * Toolbar View Component
 *
 * @author Tobias Høegh <tobias@tujo.no>
 */

//load classes and components
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import Store from './../classes/PagesStore';

import arrowLeft from './../assets/arrow-left-gfx.svg';
import arrowRight from './../assets/arrow-right-gfx.svg';

@observer
class Toolbar extends Component {
    state = { 'pressed-left': false, 'pressed-right': false };
    next() {
        Store.goToPage((Store.nr += 1));
        this.setState({ 'pressed-right': true });
        setTimeout(() => this.setState({ 'pressed-right': false }), 300);
    }
    previous() {
        Store.goToPage((Store.nr -= 1));
        this.setState({ 'pressed-left': true });
        setTimeout(() => this.setState({ 'pressed-left': false }), 300);
    }
    render() {
        return (
            <div className="pg-toolbar">
                <span className="pg-toolbar-view">
                    <button
                        className={classNames(
                            'pg-toolbar-arrow',
                            'arrow-left',
                            {
                                pressed: this.state['pressed-left']
                            }
                        )}
                        onClick={this.previous.bind(this)}
                        disabled={Store.isOnStart}
                    >
                        <img src={arrowLeft} alt="Arrow Prev" />
                    </button>
                    <button
                        className={classNames(
                            'pg-toolbar-arrow',
                            'arrow-right',
                            {
                                pressed: this.state['pressed-right']
                            }
                        )}
                        onClick={this.next.bind(this)}
                        disabled={Store.isOnEnd}
                    >
                        <img src={arrowRight} alt="Arrow Next" />
                    </button>
                </span>
                {Store.current &&
                    <span className="pg-toolbar-info">
                        Page <b>{Store.nr + 1}</b> of{' '}
                        <b>{Store.contentStack.length}</b>
                    </span>}
            </div>
        );
    }
}

export default Toolbar;
