import { Column, Entity, Index } from "typeorm";

@Index("account_pkey", ["id"], { unique: true })
@Entity("account", { schema: "public" })
export class Account {
  @Column("character varying", {
    primary: true,
    name: "id",
    length: 255,
  })
  id: string;

  @Column("character varying", {
    name: "firstName",
    nullable: true,
    length: 100,
  })
  firstName: string | null;

  @Column("character varying", {
    name: "lastName",
    nullable: true,
    length: 100,
  })
  lastName: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("character varying", { name: "phone", nullable: true, length: 16 })
  phone: string | null;

  @Column("character varying", { name: "password", nullable: true, length: 50 })
  password: string | null;

  @Column("date", { name: "birthday", nullable: true })
  birthday: string | null;

  @Column("timestamp without time zone", {
    name: "createdAt",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "lastModified",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  lastModified: Date | null;
}
