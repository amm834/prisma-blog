import express from 'express';
import {router as authRouter} from "./routes/auth.route.js";
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import prisma from "./services/prisma.js";

const app = express();
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json());


const port = process?.env?.PORT ?? 8000


async function main() {
    app.use("/api", authRouter)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});