import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { pegarLojista } from './sessao'

import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Integrantes from './pages/Integrantes'
import IntegranteDetalhe from './pages/IntegranteDetalhe'
import Faq from './pages/Faq'
import Contato from './pages/Contato'
import Cadastro from './pages/Cadastro'
import Entrar from './pages/Entrar'
import Ofertas from './pages/Ofertas'
import NovoAnuncio from './pages/NovoAnuncio'
import Checkout from './pages/Checkout'
import Impacto from './pages/Impacto'

// Só deixa abrir a página se o lojista tiver entrado
function SoLogado({ pagina }: { pagina: JSX.Element }) {
  return pegarLojista() ? pagina : <Navigate to="/entrar" />
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <div className="flex-1">
        <Routes>
          {/* Páginas institucionais */}
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/integrantes" element={<Integrantes />} />
          <Route path="/integrantes/:rm" element={<IntegranteDetalhe />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contato" element={<Contato />} />

          {/* Páginas da solução */}
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/entrar" element={<Entrar />} />
          <Route path="/ofertas" element={<SoLogado pagina={<Ofertas />} />} />
          <Route path="/anunciar" element={<SoLogado pagina={<NovoAnuncio />} />} />
          <Route path="/checkout/:id" element={<SoLogado pagina={<Checkout />} />} />
          <Route path="/impacto" element={<SoLogado pagina={<Impacto />} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
