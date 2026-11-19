import { useEffect, useState } from 'react'
import { get } from '../services/api'
import { pegarLojista } from '../sessao'
import type { Anuncio, Transacao } from '../types'
import { Carregando, Erro } from '../components/ui'
import { TAXA, brl, dataBR } from '../utils'

export default function Impacto() {
  const lojista = pegarLojista()
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    Promise.all([get('/api/transacoes'), get('/api/anuncios')])
      .then(([listaTransacoes, listaAnuncios]) => {
        setTransacoes(listaTransacoes)
        setAnuncios(listaAnuncios)
      })
      .catch(() => setErro('Não foi possível carregar o painel.'))
      .finally(() => setCarregando(false))
  }, [])

  if (carregando) return <Carregando />
  if (erro || !lojista) return <main className="mx-auto max-w-6xl px-6 py-8"><Erro texto={erro} /></main>

  // Separa o que eu vendi (transações dos meus anúncios) e o que eu comprei
  const meusAnuncios = anuncios.filter((a) => a.idLojista === lojista.idLojista).map((a) => a.idAnuncio)
  const vendas = transacoes.filter((t) => meusAnuncios.includes(t.idAnuncio))
  const compras = transacoes.filter((t) => t.idLojistaComprador === lojista.idLojista)
  const todas = [...vendas, ...compras].sort((a, b) => b.dataHora.localeCompare(a.dataHora))

  // Números dos cartões
  let itensSalvos = 0
  todas.forEach((t) => { itensSalvos += t.quantidadeVendida })
  let capital = 0
  vendas.forEach((t) => { capital += t.valorTotal * (1 - TAXA) })

  const cartoes = [
    { titulo: 'Itens salvos do descarte', valor: String(itensSalvos), detalhe: 'unidades repassadas' },
    { titulo: 'Capital recuperado', valor: brl(capital), detalhe: 'em vendas, já sem a taxa' },
    { titulo: 'Vendas', valor: String(vendas.length), detalhe: 'insumos que você repassou' },
    { titulo: 'Compras', valor: String(compras.length), detalhe: 'insumos que você salvou' },
  ]

  // Gráfico: soma de itens por mês (ex: "2026-11")
  const porMes: Record<string, number> = {}
  todas.forEach((t) => {
    const mes = t.dataHora.slice(0, 7)
    porMes[mes] = (porMes[mes] || 0) + t.quantidadeVendida
  })
  const meses = Object.keys(porMes).sort().slice(-6)
  const maior = Math.max(1, ...meses.map((m) => porMes[m]))

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold">Meu impacto</h1>
        <p className="text-neutral-600">Tudo o que seu estabelecimento deixou de jogar fora.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cartoes.map((c, i) => (
          <div key={c.titulo} className={`flex flex-col gap-2 rounded-2xl p-6 ${i === 0 ? 'bg-zf-escuro text-white' : 'bg-white'}`}>
            <span className={i === 0 ? 'opacity-85' : 'text-neutral-600'}>{c.titulo}</span>
            <strong className={`font-display text-4xl ${i === 0 ? 'text-[#8fe05a]' : 'text-zf-escuro'}`}>{c.valor}</strong>
            <span className={`text-sm ${i === 0 ? 'opacity-85' : 'text-neutral-600'}`}>{c.detalhe}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-5">
        <section className="flex min-w-0 flex-[999_1_480px] flex-col gap-4 rounded-2xl bg-white p-6">
          <h2 className="text-lg font-bold">Itens salvos por mês</h2>
          {meses.length === 0 && <p className="text-neutral-600">Seus repasses vão aparecer aqui.</p>}
          {meses.length > 0 && (
            <div className="flex h-60 items-end gap-4 border-b-[1.5px] border-neutral-300 px-2">
              {meses.map((mes) => (
                <div key={mes} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                  <span className="text-sm font-semibold text-zf-escuro">{porMes[mes]}</span>
                  <div className="w-full max-w-14 rounded-t-lg bg-zf-verde" style={{ height: (porMes[mes] / maior) * 190 }} />
                  <span className="text-xs text-neutral-600">{mes.slice(5)}/{mes.slice(2, 4)}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-[1_1_300px] flex-col gap-3 rounded-2xl bg-white p-6">
          <h2 className="text-lg font-bold">Últimos repasses</h2>
          {todas.length === 0 && <p className="text-neutral-600">Nenhum repasse ainda.</p>}
          {todas.slice(0, 5).map((t) => (
            <div key={t.idTransacao} className="flex justify-between gap-2 border-b border-neutral-100 pb-3">
              <div className="flex flex-col">
                <strong>{t.nomeInsumo} · {t.quantidadeVendida}</strong>
                <span className="text-sm text-neutral-600">{vendas.includes(t) ? 'Vendido' : 'Comprado'} · {dataBR(t.dataHora)}</span>
              </div>
              <span className="self-center text-sm font-bold text-zf-escuro">{brl(t.valorTotal)}</span>
            </div>
          ))}
          <div className="mt-auto flex flex-wrap gap-2 pt-2">
            <span className="rounded-full bg-zf-escuro px-3 py-1.5 text-[13px] font-bold text-white">ODS 2</span>
            <span className="rounded-full bg-zf-verde px-3 py-1.5 text-[13px] font-bold text-white">ODS 11</span>
            <span className="rounded-full bg-zf-lima px-3 py-1.5 text-[13px] font-bold text-[#0d2a12]">ODS 12</span>
          </div>
        </section>
      </div>
    </main>
  )
}
