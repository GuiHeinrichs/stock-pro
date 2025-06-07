/*
  Warnings:

  - You are about to drop the column `address` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[barcode]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpfCnpj]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellingPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `StockMovement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpfCnpj` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "sellingPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StockMovement" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "address",
DROP COLUMN "email",
DROP COLUMN "phone",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "corporateName" TEXT,
ADD COLUMN     "cpfCnpj" TEXT NOT NULL,
ADD COLUMN     "mainContactEmail" TEXT,
ADD COLUMN     "mainContactName" TEXT,
ADD COLUMN     "mainContactPhone" TEXT,
ADD COLUMN     "neighborhood" TEXT,
ADD COLUMN     "number" TEXT,
ADD COLUMN     "secondaryEmail" TEXT,
ADD COLUMN     "secondaryPhone" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "zipCode" TEXT;

-- CreateTable
CREATE TABLE "ProductDetail" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "dimensions" TEXT,
    "weight" DOUBLE PRECISION,
    "color" TEXT,
    "material" TEXT,
    "additionalInfo" TEXT,

    CONSTRAINT "ProductDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierInfo" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "paymentTerms" TEXT,
    "paymentMethods" TEXT,
    "freightTerms" TEXT,

    CONSTRAINT "SupplierInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductDetail_productId_key" ON "ProductDetail"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierInfo_supplierId_key" ON "SupplierInfo"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_cpfCnpj_key" ON "Supplier"("cpfCnpj");

-- AddForeignKey
ALTER TABLE "ProductDetail" ADD CONSTRAINT "ProductDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierInfo" ADD CONSTRAINT "SupplierInfo_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockMovement" ADD CONSTRAINT "StockMovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
