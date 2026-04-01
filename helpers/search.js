module.exports = (query) => {
    let objSearch = {
        keyword: ""
    };

    // Support both `q` (used by frontend) and `keyword` (legacy)
    const value = query.q ?? query.keyword;

    if (value) {
        objSearch.keyword = value;
        objSearch.regex = new RegExp(value, "i");
    }

    return objSearch;
}