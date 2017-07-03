/**
 * Page View Component
 *
 * @author Tobias Høegh <tobias@tujo.no>
 */

//load classes and components
import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Store from './../classes/PagesStore';
import RelatedTitles from './../components/RelatedTitles';

@observer
class PageView extends Component {
    render() {
        return (
            <div className="pg-page">
                {Store.current &&
                    <h1>
                        {Store.current.title}
                    </h1>}
                {Store.current &&
                    <RelatedTitles related={Store.current.related} />}
            </div>
        );
    }
}

export default PageView;
