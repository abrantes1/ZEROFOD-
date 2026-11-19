import { useState } from 'react'
import Titulo from '../components/Titulo'

const perguntas = [
  { pergunta: 'Quanto custa usar o ZeroFood?', resposta: 'Cadastro e anúncios são gratuitos. Cobramos de 8% a 12% apenas quando um repasse é concluído.' },
  { pergunta: 'Quem pode se cadastrar?', resposta: 'Estabelecimentos do setor de alimentação com CNPJ ativo: pizzarias, hamburguerias, padarias, lojas de açaí, restaurantes.' },
  { pergunta: 'Posso vender acima do preço de custo?', resposta: 'Não. Existe um teto de repasse para evitar especulação e manter o modelo justo entre vizinhos.' },
  { pergunta: 'Como funciona o pagamento?', resposta: 'O comprador paga dentro da plataforma e o valor é repassado ao vendedor descontada a taxa.' },
  { pergunta: 'E se o insumo chegar com problema?', resposta: 'Depois de cada compra você avalia o vendedor. Notas baixas com evidências podem bloquear o lojista.' },
]

export default function Faq() {
  // Guarda qual pergunta está aberta (-1 = nenhuma)
  const [aberta, setAberta] = useState(0)

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 px-6 py-12">
      <Titulo titulo="Perguntas frequentes" />
      <ul className="flex flex-col gap-3">
        {perguntas.map((item, i) => (
          <li key={item.pergunta} className="rounded-2xl bg-white">
            <button onClick={() => setAberta(aberta === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold">
              {item.pergunta}
              <span className="text-2xl text-zf-verde">{aberta === i ? '−' : '+'}</span>
            </button>
            {aberta === i && <p className="px-5 pb-5 text-neutral-700">{item.resposta}</p>}
          </li>
        ))}
      </ul>
    </main>
  )
}
