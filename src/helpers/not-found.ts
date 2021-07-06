import { Request, Response, NextFunction } from 'express';

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

export {
  error404,
};