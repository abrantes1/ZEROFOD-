// Formata número como dinheiro: 12.5 -> R$ 12,50
export function brl(valor: number) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Formata data: 2026-11-20 -> 20/11/2026
export function dataBR(data: string) {
  const [ano, mes, dia] = data.slice(0, 10).split('-')
  return `${dia}/${mes}/${ano}`
}

// Quantos dias faltam até a data (negativo = já venceu)
export function diasAte(data: string) {
  const hoje = new Date()
  hoje.setHours(0, 0, 0, 0)
  const validade = new Date(data.slice(0, 10) + 'T00:00:00')
  return Math.round((validade.getTime() - hoje.getTime()) / 86400000)
}

export function textoValidade(data: string) {
  const dias = diasAte(data)
  if (dias < 0) return 'Vencido'
  if (dias === 0) return 'Vence hoje'
  if (dias === 1) return 'Vence amanhã'
  return `Vence em ${dias} dias`
}

// Máscara de CNPJ: 12345678000190 -> 12.345.678/0001-90
export function mascaraCnpj(texto: string) {
  const n = texto.replace(/\D/g, '').slice(0, 14)
  return n
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export const TAXA = 0.1        // taxa da ZeroFood (10%)
export const PRECO_MAXIMO = 200 // teto de preço por unidade
