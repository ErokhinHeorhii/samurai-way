export const requiredField = (value) => {
    if (!!value) return
    return "Field is required"
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined
}
export const validateEmail = (values) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
        return 'Invalid email address'
    }
}
