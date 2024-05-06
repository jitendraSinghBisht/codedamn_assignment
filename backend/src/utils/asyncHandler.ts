import { RequestHandler, Request, Response, NextFunction } from 'express';

const asyncHandler = <T extends RequestHandler>(requestHandler: T): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export { asyncHandler };