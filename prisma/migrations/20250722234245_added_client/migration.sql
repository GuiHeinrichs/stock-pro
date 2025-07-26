-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ProductDetail" DROP CONSTRAINT "ProductDetail_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_clientId_fkey";

-- DropForeignKey
ALTER TABLE "StockMovement" DROP CONSTRAINT "StockMovement_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Supplier" DROP CONSTRAINT "Supplier_clientId_fkey";

-- DropForeignKey
ALTER TABLE "SupplierInfo" DROP CONSTRAINT "SupplierInfo_clientId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_clientId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "clientId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "clientId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductDetail" ALTER COLUMN "clientId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "clientId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StockMovement" ALTER COLUMN "clientId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" ALTER COLUMN "clientId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SupplierInfo" ALTER COLUMN "clientId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "clientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInfo" ADD CONSTRAINT "SupplierInfo_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE SET NULL ON UPDATE CASCADE;
