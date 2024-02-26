import bodyParser from 'body-parser';
import express from 'express';
import controllers from './contexts/index.controller';
import authMiddleware from './middleware/auth.middleware';

const app = express();
const PORT = 5050;
const jsonParser = bodyParser.json();

app.use(authMiddleware);
app.use(jsonParser);
app.use(controllers);

app.listen(PORT, () => {
  console.log(`서버 실행 / port: ${PORT}`);
});
