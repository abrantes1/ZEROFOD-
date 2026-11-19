// Classes do Tailwind reaproveitadas em vários formulários e botões
export const estiloCampo = 'w-full rounded-xl border-[1.5px] border-neutral-300 bg-white px-4 py-3 font-normal focus:border-zf-verde focus:outline-none'
export const estiloLabel = 'flex flex-col gap-1.5 text-[15px] font-semibold'
export const btnPrimario = 'rounded-full bg-zf-lima px-7 py-4 font-bold text-[#0d2a12] disabled:bg-neutral-300'
export const btnEscuro = 'rounded-full bg-zf-escuro px-6 py-3 font-bold text-white'

// Caixa vermelha de erro
export function Erro({ texto }: { texto: string }) {
  return <div className="rounded-xl bg-red-50 px-4 py-3 text-red-800">{texto}</div>
}

// Mensagem enquanto a API responde
export function Carregando() {
  return <p className="py-10 text-center text-neutral-600">Carregando…</p>
}
