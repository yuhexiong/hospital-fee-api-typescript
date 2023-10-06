import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// header of table
@Entity()
export class Fee {

    @PrimaryGeneratedColumn({ name: "id", comment: "流水號", })
    id: number;

    @Column({ name: "fee", comment: "掛號費", })
    fee: number

    @Column({ name: "startAge", comment: "年齡起始(>=)", })
    startAge: number

    @Column({ name: "endAge", comment: "年齡截止(<=)", })
    endAge: number

}
