import { makeAutoObservable, toJS } from "mobx";

class PageStore {
    constructor() {
        this._currentPage = 1;
        this._offset = 0;
        this._limit = 20;
        this._previousUrl = '';
        this._nextUrl = '';
        makeAutoObservable(this)
    };

    setLimit(limit) {
        this._limit = limit;
    };

    setPage(page) {
        this._currentPage = page;
        this._offset = (page - 1) * this._limit;
    };

    setPreviousUrl(url) {
        this._previousUrl = url;
    };

    setNextUrl(url) {
        this._nextUrl = url;
    };

    get previousUrl() {
        return toJS(this._previousUrl);
    };

    get nextUrl() {
        return toJS(this._nextUrl);
    };

    get currentPage() {
        return toJS(this._currentPage);
    };

    get currentOffset() {
        return toJS(this._offset);
    };

    get currentLimit() {
        return toJS(this._limit);
    };
};

export default new PageStore();