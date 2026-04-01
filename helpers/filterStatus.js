module.exports = (query) => {
    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: "active"
        },
        {
            name: "Còn hàng",
            status: "active",
            class: ""
        },
        {
            name: "Dừng kinh doanh",
            status: "inactive",
            class: ""
        }
    ]; 

    // Update the active class based on the current status filter in the query parameters
    if (query.status) {
        // If a status filter is applied, set the corresponding item as active
        const index = filterStatus.findIndex(item => item.status === query.status);
        filterStatus[index].class = "active";
    } else {
        // If no status filter is applied, set "Tất cả" as active
        const index = filterStatus.findIndex(item => item.status === "");
        filterStatus[index].class = "active";
    }
    
    return filterStatus;
}