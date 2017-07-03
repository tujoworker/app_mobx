/**
 * Status components
 *
 * @author Tobias Høegh <tobias@tujo.no>
 */

import React, { Component } from 'react';

export class LoadingView extends Component {
    render() {
        return (
            <div className="pg-status-message loading">
                <p>
                    {this.props.text}
                </p>
            </div>
        );
    }
}

export class ErrorView extends Component {
    render() {
        return (
            <div className="pg-status-message error">
                <p>
                    {this.props.text}
                </p>
            </div>
        );
    }
}
