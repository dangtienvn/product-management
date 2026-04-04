// Change Status of product
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            const statusChange = statusCurrent === "active" ? "inactive" : "active";
            // console.log(statusCurrent);
            // console.log(id);
            // console.log(statusChange);
            
            const action = path + `${statusChange}/${id}`;
            formChangeStatus.action = action;
            // ensure hidden _method exists (method-override)
            let methodInput = formChangeStatus.querySelector("input[name='_method']");
            if (!methodInput) {
                methodInput = document.createElement('input');
                methodInput.type = 'hidden';
                methodInput.name = '_method';
                formChangeStatus.appendChild(methodInput);
            }
            methodInput.value = 'PATCH';
            formChangeStatus.submit();  
            console.log(action);                     
        });
    });
}


