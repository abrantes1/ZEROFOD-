import { Link } from 'react-router-dom'
import Titulo from '../components/Titulo'
import { integrantes } from '../data/integrantes'

export default function Integrantes() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
      <Titulo titulo="Integrantes" subtitulo="A equipe da turma 1TDSPO por trás do ZeroFood." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {integrantes.map((pessoa) => (
          <Link key={pessoa.rm} to={`/integrantes/${pessoa.rm}`} className="flex items-center gap-4 rounded-2xl bg-white p-5 hover:ring-2 hover:ring-zf-lima">
            <img src={`/fotos/${pessoa.rm}.jpeg`} alt={pessoa.nome} className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-zf-lima" />
            <div className="flex min-w-0 flex-col">
              <strong className="truncate">{pessoa.nome}</strong>
              <span className="text-sm text-neutral-600">RM {pessoa.rm} · {pessoa.turma}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
