import { prisma } from "@/app/lib/prisma";

export const StockMovementService = {
  async create(data: any) {
    return prisma.stockMovement.create({ data });
  },

  async findAll() {
    return prisma.stockMovement.findMany({
      include: {
        Product: true,
      },
    });
  },

  async findById(id: number) {
    return prisma.stockMovement.findUnique({
      where: { id },
    });
  },

  async update(id: number, data: any) {
    return prisma.stockMovement.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.stockMovement.delete({
      where: { id },
    });
  },
};
