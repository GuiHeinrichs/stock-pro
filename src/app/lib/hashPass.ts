import bcrypt from "bcryptjs";

export const HashPass = async ({
  password,
}: {
  password: string;
}): Promise<string> => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export default HashPass;
