import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { HashPass } from "@/app/lib/hashPass";

export const UserService = {
  async create(data: Prisma.UserCreateInput) {
    // Hash the temp password for the new user
    data.password = await HashPass({
      password: data.password,
    });
    return await prisma.user.create({ data });
  },
};
