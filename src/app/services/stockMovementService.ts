import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export const StockMovementService = {
  async create(data: Prisma.StockMovementCreateInput) {
    const { productId, type, quantity } = data;

    return prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new Error("Produto não encontrado.");
      }

      if (type === "out" && product.quantity < quantity) {
        throw new Error("Quantidade insuficiente em estoque.");
      }

      const movement = await tx.stockMovement.create({ data });

      await tx.product.update({
        where: { id: productId },
        data: {
          quantity: {
            ...(type === "in"
              ? { increment: quantity }
              : { decrement: quantity }),
          },
        },
      });

      return movement;
    });
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

  async update(id: number, data: Prisma.StockMovementUpdateInput) {
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
