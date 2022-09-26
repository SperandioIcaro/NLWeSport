export function ConversorMinutosParaHoras(minutos: number){
  const hours = Math.floor(minutos / 60);
  const minutes = minutos % 60;

  return `${String(hours).padStart(2, '0') }:${String(minutes).padStart(2, '0')}`;
}