import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../services/api'
import { pegarLojista } from '../sessao'
import type { Anuncio, Categoria } from '../types'
import { Carregando, Erro } from '../components/ui'
import { brl, diasAte, textoValidade } from '../utils'

export default function Ofertas() {
  const lojista = pegarLojista()
  const [anuncios, setAnuncios] = useState<Anuncio[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [categoria, setCategoria] = useState('Todos')
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // Busca anúncios e categorias na API quando a página abre
  useEffect(() => {
    Promise.all([get('/api/anuncios'), get('/api/categorias')])
      .then(([listaAnuncios, listaCategorias]) => {
        setAnuncios(listaAnuncios)
        setCategorias(listaCategorias)
      })
      .catch(() => setErro('Não foi possível carregar as ofertas.'))
      .finally(() => setCarregando(false))
  }, [])

  // Filtra: tira os meus anúncios, os vencidos, e aplica categoria e busca
  const visiveis = anuncios
    .filter((a) => a.idLojista !== lojista?.idLojista)
    .filter((a) => a.quantidadeEstoque > 0 && diasAte(a.dataValidade) >= 0)
    .filter((a) => categoria === 'Todos' || a.nomeCategoria === categoria)
    .filter((a) => a.nomeInsumo.toLowerCase().includes(busca.toLowerCase()))
    .sort((a, b) => diasAte(a.dataValidade) - diasAte(b.dataValidade))

  const botoes = ['Todos', ...categorias.map((c) => c.nomeCategoria)]

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Ofertas perto de você</h1>
          <p className="text-neutral-600">Insumos excedentes de lojistas vizinhos, os que vencem antes aparecem primeiro.</p>
        </div>
        <input type="search" value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="🔍 Buscar insumo, ex: rúcula"
          className="w-full max-w-sm rounded-xl border-[1.5px] border-neutral-300 bg-white px-4 py-3 sm:w-80" />
      </div>

      <div className="flex flex-wrap gap-2.5">
        {botoes.map((nome) => (
          <button key={nome} onClick={() => setCategoria(nome)}
            className={`min-h-11 rounded-full border-[1.5px] px-4 text-sm font-semibold ${categoria === nome ? 'border-zf-escuro bg-zf-escuro text-white' : 'border-neutral-300 bg-white'}`}>
            {nome}
          </button>
        ))}
      </div>

      {carregando && <Carregando />}
      {erro && <Erro texto={erro} />}
      {!carregando && !erro && visiveis.length === 0 && (
        <p className="rounded-2xl bg-white p-10 text-center text-neutral-600">Nenhuma oferta encontrada com esses filtros.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visiveis.map((a) => (
          <article key={a.idAnuncio} className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
            <div className="relative flex h-28 items-center justify-center bg-zf-claro font-display text-3xl font-extrabold text-zf-verde">
              {a.nomeInsumo[0]}
              <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${diasAte(a.dataValidade) <= 1 ? 'bg-amber-100 text-amber-900' : 'bg-white text-zf-escuro'}`}>
                {textoValidade(a.dataValidade)}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <span className="text-xs font-bold uppercase text-zf-verde">{a.nomeCategoria}</span>
              <h2 className="text-lg font-bold">{a.nomeInsumo}</h2>
              <span className="text-sm text-neutral-600">{a.nomeFantasiaLojista} · {a.quantidadeEstoque} disponíveis</span>
              <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                <strong className="text-lg text-zf-escuro">{brl(a.valorUnitario)} <span className="text-sm font-normal text-neutral-600">/un.</span></strong>
                <Link to={`/checkout/${a.idAnuncio}`} className="rounded-full bg-zf-escuro px-4 py-2.5 text-sm font-bold text-white">Comprar insumo</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
