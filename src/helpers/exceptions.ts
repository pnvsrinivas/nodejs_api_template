class AppError extends Error {
    status: string;
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number = 500) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends AppError {
    constructor(message: string, statusCode: number = 422) {
        super(message, statusCode);
    }
}

class NotFoundError extends AppError {
    constructor(message: string, statusCode: number = 404) {
        super(message, statusCode);
    }
}

export {
    AppError,
    NotFoundError,
    ValidationError
};