/*
  Warnings:

  - You are about to drop the `_InvoiceToPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_InvoiceToPayment" DROP CONSTRAINT "_InvoiceToPayment_A_fkey";

-- DropForeignKey
ALTER TABLE "_InvoiceToPayment" DROP CONSTRAINT "_InvoiceToPayment_B_fkey";

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "invoiceId" TEXT;

-- DropTable
DROP TABLE "_InvoiceToPayment";

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
