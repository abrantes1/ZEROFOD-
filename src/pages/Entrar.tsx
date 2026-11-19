import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { get } from '../services/api'
import { salvarLojista } from '../sessao'
import type { Lojista } from '../types'
import { Erro, btnPrimario, estiloCampo, estiloLabel } from '../components/ui'
import { mascaraCnpj } from '../utils'

export default function Entrar() {
  const navigate = useNavigate()
  const [cnpj, setCnpj] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function entrar(e: FormEvent) {
    e.preventDefault()
    setErro('')
    if (cnpj.length !== 18) {
      setErro('Digite os 14 números do CNPJ.')
      return
    }

    setCarregando(true)
    try {
      // A API não tem login: buscamos todos os lojistas e procuramos o CNPJ
      const lojistas: Lojista[] = await get('/api/lojistas')
      const lojista = lojistas.find((l) => l.cnpj === cnpj)
      if (lojista) {
        salvarLojista(lojista)
        navigate('/ofertas')
      } else {
        setErro('Nenhum estabelecimento com esse CNPJ. Confira ou crie uma conta.')
      }
    } catch {
      setErro('Não foi possível falar com o servidor. Tente novamente.')
    }
    setCarregando(false)
  }

  return (
    <main className="flex justify-center px-6 py-14">
      <form noValidate onSubmit={entrar} className="flex w-full max-w-md flex-col gap-5 rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="font-display text-3xl font-extrabold">Entrar</h1>
        <label className={estiloLabel}>CNPJ do estabelecimento
          <input value={cnpj} onChange={(e) => setCnpj(mascaraCnpj(e.target.value))} placeholder="00.000.000/0000-00" className={estiloCampo} />
        </label>
        {erro && <Erro texto={erro} />}
        <button type="submit" disabled={carregando} className={btnPrimario}>{carregando ? 'Entrando…' : 'Entrar'}</button>
        <p className="text-center text-neutral-600">Ainda não tem conta? <Link to="/cadastro" className="font-semibold text-zf-escuro underline">Criar conta</Link></p>
      </form>
    </main>
  )
}
