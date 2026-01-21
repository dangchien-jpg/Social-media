-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `coverPic` VARCHAR(255) NULL,
    `profilePic` VARCHAR(255) NULL,
    `city` VARCHAR(45) NULL,
    `website` VARCHAR(100) NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NULL,
    `img` VARCHAR(255) NULL,
    `userId` INTEGER NOT NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,

    INDEX `fk_posts_users`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `desc` VARCHAR(255) NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,

    INDEX `fk_comments_posts`(`postId`),
    INDEX `fk_comments_users`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,

    INDEX `fk_likes_posts`(`postId`),
    INDEX `fk_likes_users`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `img` VARCHAR(255) NULL,
    `userId` INTEGER NOT NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,

    INDEX `fk_stories_users`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relationships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `followerUserId` INTEGER NOT NULL,
    `followedUserId` INTEGER NOT NULL,

    INDEX `fk_followedUserId_users`(`followedUserId`),
    INDEX `fk_followerUserId_users`(`followerUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `fk_posts_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `fk_comments_posts` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `fk_comments_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `fk_likes_posts` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `fk_likes_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stories` ADD CONSTRAINT `fk_stories_users` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationships` ADD CONSTRAINT `fk_followedUserId_users` FOREIGN KEY (`followedUserId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `relationships` ADD CONSTRAINT `fk_followerUserId_users` FOREIGN KEY (`followerUserId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
