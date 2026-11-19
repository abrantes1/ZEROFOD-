import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { get } from '../services/api'
import { pegarLojista } from '../sessao'
import type { Anuncio } from '../types'
import { brl, diasAte, textoValidade } from '../utils'

const passos = [
  { titulo: 'Cadastre seu CNPJ', texto: 'Só estabelecimentos do setor de alimentação entram na rede.', cor: 'bg-zf-lima text-[#0d2a12]' },
  { titulo: 'Anuncie o excedente', texto: 'Validade, quantidade e preço de repasse, até o teto de custo.', cor: 'bg-zf-lima text-[#0d2a12]' },
  { titulo: 'O vizinho compra', texto: 'Pagamento dentro do app, com comprovante para os dois CNPJs.', cor: 'bg-zf-verde text-white' },
  { titulo: 'Retire e avalie', texto: 'Retirada a pé ou entrega local. A avaliação mútua mantém a rede confiável.', cor: 'bg-zf-escuro text-white' },
]

const ods = [
  { numero: 'ODS 2', texto: 'Fome Zero: menos insumo bom indo para o lixo.' },
  { numero: 'ODS 11', texto: 'Cidades sustentáveis: economia local mais resiliente.' },
  { numero: 'ODS 12', texto: 'Consumo responsável: cada repasse vira impacto medido no seu painel.' },
]

export default function Home() {
  const [ofertas, setOfertas] = useState<Anuncio[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)
  const logado = pegarLojista() !== null

  // Busca as ofertas e mostra as 3 que vencem primeiro
  useEffect(() => {
    get('/api/anuncios')
      .then((lista: Anuncio[]) => {
        const validas = lista.filter((a) => a.quantidadeEstoque > 0 && diasAte(a.dataValidade) >= 0)
        validas.sort((a, b) => diasAte(a.dataValidade) - diasAte(b.dataValidade))
        setOfertas(validas.slice(0, 3))
      })
      .catch(() => setErro(true))
      .finally(() => setCarregando(false))
  }, [])

  return (
    <main>
      <section className="mx-auto flex max-w-6xl flex-wrap items-center gap-12 px-6 pb-20 pt-12">
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
          <span className="self-start rounded-full bg-zf-claro px-3.5 py-2 text-sm font-semibold text-zf-escuro">Marketplace B2B hiperlocal de insumos</span>
          <h1 className="font-display text-4xl font-extrabold leading-tight md:text-6xl">
            O insumo que sobra na sua cozinha <span className="text-zf-verde">salva a do vizinho.</span>
          </h1>
          <p className="max-w-xl text-lg text-neutral-600">
            Pizzarias, hamburguerias, padarias e lojas de açaí repassam excedentes de estoque a preço de custo e resolvem faltas de última hora com quem está a poucos quarteirões.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={logado ? '/anunciar' : '/cadastro'} className="rounded-full bg-zf-lima px-7 py-4 font-bold text-[#0d2a12]">Anunciar excedente</Link>
            <Link to={logado ? '/ofertas' : '/entrar'} className="rounded-full border-2 border-zf-escuro px-6 py-3.5 font-bold text-zf-escuro">Buscar insumo urgente</Link>
          </div>
          <span className="text-sm text-neutral-600">Cadastro e anúncios gratuitos. Você só paga quando vende.</span>
        </div>

        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-3.5 rounded-[28px] bg-zf-escuro p-7 text-white">
          <span className="font-display text-xl font-bold">Ofertas na rede agora</span>
          {carregando && <p className="py-6 text-center opacity-85">Carregando ofertas…</p>}
          {erro && <p className="py-6 text-center opacity-85">Não foi possível carregar as ofertas agora.</p>}
          {!carregando && !erro && ofertas.length === 0 && <p className="py-6 text-center opacity-85">Nenhuma oferta disponível no momento.</p>}
          {ofertas.map((o) => (
            <Link key={o.idAnuncio} to={logado ? '/ofertas' : '/entrar'} className="flex items-center justify-between gap-3 rounded-2xl bg-white p-4 text-neutral-800">
              <div className="flex min-w-0 flex-col gap-1">
                <strong className="truncate">{o.nomeInsumo} · {o.quantidadeEstoque} un.</strong>
                <span className="truncate text-sm text-neutral-600">{o.nomeFantasiaLojista} · {textoValidade(o.dataValidade).toLowerCase()}</span>
              </div>
              <strong className="shrink-0 text-zf-escuro">{brl(o.valorUnitario)}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <h2 className="font-display text-3xl font-extrabold text-zf-escuro">Como funciona</h2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {passos.map((p, i) => (
              <li key={p.titulo} className="flex flex-col gap-2.5 rounded-2xl bg-zf-creme p-6">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full font-display font-extrabold ${p.cor}`}>{i + 1}</span>
                <h3 className="text-lg font-bold">{p.titulo}</h3>
                <p className="text-neutral-600">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-wrap gap-6 px-6 py-20">
        <div className="flex flex-[1_1_420px] flex-col justify-center gap-4">
          <h2 className="font-display text-3xl font-extrabold text-zf-escuro">Risco zero para o lojista</h2>
          <p className="text-lg text-neutral-600">Sem mensalidade e sem pedido mínimo. A ZeroFood retém uma pequena comissão só quando o repasse é concluído, e o restante vai direto para o vendedor pelo split automático.</p>
        </div>
        <div className="flex flex-[1_1_340px] flex-col gap-3.5 rounded-3xl bg-zf-verde p-8 text-white">
          <div className="flex justify-between border-b border-white/25 pb-3.5"><span>Cadastro</span><strong>Grátis</strong></div>
          <div className="flex justify-between border-b border-white/25 pb-3.5"><span>Anúncios</span><strong>Grátis</strong></div>
          <div className="flex justify-between"><span>Taxa por venda concluída</span><strong>8% a 12%</strong></div>
          <Link to={logado ? '/ofertas' : '/cadastro'} className="mt-2 self-start rounded-full bg-white px-6 py-3.5 font-bold text-zf-escuro">Começar agora</Link>
        </div>
      </section>

      <section className="bg-zf-escuro px-6 py-20 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <h2 className="font-display text-3xl font-extrabold">Tecnologia a serviço do bairro</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {ods.map((o) => (
              <div key={o.numero} className="flex flex-col gap-2 rounded-2xl bg-white/10 p-6">
                <strong className="font-display text-2xl text-zf-lima">{o.numero}</strong>
                <span>{o.texto}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
