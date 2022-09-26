import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { ConversorHorasParaMinutos } from './utils/convert-h-to-m';
import { ConversorMinutosParaHoras } from './utils/convert-m-to-h';

const app = express();

app.use(express.json());
app.use(cors())

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn'],
});

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    })
    return response.json(games)
});

app.post('/games/:gameId/ads', async (request, response) => {
    const gameId = request.params.gameId
    const body = request.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            hourStart: ConversorHorasParaMinutos(body.hourStart),
            hourEnd: ConversorHorasParaMinutos(body.hourEnd),
            weekDays: body.weekDays.join(','),
            yearsPlaying: body.yearsPlaying,
            useVoiceChannel: body.useVoiceChannel,
            discord: body.discord
        }
    })

    return response.status(201).json(ad)
});

app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            gameId: true,
            name: true,
            game: true,
            hourStart: true,
            hourEnd: true,
            yearsPlaying: true,
            useVoiceChannel: true,
            weekDays: true,

        },
        
        where: {
            gameId,
        },

        orderBy: {
            createdAt: 'desc'
        }
    })
    
    return response.json([ads.map((ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: ConversorMinutosParaHoras(ad.hourStart),
            hourEnd: ConversorMinutosParaHoras(ad.hourEnd),
        }
    }))]);
});

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id
    
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    })
    
    return response.json([{
        discord: ad.discord,
    }]);
});

app.listen(3030);