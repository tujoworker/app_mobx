/**
 * App logic
 *
 * @author Tobias Høegh <tobias@tujo.no>
 */

import { observable, computed, action } from 'mobx';

class Page {
    // id = Math.random();
    @observable title;
    @observable finished = false;
    constructor(obj) {
        if (!obj.data) return;
        // console.log(obj.data);
        this.title = obj.data.title;
        this.related = obj.metadata.related;
    }
}

class PagesStore {
    @observable nr = 0;
    @observable current = null;
    @observable contentStack = [];

    // @computed
    // get getTotalPages() {
    //     return this.contentStack.length;
    // }

    @computed
    get isOnStart() {
        return this.nr <= 0;
    }

    @computed
    get isOnEnd() {
        return this.nr >= this.contentStack.length - 1;
    }

    @action
    goToPage(nr) {
        if (nr < 0) {
            nr = 0;
        }
        if (nr > this.contentStack.length - 1) {
            nr = this.contentStack.length - 1;
        }
        return (this.current = this.contentStack[(this.nr = nr)]);
    }
}

export { Page };
export default new PagesStore();
