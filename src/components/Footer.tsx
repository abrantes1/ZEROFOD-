import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-zf-escuro text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6 px-6 py-10">
        <div className="flex max-w-sm flex-col gap-3">
          <Logo claro />
          <p className="text-sm opacity-85">Marketplace B2B hiperlocal contra o desperdício de insumos. Global Solution 2026 · FIAP · 1TDSPO.</p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm font-semibold">
          <Link to="/sobre">Sobre</Link>
          <Link to="/integrantes">Integrantes</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contato">Contato</Link>
        </nav>
      </div>
    </footer>
  )
}
