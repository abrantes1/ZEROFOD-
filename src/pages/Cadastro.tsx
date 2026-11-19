import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { post } from '../services/api'
import { salvarLojista } from '../sessao'
import { Erro, btnPrimario, estiloCampo, estiloLabel } from '../components/ui'
import { mascaraCnpj } from '../utils'

export default function Cadastro() {
  const navigate = useNavigate()
  const [cnpj, setCnpj] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [erros, setErros] = useState<Record<string, string>>({})
  const [erroApi, setErroApi] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function cadastrar(e: FormEvent) {
    e.preventDefault()
    setErroApi('')

    // Validação dos campos
    const novosErros: Record<string, string> = {}
    if (cnpj.length !== 18) novosErros.cnpj = 'Digite os 14 números do CNPJ.'
    if (nome.trim().length < 2) novosErros.nome = 'Informe o nome do estabelecimento.'
    if (!email.includes('@') || !email.includes('.')) novosErros.email = 'Informe um e-mail válido.'
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    setCarregando(true)
    try {
      // POST /api/lojistas (a API pede razão social, então mandamos o mesmo nome)
      const lojista = await post('/api/lojistas', { cnpj, razaoSocial: nome, nomeFantasia: nome, email })
      salvarLojista(lojista)
      navigate('/ofertas')
    } catch {
      setErroApi('Não foi possível criar a conta. Confira se o CNPJ já não está cadastrado.')
    }
    setCarregando(false)
  }

  return (
    <main className="flex justify-center px-6 py-14">
      <form noValidate onSubmit={cadastrar} className="flex w-full max-w-md flex-col gap-5 rounded-3xl bg-white p-8 shadow-sm">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Criar conta</h1>
          <p className="text-neutral-600">Grátis para estabelecimentos de alimentação.</p>
        </div>

        <label className={estiloLabel}>CNPJ
          <input value={cnpj} onChange={(e) => setCnpj(mascaraCnpj(e.target.value))} placeholder="00.000.000/0000-00" className={estiloCampo} />
          {erros.cnpj && <span className="text-sm font-normal text-red-700">{erros.cnpj}</span>}
        </label>
        <label className={estiloLabel}>Nome do estabelecimento
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Pizzaria do Bairro" className={estiloCampo} />
          {erros.nome && <span className="text-sm font-normal text-red-700">{erros.nome}</span>}
        </label>
        <label className={estiloLabel}>E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contato@loja.com" className={estiloCampo} />
          {erros.email && <span className="text-sm font-normal text-red-700">{erros.email}</span>}
        </label>

        {erroApi && <Erro texto={erroApi} />}
        <button type="submit" disabled={carregando} className={btnPrimario}>{carregando ? 'Criando conta…' : 'Criar conta'}</button>
        <p className="text-center text-neutral-600">Já tem conta? <Link to="/entrar" className="font-semibold text-zf-escuro underline">Entrar</Link></p>
      </form>
    </main>
  )
}
