// controllers/api-controllers.ts
import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import { AppDataSource } from "../data-source";
import { Fee } from "../entity/Fee";
import { Patient } from "../entity/Patient";

function birthToAge(birthday: string, systemDate: string): number {
    const ADyear = (Number(birthday.substring(0, 3)) + 1911).toString();
    const start = moment(ADyear+birthday.substring(3, ));
    var end = moment(systemDate);
    const age = end.diff(start, 'years', false);
    return age;
};

async function ageToFee(age: number): Promise<number>{
  const fee = await AppDataSource.getRepository(Fee)
    .createQueryBuilder("fee")
    .where("fee.startAge <= :age AND fee.endAge >= :age", { age: age })
    .getOne();
  return fee.fee;
}

export class ApiControllers {
  async getFeePage(request: Request, response: Response, next: NextFunction) {
    const birthday: string | undefined = <string>request.query.birthday;
    const systemDate: string | undefined = <string>request.query.systemDate;
    const age = birthToAge(birthday, systemDate);
    const fee = await ageToFee(age);
    response.send({'amount': fee});
  }

  async getPatientPage(request: Request, response: Response, next: NextFunction) {
    const patientId: number | undefined = request.body?.patientId;
    const systemDate: string | undefined =  request.body?.systemDate;

    const patientInfo = await AppDataSource.getRepository(Patient)
      .createQueryBuilder("patient")
      .innerJoinAndSelect("patient.nation", "nation")
      .where("patient.id = :id", { id: patientId })
      .getOne();

    let result = {};
    result['patient'] = patientInfo;
    result['patient']['gender'] = (result['patient']['gender'] === 'Male') ? '男':'女';
    const age = birthToAge(patientInfo.birth, systemDate);
    result['patient']['age'] = age;
    result['patient']['nationality'] = patientInfo.nation.country;
    delete result['patient']['nation'];
    const fee = await ageToFee(age);
    result['amount'] = fee;

    response.send(result);
  }
}