// Create a custom error handling class
class CustomError extends Error {
    constructor(status, success, message) {
        super();
        this.status = status;
        this.success = success;
        this.message = message;
    }
}

export default CustomError;