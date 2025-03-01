const init = () => {
    const formData = {
        email: "",
        message: "",
    };

    // Check and fill data
    fillForm(formData);

    const htmlForm = document.querySelector(".feedback-form");
    htmlForm.addEventListener("input", event => inputHandler(event, formData));
    htmlForm.addEventListener("submit", event => formHandler(event, formData));
}

const formHandler = (e, formData) => {
    e.preventDefault()
    const emptyFields = Object.values(formData).filter(el => !el)
    if (emptyFields.length) {
        alert("Fill please all fields")
        return
    }
    console.log(formData);
    localStorage.clear();
    clearFormData(formData)
    e.currentTarget.reset()
}

const clearFormData = (formData) => {
    Object.keys(formData).forEach(key => formData[key] = "")
}

const inputHandler = (e, formData) => {
    formData[e.target.name] = e.target.value;
    save("feedback-form-state", formData);
}

const fillForm = (formData) => {
    const formDataLS = load("feedback-form-state");
    if (!formDataLS) {
        return;
    }

    Object.keys(formDataLS).forEach(key => {
        const htmlElement = document.querySelector(`[name=${key}]`)
        htmlElement.value = formDataLS[key];
        formData[key] = formDataLS[key]; 
    })

    formData = formDataLS
    console.log(formData);
    
}

const save = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

const load = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        console.log(error);
        return false;
    }
}

document.addEventListener("DOMContentLoaded", init);