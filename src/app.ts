import express, { Application, Request, Response } from 'express';

const app: Application = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Working successfully');
});

app.listen(3000, () => console.log('> Running on http://localhost:3000'));
