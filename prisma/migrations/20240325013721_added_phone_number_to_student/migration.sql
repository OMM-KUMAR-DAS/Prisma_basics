/*
  Warnings:

  - Added the required column `phonenumber` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "phonenumber" BIGINT NOT NULL;
