import prisma from "../src/services/prisma.js";
import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt";

await prisma.category.createMany({
    data: [
        {name: "Blockchain"},
        {name: "Web Development"},
        {name: "System Design"},
    ],
    skipDuplicates: true,
})


await prisma.user.createMany({
    data: [
        {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: await bcrypt.hash('password', 10),
        },
        {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: await bcrypt.hash('password', 10),
        }
    ],
});

const users = await prisma.user.findMany({
    select: {
        id: true
    }
})

const userId = users[Math.floor(Math.random() * users.length)].id

const post = {
    title: faker.lorem.sentence(),
    content: 'title 1',
    published: [true, false][Math.floor(Math.random() * 2)],
    categoryId: [1, 2, 3][Math.floor(Math.random() * 3)],
    userId,
}

const posts = Array.from({length: 10}).map(() => post)

await prisma.post.createMany({
    data: [
        ...posts
    ]
});