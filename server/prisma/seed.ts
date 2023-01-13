import prisma from "../src/services/prisma.js";

const createMany = await prisma.category.createMany({
    data: [
        {name: "Blockchain"},
        {name: "Web Development"},
        {name: "System Design"},
    ],
    skipDuplicates: true, // Skip 'Bobo'
})