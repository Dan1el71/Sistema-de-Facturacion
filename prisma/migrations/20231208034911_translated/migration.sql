/*
  Warnings:

  - You are about to drop the `Recipe_Details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Recipes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe_Details" DROP CONSTRAINT "Recipe_Details_consecutive_fkey";

-- DropForeignKey
ALTER TABLE "Recipe_Details" DROP CONSTRAINT "Recipe_Details_id_product_fkey";

-- DropForeignKey
ALTER TABLE "Recipes" DROP CONSTRAINT "Recipes_client_fkey";

-- DropTable
DROP TABLE "Recipe_Details";

-- DropTable
DROP TABLE "Recipes";

-- CreateTable
CREATE TABLE "Invoices" (
    "consecutive" SERIAL NOT NULL,
    "client" INTEGER NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("consecutive")
);

-- CreateTable
CREATE TABLE "Invoice_Details" (
    "consecutive" INTEGER NOT NULL,
    "id_product" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" INTEGER NOT NULL,

    CONSTRAINT "Invoice_Details_pkey" PRIMARY KEY ("consecutive","id_product")
);

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_client_fkey" FOREIGN KEY ("client") REFERENCES "Client"("client") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice_Details" ADD CONSTRAINT "Invoice_Details_consecutive_fkey" FOREIGN KEY ("consecutive") REFERENCES "Invoices"("consecutive") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice_Details" ADD CONSTRAINT "Invoice_Details_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
