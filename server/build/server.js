"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const convert_h_to_m_1 = require("./utils/convert-h-to-m");
const convert_m_to_h_1 = require("./utils/convert-m-to-h");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn'],
});
app.get('/games', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const games = yield prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    return response.json(games);
}));
app.post('/games/:gameId/ads', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = request.params.gameId;
    const body = request.body;
    const ad = yield prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            hourStart: (0, convert_h_to_m_1.ConversorHorasParaMinutos)(body.hourStart),
            hourEnd: (0, convert_h_to_m_1.ConversorHorasParaMinutos)(body.hourEnd),
            weekDays: body.weekDays.join(','),
            yearsPlaying: body.yearsPlaying,
            useVoiceChannel: body.useVoiceChannel,
            discord: body.discord
        }
    });
    return response.status(201).json(ad);
}));
app.get('/games/:id/ads', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const gameId = request.params.id;
    const ads = yield prisma.ad.findMany({
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
    });
    return response.json([ads.map((ad => {
            return Object.assign(Object.assign({}, ad), { weekDays: ad.weekDays.split(','), hourStart: (0, convert_m_to_h_1.ConversorMinutosParaHoras)(ad.hourStart), hourEnd: (0, convert_m_to_h_1.ConversorMinutosParaHoras)(ad.hourEnd) });
        }))]);
}));
app.get('/ads/:id/discord', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const adId = request.params.id;
    const ad = yield prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    });
    return response.json([{
            discord: ad.discord,
        }]);
}));
app.listen(3030);
