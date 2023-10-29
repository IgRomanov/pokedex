import { makeAutoObservable, toJS } from "mobx";

class PageStore {
    constructor() {
        this._currentPage = 1;
        this._offset = 0;
        this._limit = 20;
        makeAutoObservable(this)
    };

    setPage(page) {
        this._currentPage = page;
        this._offset = (page - 1) * this._limit;
    };

    get currentPage() {
        return toJS(this._currentPage);
    };

    get currentOffset() {
        return toJS(this._offset);
    }

    get currentLimit() {
        return toJS(this._limit);
    }
};

export default new PageStore();