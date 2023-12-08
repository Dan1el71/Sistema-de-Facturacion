/*
  Warnings:

  - You are about to drop the `Invoice_Details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice_Details" DROP CONSTRAINT "Invoice_Details_consecutive_fkey";

-- DropForeignKey
ALTER TABLE "Invoice_Details" DROP CONSTRAINT "Invoice_Details_id_product_fkey";

-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_client_fkey";

-- DropTable
DROP TABLE "Invoice_Details";

-- DropTable
DROP TABLE "Invoices";

-- DropTable
DROP TABLE "Products";

-- CreateTable
CREATE TABLE "Invoice" (
    "consecutive" SERIAL NOT NULL,
    "client" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("consecutive")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "state" VARCHAR(45) NOT NULL,
    "unit_price" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceDetails" (
    "consecutive" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" INTEGER NOT NULL,

    CONSTRAINT "InvoiceDetails_pkey" PRIMARY KEY ("consecutive","id_product")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_client_fkey" FOREIGN KEY ("client") REFERENCES "Client"("client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetails" ADD CONSTRAINT "InvoiceDetails_consecutive_fkey" FOREIGN KEY ("consecutive") REFERENCES "Invoice"("consecutive") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceDetails" ADD CONSTRAINT "InvoiceDetails_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
