import { prisma } from "@/app/lib/prisma";

export const ProductService = {
  async create(data: any) {
    return prisma.product.create({ data });
  },

  async findAll() {
    return prisma.product.findMany();
  },

  async findById(id: number) {
    return prisma.product.findUnique({
      where: { id },
    });
  },

  async update(id: number, data: any) {
    return prisma.product.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.product.delete({
      where: { id },
    });
  },
};
