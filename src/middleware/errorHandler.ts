import { ErrorRequestHandler, Request, Response, NextFunction } from "express";


interface CustomError extends Error {
    statusCode?: number;
    message: string;
}

const errorHandler: ErrorRequestHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  };

  export default errorHandler;