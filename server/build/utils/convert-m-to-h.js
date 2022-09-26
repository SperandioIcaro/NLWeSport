"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversorMinutosParaHoras = void 0;
function ConversorMinutosParaHoras(minutos) {
    const hours = Math.floor(minutos / 60);
    const minutes = minutos % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}
exports.ConversorMinutosParaHoras = ConversorMinutosParaHoras;
