import Titulo from '../components/Titulo'

const blocos = [
  { titulo: 'O problema', texto: 'Pequenos negócios de gastronomia compram demais ou de menos. O que sobra vence e vai para o lixo; o que falta precisa ser comprado às pressas, caro e com pedido mínimo.' },
  { titulo: 'A solução', texto: 'Um marketplace B2B hiperlocal: o lojista anuncia o excedente a preço de custo e o vizinho compra na hora, com pagamento dentro da plataforma e avaliação mútua.' },
  { titulo: 'O modelo', texto: 'Cadastro e anúncios gratuitos. A ZeroFood retém de 8% a 12% apenas sobre os repasses concluídos.' },
  { titulo: 'CitizenTech', texto: 'Tecnologia a serviço do bairro, alinhada aos ODS 2 (Fome Zero), 11 (Cidades Sustentáveis) e 12 (Consumo Responsável) da ONU.' },
]

export default function Sobre() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
      <Titulo titulo="Sobre o ZeroFood" subtitulo="Por que criamos uma rede de repasse de insumos entre estabelecimentos vizinhos." />
      <div className="grid gap-5 md:grid-cols-2">
        {blocos.map((b) => (
          <section key={b.titulo} className="flex flex-col gap-2 rounded-2xl bg-white p-6">
            <h2 className="font-display text-xl font-bold text-zf-escuro">{b.titulo}</h2>
            <p className="text-neutral-700">{b.texto}</p>
          </section>
        ))}
      </div>
      <section className="flex flex-col gap-3 rounded-2xl bg-zf-escuro p-6 text-white">
        <h2 className="font-display text-xl font-bold">Tecnologias</h2>
        <p className="opacity-90">Front-end em React + Vite + TypeScript com Tailwind CSS, consumindo a ZeroFoodAPI em Java com Spring Boot e banco Oracle.</p>
      </section>
    </main>
  )
}
