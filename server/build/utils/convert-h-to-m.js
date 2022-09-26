"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversorHorasParaMinutos = void 0;
function ConversorHorasParaMinutos(hourString) {
    const [hours, minutes] = hourString.split(':').map(Number);
    const minutesAmount = (hours * 60) + minutes;
    return minutesAmount;
}
exports.ConversorHorasParaMinutos = ConversorHorasParaMinutos;
