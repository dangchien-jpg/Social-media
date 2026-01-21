/*
  Warnings:

  - You are about to drop the column `createAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `stories` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `stories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `comments`
ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

UPDATE `comments`
SET createdAt = createAt,
    updatedAt = updateAt;

ALTER TABLE `comments`
DROP COLUMN `createAt`,
DROP COLUMN `updateAt`;


-- AlterTable
ALTER TABLE `likes`
ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

UPDATE `likes`
SET createdAt = createAt,
    updatedAt = updateAt;

ALTER TABLE `likes`
DROP COLUMN `createAt`,
DROP COLUMN `updateAt`;


-- AlterTable
ALTER TABLE `posts`
ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

UPDATE `posts`
SET createdAt = createAt,
    updatedAt = updateAt;

ALTER TABLE `posts`
DROP COLUMN `createAt`,
DROP COLUMN `updateAt`;


-- AlterTable
ALTER TABLE `stories`
ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

UPDATE `stories`
SET createdAt = createAt,
    updatedAt = updateAt;

ALTER TABLE `stories`
DROP COLUMN `createAt`,
DROP COLUMN `updateAt`;


-- AlterTable
ALTER TABLE `users`
ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

UPDATE `users`
SET createdAt = createAt,
    updatedAt = updateAt;

ALTER TABLE `users`
DROP COLUMN `createAt`,
DROP COLUMN `updateAt`;

