import { ProductService } from "@/app/services/productService";
import { NotificationService } from "@/app/services/notificationService";
import { prisma } from "@/app/lib/prisma";

const THRESHOLD = 5;
const INTERVAL = 1000 * 60 * 5; // 5 minutes
let started = false;

async function checkLowStock() {
  const clients = await prisma.client.findMany({ select: { idClient: true } });
  for (const client of clients) {
    const lowStock = await ProductService.findLowStock(THRESHOLD, client.idClient);
    for (const product of lowStock) {
      await NotificationService.send(
        client.idClient,
        product.id,
        product.name,
        `Produto ${product.name} com estoque baixo: ${product.quantity}`
      );
    }
  }
}

export function startLowStockNotifier() {
  if (started) return;
  started = true;
  checkLowStock();
  setInterval(checkLowStock, INTERVAL);
}
