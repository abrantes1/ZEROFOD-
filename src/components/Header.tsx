import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { pegarLojista, sair } from '../sessao'

const paginas = [
  { link: '/', nome: 'Home' },
  { link: '/sobre', nome: 'Sobre' },
  { link: '/integrantes', nome: 'Integrantes' },
  { link: '/faq', nome: 'FAQ' },
  { link: '/contato', nome: 'Contato' },
]
const paginasLogado = [
  { link: '/ofertas', nome: 'Ofertas' },
  { link: '/anunciar', nome: 'Novo anúncio' },
  { link: '/impacto', nome: 'Meu impacto' },
]

// Link verde quando é a página atual
function estiloLink({ isActive }: { isActive: boolean }) {
  return `block whitespace-nowrap rounded-lg px-2.5 py-2 font-semibold ${isActive ? 'bg-zf-claro text-zf-escuro' : 'text-neutral-700'}`
}

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false)
  const navigate = useNavigate()
  const lojista = pegarLojista()
  const links = lojista ? [...paginas, ...paginasLogado] : paginas

  function clicarSair() {
    sair()
    navigate('/')
  }

  const conta = lojista ? (
    <div className="flex flex-wrap items-center gap-x-3">
      <span className="max-w-40 truncate text-sm text-neutral-600">{lojista.nomeFantasia}</span>
      <button onClick={clicarSair} className="text-sm font-semibold text-zf-escuro underline">Sair</button>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Link to="/entrar" className="px-2 font-semibold text-zf-escuro">Entrar</Link>
      <Link to="/cadastro" className="rounded-full bg-zf-escuro px-5 py-3 font-semibold text-white">Criar conta B2B</Link>
    </div>
  )

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-3">
        <Link to="/"><Logo /></Link>

        {/* Menu do computador (telas grandes) */}
        <nav className="hidden items-center gap-1 text-[15px] lg:flex">
          {links.map((p) => <NavLink key={p.link} to={p.link} end className={estiloLink}>{p.nome}</NavLink>)}
        </nav>
        <div className="hidden lg:block">{conta}</div>

        {/* Botão hambúrguer (celular e tablet) */}
        <button onClick={() => setMenuAberto(!menuAberto)} aria-label="Abrir menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-300 text-xl lg:hidden">
          {menuAberto ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu do celular */}
      {menuAberto && (
        <nav onClick={() => setMenuAberto(false)} className="border-t border-neutral-200 px-6 pb-5 pt-3 lg:hidden">
          {links.map((p) => <NavLink key={p.link} to={p.link} end className={estiloLink}>{p.nome}</NavLink>)}
          <div className="mt-4 border-t border-neutral-200 pt-4">{conta}</div>
        </nav>
      )}
    </header>
  )
}
