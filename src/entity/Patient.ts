import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, RelationId} from "typeorm"
import { Nation } from "./Nation"

// header of table
@Entity()
export class Patient {

    @PrimaryGeneratedColumn({ name: "id", comment: "病患編號"}, )
    id: number;

    @Column("varchar", { name: "name", comment: "名稱", length: 20, })
    name: string

    @Column("varchar", { name: "birth", comment: "生日", length: 20, })
    birth: string

    @Column("varchar", { name: "gender", comment: "性別", length: 20, })
    gender: string

    @ManyToOne(() => Nation, (nation) => nation.id)
    nation: Nation

}
