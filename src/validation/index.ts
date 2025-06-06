export const productInputValidation = (
    product: {
        title: string, 
        description: string, 
        imageURL: string, 
        price: string,
    }) => {
    const errors = {
        title: '',
        description: '', 
        imageURL: '', 
        price: '', 
    }

    const validateURL = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

    if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = 'The Product Title characters should be more than 10 && less than 80!';
    }
    if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
        errors.description = 'The Product Description characters should be more than 10 && less than 900!';
    }
    if (!product.imageURL.trim() || !validateURL) {
        errors.imageURL = 'Image URL not Valid!';
    }
    if (!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = 'Price is Not Valid!';
    }

    return errors;
}


export const validationColors = (product: {colors: string[]}) => {
    const errorColors = {
        colors: '',
    }

    if (product.colors.length === 0) {
        errorColors.colors = 'Pick a Color, Please!';
    }
    return errorColors;
} 