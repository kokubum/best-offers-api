import { EntityRepository, Repository } from "typeorm";
import { Stablishment } from "../models";


@EntityRepository(Stablishment)
export class StablishmentRepository extends Repository<Stablishment> {

  async findByName(stablishmentName:string):Promise<Stablishment | undefined> {
    return this.findOne({name: stablishmentName});
  }
}