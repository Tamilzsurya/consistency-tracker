
export const validateEachInputField = (id, value) => {

    if(!value){
        return "This field is required"
    }

    return ""
}

export const habitFormValidation = (formData) => {

    const error = {}

    // validate name field
    const nameError = validateEachInputField("name", formData.name)

    if(nameError){
        error.name = nameError
    }

    // validate category field
    const categoryError = validateEachInputField("category", formData.category)

    if(categoryError){
        error.category = categoryError
    }

    return error

}