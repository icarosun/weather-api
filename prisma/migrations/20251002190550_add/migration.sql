/*
  Warnings:

  - Added the required column `low_derivation` to the `forecast_hydrological_data` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upp_derivation` to the `forecast_hydrological_data` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forecast_hydrological_data" ADD COLUMN     "low_derivation" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "upp_derivation" DECIMAL(65,30) NOT NULL;
