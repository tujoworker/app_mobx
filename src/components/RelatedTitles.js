/**
 * Related Titles Component
 *
 * @author Tobias Høegh <tobias@tujo.no>
 */

//load classes and components
import React, { Component } from 'react';

//simply map through "related" titles
class RelatedTitles extends Component {
    render() {

        //related has to be an array with strings inside
        if (!this.props.related || this.props.related.length === 0) {
            return (
                <div className="pg-noting-related">
                    <p>
                        {'No related titles'}
                    </p>
                </div>
            );
        }

        return (
            <div className="pg-related-titles">
                <h2>{"Related Movies"}</h2>
                <ul>
                    {this.props.related.map((title, i) => {
                        return (
                            <li key={'rid' + i} className="pg-related-title">
                                <p>
                                    {title}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default RelatedTitles;
