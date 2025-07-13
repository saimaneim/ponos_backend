import { UserModel } from "@/schemas/user";

export async function validateCredentials(email: string, password: string) {
  const user = await UserModel.findEmail( email, "email");
  if (!user) throw new Error("NOT_FOUND");

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) throw new Error("INVALID_PASSWORD");

  return user;
}
