import { UserModel } from "@/schemas/user";

export async function createUser(fields: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  return await UserModel.create({
    email: fields.email,
    password: fields.password,
    firstName: fields.firstName,
    lastName: fields.lastName,
  });
}
