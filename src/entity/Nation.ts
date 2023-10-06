import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Patient } from "./Patient"

// header of table
@Entity()
export class Nation {

    // @OneToMany(type => Patient, patient => patient.nationId) 
    // id: number;

    @PrimaryGeneratedColumn({ name: "id", comment: "流水號"}, )
    id: number;

    @Column("varchar", { name: "country", comment: "國籍名稱", length: 20, })
    country: string

    @OneToMany(() => Patient, (patient) => patient.nation)
    patient: Patient[]
}
