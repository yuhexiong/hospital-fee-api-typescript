// index.ts
// data
import { AppDataSource } from "./data-source";
import { Fee } from "./entity/Fee";
import { Nation } from "./entity/Nation";
import { Patient } from "./entity/Patient";

//express
import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { ApiRouter } from './routes/api-routes';
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname+'/.env' });

export async function initDB() {

  await AppDataSource.initialize();
  // insert Fee Table
  await AppDataSource
  .createQueryBuilder()
  .insert()
  .into(Fee)
  .values([
      { id: 1, fee: 150, startAge: 3, endAge: 70 },
      { id: 2, fee: 50, startAge: 71, endAge: 80 },
      { id: 3, fee: 50, startAge: 0, endAge: 2 },
      { id: 4, fee: 0, startAge: 81, endAge: 999 },
  ])
  .execute();

  // insert patient from taiwan
  const patient1 = new Patient();
  patient1.id = 1;
  patient1.name = "王小明";
  patient1.birth = "0570415";
  patient1.gender = "Male";
  await AppDataSource.manager.save(patient1);

  const patient2 = new Patient();
  patient2.id = 2;
  patient2.name = "李小美";
  patient2.birth = "1000801";
  patient2.gender = "Female";
  await AppDataSource.manager.save(patient2);

  const patient3 = new Patient();
  patient3.id = 3;
  patient3.name = "莊小云";
  patient3.birth = "0771003";
  patient3.gender = "Female";
  await AppDataSource.manager.save(patient3);

  const nation1 = new Nation();
  nation1.id = 1;
  nation1.country = "台灣";
  nation1.patient = [patient1, patient2, patient3];
  await AppDataSource.manager.save(nation1);

  // insert patient from japan
  const patient4 = new Patient();
  patient4.id = 4;
  patient4.name = "許小信";
  patient4.birth = "1101201";
  patient4.gender = "Male";
  await AppDataSource.manager.save(patient4);

  const nation2 = new Nation();
  nation2.id = 2;
  nation2.country = "日本";
  nation2.patient = [patient4];
  await AppDataSource.manager.save(nation2);

  // insert patient from usa
  const patient5 = new Patient();
  patient5.id = 5;
  patient5.name = "陳小天";
  patient5.birth = "0381208";
  patient5.gender = "Male";
  await AppDataSource.manager.save(patient5);

  const nation3 = new Nation();
  nation3.id = 3;
  nation3.country = "美國";
  nation3.patient = [patient5];
  await AppDataSource.manager.save(nation3);
}

const port = process.env.PORT || 8080;
const swaggerDocument = YAML.load('./docs/swagger.yaml');
const app: Express = express();
app.use(express.json());

const apiRouter = new ApiRouter;
app.use('', apiRouter.router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function start() {
  await initDB();
  app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
  });
}
if (process.env.NODE_ENV === 'production') {
  start();
}

export default app;