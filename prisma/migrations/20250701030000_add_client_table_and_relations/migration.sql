-- CreateTable
CREATE TABLE "Client" (
    "idClient" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "corporateName" TEXT,
    "phone" TEXT,
    "state" TEXT,
    "country" TEXT,
    "city" TEXT,
    "address" TEXT,
    "cpfCnpj" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    CONSTRAINT "Client_pkey" PRIMARY KEY ("idClient")
);

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "clientId" INTEGER NOT NULL;
ALTER TABLE "ProductDetail" ADD COLUMN     "clientId" INTEGER NOT NULL;
ALTER TABLE "Supplier" ADD COLUMN     "clientId" INTEGER NOT NULL;
ALTER TABLE "SupplierInfo" ADD COLUMN     "clientId" INTEGER NOT NULL;
ALTER TABLE "StockMovement" ADD COLUMN     "clientId" INTEGER NOT NULL;
ALTER TABLE "User" ADD COLUMN     "clientId" INTEGER NOT NULL;
ALTER TABLE "Category" ADD COLUMN     "clientId" INTEGER NOT NULL;
ALTER TABLE "Role" ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SupplierInfo" ADD CONSTRAINT "SupplierInfo_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "User" ADD CONSTRAINT "User_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Category" ADD CONSTRAINT "Category_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Role" ADD CONSTRAINT "Role_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("idClient") ON DELETE RESTRICT ON UPDATE CASCADE;
