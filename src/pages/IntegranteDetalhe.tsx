import { Link, useParams } from 'react-router-dom'
import { integrantes } from '../data/integrantes'

// Rota com parâmetro: /integrantes/:rm
export default function IntegranteDetalhe() {
  const { rm } = useParams()
  const pessoa = integrantes.find((p) => p.rm === rm)

  if (!pessoa) {
    return (
      <main className="mx-auto flex max-w-xl flex-col gap-4 px-6 py-16 text-center">
        <h1 className="font-display text-3xl font-extrabold">Integrante não encontrado</h1>
        <Link to="/integrantes" className="font-semibold text-zf-escuro underline">Ver todos os integrantes</Link>
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-16 text-center">
      <img src={`/fotos/${pessoa.rm}.jpeg`} alt={pessoa.nome} className="h-28 w-28 rounded-full object-cover ring-4 ring-zf-lima" />
      <h1 className="font-display text-3xl font-extrabold">{pessoa.nome}</h1>
      <p className="text-neutral-600">RM {pessoa.rm} · Turma {pessoa.turma}</p>
      <div className="flex gap-3">
        {pessoa.github && <a href={pessoa.github} target="_blank" className="rounded-full bg-zf-escuro px-5 py-3 font-semibold text-white">GitHub</a>}
        {pessoa.linkedin && <a href={pessoa.linkedin} target="_blank" className="rounded-full border-2 border-zf-escuro px-5 py-2.5 font-semibold text-zf-escuro">LinkedIn</a>}
      </div>
      <Link to="/integrantes" className="font-semibold text-zf-escuro underline">← Voltar para a equipe</Link>
    </main>
  )
}
