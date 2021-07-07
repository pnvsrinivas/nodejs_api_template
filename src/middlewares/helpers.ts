import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const error404 = (req: Request, res: Response, next: NextFunction) => {
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
        //   res.render('404', { url: req.url });
        // res.sendFile(path.resolve(APP_PATH, '404.htm'));
        res.send("Not found!!")
        return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.json({ error: 'Not found!!' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found!!');
};

const sendErrorDev = (err: any, res: Response) => {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
};
  
const sendErrorProd = (err: any, res: Response) => {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
};

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.error("Global error handling");
    console.log(err.stack);
    if (process.env.NODE_ENV === 'production') {
      sendErrorProd(err, res);
    } else {
      sendErrorDev(err, res);
    }
};

export {
  error404,
  errorHandler
};