import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { get, post } from '../services/api'
import { pegarLojista } from '../sessao'
import type { Anuncio, Transacao } from '../types'
import { Carregando, Erro, btnEscuro, btnPrimario, estiloCampo, estiloLabel } from '../components/ui'
import { brl, dataBR } from '../utils'

// Rota com parâmetro: /checkout/:id
export default function Checkout() {
  const { id } = useParams()
  const lojista = pegarLojista()
  const [anuncio, setAnuncio] = useState<Anuncio | null>(null)
  const [quantidade, setQuantidade] = useState(1)
  const [pagamento, setPagamento] = useState('pix')
  const [compra, setCompra] = useState<Transacao | null>(null)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  // Busca o anúncio pelo id da URL
  useEffect(() => {
    get(`/api/anuncios/${id}`).then(setAnuncio).catch(() => setErro('Oferta não encontrada.'))
  }, [id])

  async function pagar() {
    if (!lojista || !anuncio) return
    setErro('')
    setCarregando(true)
    try {
      // POST /api/transacoes registra a compra
      const nova = await post('/api/transacoes', { idAnuncio: anuncio.idAnuncio, idLojistaComprador: lojista.idLojista, quantidadeVendida: quantidade })
      setCompra(nova)
    } catch {
      setErro('Pagamento não concluído. A oferta continua disponível.')
    }
    setCarregando(false)
  }

  if (!anuncio && erro) return <main className="mx-auto max-w-3xl px-6 py-10"><Erro texto={erro} /></main>
  if (!anuncio) return <Carregando />

  // Tela de sucesso depois da compra
  if (compra) {
    return (
      <main className="mx-auto flex max-w-xl flex-col items-center gap-4 px-6 py-16 text-center">
        <span className="flex h-18 w-18 items-center justify-center rounded-full bg-zf-lima text-4xl font-bold text-[#0d2a12]">✓</span>
        <h1 className="font-display text-3xl font-extrabold text-zf-escuro">Compra registrada</h1>
        <p className="text-neutral-600">
          Transação nº {compra.idTransacao}: {compra.quantidadeVendida} × {compra.nomeInsumo}, total {brl(compra.valorTotal)}.
          Retire com {anuncio.nomeFantasiaLojista}.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/impacto" className={btnEscuro}>Ver meu impacto</Link>
          <Link to="/ofertas" className="px-6 py-3 font-bold text-zf-escuro">Continuar comprando</Link>
        </div>
      </main>
    )
  }

  const total = quantidade * anuncio.valorUnitario

  return (
    <main className="mx-auto flex max-w-5xl flex-wrap items-start gap-6 px-6 py-8">
      <section className="flex min-w-0 flex-[999_1_460px] flex-col gap-5">
        <Link to="/ofertas" className="font-semibold text-zf-escuro">← Voltar às ofertas</Link>
        <h1 className="font-display text-3xl font-extrabold">Confirmar compra</h1>
        <div className="flex flex-col gap-1.5 rounded-2xl bg-white p-5">
          <strong className="text-lg">{anuncio.nomeInsumo}</strong>
          <span className="text-neutral-600">{anuncio.nomeFantasiaLojista} · {anuncio.nomeCategoria}</span>
          <span className="text-neutral-600">Validade: {dataBR(anuncio.dataValidade)} · {anuncio.quantidadeEstoque} disponíveis · {brl(anuncio.valorUnitario)}/un.</span>
        </div>
        <label className={`${estiloLabel} max-w-48`}>Quantidade
          <input type="number" min={1} max={anuncio.quantidadeEstoque} value={quantidade}
            onChange={(e) => setQuantidade(Math.min(Math.max(Number(e.target.value), 1), anuncio.quantidadeEstoque))} className={estiloCampo} />
        </label>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-3 font-bold">Forma de pagamento</legend>
          <label className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 bg-white px-5 py-4 ${pagamento === 'pix' ? 'border-zf-verde' : 'border-neutral-200'}`}>
            <span className="flex flex-col"><strong>Pix</strong><span className="text-sm text-neutral-600">O lote fica reservado por 10 minutos.</span></span>
            <input type="radio" checked={pagamento === 'pix'} onChange={() => setPagamento('pix')} className="h-5 w-5 accent-zf-verde" />
          </label>
          <label className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 bg-white px-5 py-4 ${pagamento === 'cartao' ? 'border-zf-verde' : 'border-neutral-200'}`}>
            <span className="flex flex-col"><strong>Cartão de crédito</strong><span className="text-sm text-neutral-600">Processado pelo gateway seguro.</span></span>
            <input type="radio" checked={pagamento === 'cartao'} onChange={() => setPagamento('cartao')} className="h-5 w-5 accent-zf-verde" />
          </label>
        </fieldset>
      </section>

      <aside className="flex flex-[1_1_300px] flex-col gap-3 rounded-2xl bg-white p-6">
        <strong className="font-display text-lg">Resumo</strong>
        <div className="flex justify-between"><span>{quantidade} × {brl(anuncio.valorUnitario)}</span><span>{brl(total)}</span></div>
        <div className="flex justify-between text-sm text-neutral-600"><span>Taxa de serviço</span><span>inclusa</span></div>
        <div className="flex justify-between border-t border-neutral-200 pt-3 text-xl font-bold"><span>Total</span><span className="text-zf-escuro">{brl(total)}</span></div>
        {erro && <Erro texto={erro} />}
        <button onClick={pagar} disabled={carregando} className={btnPrimario}>{carregando ? 'Processando…' : 'Confirmar e pagar'}</button>
      </aside>
    </main>
  )
}
