import type { Lojista } from './types'

// A API não tem login, então guardamos o lojista que entrou no navegador (localStorage)

export function pegarLojista(): Lojista | null {
  const salvo = localStorage.getItem('lojista')
  return salvo ? JSON.parse(salvo) : null
}

export function salvarLojista(lojista: Lojista) {
  localStorage.setItem('lojista', JSON.stringify(lojista))
}

export function sair() {
  localStorage.removeItem('lojista')
}
