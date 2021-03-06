import { app } from './App';

const port = process.env.PORT || 3366;

app.listen(port, (err: Error) => {
  if (err) {
    return console.log(err);
  }

  return console.log(`server is listening on port ${port}`);
});
