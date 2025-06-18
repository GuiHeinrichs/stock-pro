import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { subDays, startOfDay, format } from "date-fns";

export async function GET() {
  try {
    const products = await prisma.product.findMany({ include: { Category: true } });
    const totalStock = products.reduce((acc, p) => acc + p.quantity, 0);
    const totalStockValue = products.reduce(
      (acc, p) => acc + p.sellingPrice * p.quantity,
      0
    );
    const criticalStock = await prisma.product.count({ where: { quantity: { lt: 5 } } });

    const startDate = startOfDay(subDays(new Date(), 6));
    const movements = await prisma.stockMovement.findMany({
      where: { date: { gte: startDate } },
      include: { Product: true },
    });

    const recentMovements = movements
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5)
      .map((m) => ({
        product: m.Product.name,
        type: m.type === "in" ? "Entrada" : "Saída",
        quantity: m.quantity,
        date: format(m.date, "yyyy-MM-dd HH:mm"),
      }));

    const weekDays: string[] = [];
    for (let i = 6; i >= 0; i--) {
      weekDays.push(format(subDays(new Date(), i), "EEE"));
    }

    const weeklyMap: Record<string, { entradas: number; saidas: number }> = {};
    weekDays.forEach((day) => {
      weeklyMap[day] = { entradas: 0, saidas: 0 };
    });

    movements.forEach((m) => {
      const key = format(m.date, "EEE");
      if (m.type === "in") weeklyMap[key].entradas += m.quantity;
      else weeklyMap[key].saidas += m.quantity;
    });

    const weeklyData = weekDays.map((day) => ({
      day,
      ...weeklyMap[day],
    }));

    const productMovMap: Record<string, number> = {};
    movements.forEach((m) => {
      const name = m.Product.name;
      productMovMap[name] = (productMovMap[name] || 0) + m.quantity;
    });
    const topProducts = Object.entries(productMovMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name, movimentado]) => ({ name, movimentado }));

    const categoryMap: Record<string, number> = {};
    products.forEach((p) => {
      const title = p.Category?.title || "Sem Categoria";
      categoryMap[title] = (categoryMap[title] || 0) + p.quantity;
    });
    const categoriasEstoque = Object.entries(categoryMap).map(([categoria, valor]) => ({
      categoria,
      valor,
    }));

    const estoqueHistorico: { day: string; estoque: number }[] = [];
    let stock = totalStock;
    for (let i = weekDays.length - 1; i >= 0; i--) {
      const day = weekDays[i];
      estoqueHistorico.unshift({ day, estoque: stock });
      stock -= weeklyMap[day].entradas - weeklyMap[day].saidas;
    }

    return NextResponse.json({
      totalStock,
      recentEntries: weeklyData.reduce((s, d) => s + d.entradas, 0),
      recentExits: weeklyData.reduce((s, d) => s + d.saidas, 0),
      criticalStock,
      totalStockValue,
      weeklyData,
      evolucaoMovimentacoes: weeklyData,
      topProducts,
      categoriasEstoque,
      recentMovements,
      estoqueHistorico,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao obter dados do dashboard." },
      { status: 500 }
    );
  }
}
