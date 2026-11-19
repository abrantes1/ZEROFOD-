import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { get, post } from '../services/api'
import { pegarLojista } from '../sessao'
import type { Categoria, Insumo } from '../types'
import { Erro, btnPrimario, estiloCampo, estiloLabel } from '../components/ui'
import { PRECO_MAXIMO, TAXA, brl } from '../utils'

export default function NovoAnuncio() {
  const navigate = useNavigate()
  const lojista = pegarLojista()
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [insumos, setInsumos] = useState<Insumo[]>([])

  // Campos do formulário
  const [idInsumo, setIdInsumo] = useState('novo')
  const [nomeInsumo, setNomeInsumo] = useState('')
  const [idCategoria, setIdCategoria] = useState('')
  const [quantidade, setQuantidade] = useState('1')
  const [preco, setPreco] = useState('')
  const [validade, setValidade] = useState('')
  const [descricao, setDescricao] = useState('')
  const [foto, setFoto] = useState('')

  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  // Carrega categorias e insumos para os selects
  useEffect(() => {
    get('/api/categorias').then(setCategorias).catch(() => setErro('Não foi possível carregar as categorias.'))
    get('/api/insumos').then(setInsumos).catch(() => setErro('Não foi possível carregar os insumos.'))
  }, [])

  // Mostra a foto escolhida (só no navegador, a API não guarda imagens)
  function escolherFoto(arquivo?: File) {
    if (arquivo) setFoto(URL.createObjectURL(arquivo))
  }

  const valor = Number(preco) || 0
  const qtd = Number(quantidade) || 0
  const total = valor * qtd
  const precoAlto = valor > PRECO_MAXIMO

  async function publicar(e: FormEvent) {
    e.preventDefault()
    if (!lojista || precoAlto) return
    setErro('')
    setCarregando(true)
    try {
      let id = Number(idInsumo)
      // Se o insumo não existe ainda, cadastra primeiro (POST /api/insumos)
      if (idInsumo === 'novo') {
        const novo = await post('/api/insumos', { nome: nomeInsumo, idCategoria: Number(idCategoria), unidadeMedida: 'un' })
        id = novo.idInsumo
      }
      // Cria o anúncio (POST /api/anuncios)
      await post('/api/anuncios', { idLojista: lojista.idLojista, idInsumo: id, quantidadeEstoque: qtd, valorUnitario: valor, dataValidade: validade })
      navigate('/ofertas')
    } catch {
      setErro('Não foi possível publicar. Confira os dados e tente de novo.')
    }
    setCarregando(false)
  }

  return (
    <main className="mx-auto flex max-w-5xl flex-wrap items-start gap-8 px-6 py-8">
      <form onSubmit={publicar} className="flex min-w-0 flex-[999_1_480px] flex-col gap-5 rounded-3xl bg-white p-8">
        <h1 className="font-display text-3xl font-extrabold">Novo anúncio de repasse</h1>

        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-[#9cc98a] bg-[#f6fbf2] p-6 text-center font-semibold text-zf-verde">
          {foto ? <img src={foto} alt="Foto do insumo" className="h-40 w-full max-w-xs rounded-xl object-cover" /> : <span className="text-3xl">⬆</span>}
          {foto ? 'Trocar foto' : 'Enviar foto do insumo'}
          <span className="text-[13px] font-normal text-neutral-600">JPG ou PNG</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => escolherFoto(e.target.files?.[0])} />
        </label>

        <label className={estiloLabel}>Insumo
          <select value={idInsumo} onChange={(e) => setIdInsumo(e.target.value)} className={estiloCampo}>
            <option value="novo">+ Cadastrar novo insumo</option>
            {insumos.map((i) => <option key={i.idInsumo} value={i.idInsumo}>{i.nome} ({i.nomeCategoria})</option>)}
          </select>
        </label>

        {idInsumo === 'novo' && (
          <div className="flex flex-wrap gap-4 rounded-2xl bg-zf-creme p-4">
            <label className={`${estiloLabel} flex-[2_1_220px]`}>Nome do insumo
              <input value={nomeInsumo} onChange={(e) => setNomeInsumo(e.target.value)} required className={estiloCampo} />
            </label>
            <label className={`${estiloLabel} flex-[1_1_180px]`}>Categoria
              <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)} required className={estiloCampo}>
                <option value="">Escolha…</option>
                {categorias.map((c) => <option key={c.idCategoria} value={c.idCategoria}>{c.nomeCategoria}</option>)}
              </select>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          <label className={`${estiloLabel} flex-[1_1_160px]`}>Quantidade
            <input type="number" min={1} value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required className={estiloCampo} />
          </label>
          <label className={`${estiloLabel} flex-[1_1_160px]`}>Validade
            <input type="date" value={validade} onChange={(e) => setValidade(e.target.value)} required className={estiloCampo} />
          </label>
          <label className={`${estiloLabel} flex-[1_1_160px]`}>Preço por unidade (R$)
            <input type="number" min={0.01} step={0.01} value={preco} onChange={(e) => setPreco(e.target.value)} required className={estiloCampo} />
          </label>
        </div>

        <label className={estiloLabel}>Descrição do lote
          <textarea rows={3} value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: sobra de compra da semana, mantida refrigerada." className={estiloCampo} />
        </label>

        {precoAlto && (
          <div className="rounded-xl bg-amber-50 px-4 py-3 text-amber-900">
            <strong>Preço acima do teto de repasse.</strong> O valor precisa ficar até {brl(PRECO_MAXIMO)} por unidade.
          </div>
        )}
        {erro && <Erro texto={erro} />}

        <button type="submit" disabled={carregando || precoAlto} className={`${btnPrimario} self-end`}>
          {carregando ? 'Publicando…' : 'Publicar oferta'}
        </button>
      </form>

      <aside className="flex flex-[1_1_280px] flex-col gap-3 rounded-2xl bg-zf-escuro p-6 text-white">
        <strong className="font-display text-lg">Quanto você recebe</strong>
        <div className="flex justify-between"><span>Total do lote</span><span>{brl(total)}</span></div>
        <div className="flex justify-between"><span>Taxa ZeroFood (10%)</span><span>− {brl(total * TAXA)}</span></div>
        <div className="flex justify-between border-t border-white/30 pt-3 text-lg font-bold"><span>Você recebe</span><span className="text-[#8fe05a]">{brl(total - total * TAXA)}</span></div>
        <span className="text-sm opacity-85">A taxa só é cobrada quando a venda é concluída.</span>
        <p className="mt-2 rounded-xl bg-white/10 p-4 text-sm">Seu anúncio aparece no feed para os outros lojistas da rede.</p>
      </aside>
    </main>
  )
}
