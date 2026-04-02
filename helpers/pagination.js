module.exports = (query = {}, totalCount = 0, opts = {}) => {
    const limitDefault = opts.limitDefault || 4;
    const windowSize = opts.windowSize || 5;

    let currentPage = 1;
    if (query.page) {
        const p = parseInt(query.page);
        if (!isNaN(p) && p > 0) currentPage = p;
    }

    let limitItem = limitDefault;
    if (query.limit) {
        const l = parseInt(query.limit);
        if (!isNaN(l) && l > 0) limitItem = l;
    }

    const totalPage = Math.max(1, Math.ceil(totalCount / limitItem));
    if (currentPage > totalPage) currentPage = totalPage;

    const skip = (currentPage - 1) * limitItem;

    // Build pages window
    let start = Math.max(1, currentPage - Math.floor(windowSize / 2));
    let end = Math.min(totalPage, start + windowSize - 1);
    if (end - start + 1 < windowSize) {
        start = Math.max(1, end - windowSize + 1);
    }
    const pages = [];
    for (let i = start; i <= end; i++) pages.push(i);

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPage;

    // Build baseQuery (preserve other query params)
    const queryObj = { ...query };
    delete queryObj.page;
    const baseQuery = new URLSearchParams(queryObj).toString();

    return {
        currentPage,
        limitItem,
        skip,
        totalPage,
        pages,
        hasPrev,
        hasNext,
        prevPage: hasPrev ? currentPage - 1 : null,
        nextPage: hasNext ? currentPage + 1 : null,
        firstPage: 1,
        lastPage: totalPage,
        baseQuery
    };
};
