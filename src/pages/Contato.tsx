import { useState, type FormEvent } from 'react'
import Titulo from '../components/Titulo'
import { btnPrimario, estiloCampo, estiloLabel } from '../components/ui'

export default function Contato() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [assunto, setAssunto] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [erros, setErros] = useState<Record<string, string>>({})
  const [enviado, setEnviado] = useState(false)

  function enviar(e: FormEvent) {
    e.preventDefault()

    // Validação dos campos
    const novosErros: Record<string, string> = {}
    if (nome.trim().length < 3) novosErros.nome = 'Informe seu nome (mínimo 3 letras).'
    if (!email.includes('@') || !email.includes('.')) novosErros.email = 'Informe um e-mail válido.'
    if (assunto === '') novosErros.assunto = 'Escolha um assunto.'
    if (mensagem.trim().length < 10) novosErros.mensagem = 'Escreva pelo menos 10 caracteres.'
    setErros(novosErros)

    if (Object.keys(novosErros).length > 0) {
      setEnviado(false)
      return
    }
    setEnviado(true)
    setNome(''); setEmail(''); setAssunto(''); setMensagem('')
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-wrap gap-10 px-6 py-12">
      <div className="flex flex-[1_1_300px] flex-col gap-6">
        <Titulo titulo="Contato" subtitulo="Dúvidas, parcerias ou sugestões? Fale com a equipe ZeroFood." />
        <div className="flex flex-col gap-1 rounded-2xl bg-zf-escuro p-6 text-white">
          <strong>E-mail</strong><span className="opacity-90">[e-mail de contato do grupo]</span>
          <strong className="mt-3">Endereço</strong><span className="opacity-90">FIAP · São Paulo, SP</span>
        </div>
      </div>

      <form noValidate onSubmit={enviar} className="flex min-w-0 flex-[999_1_420px] flex-col gap-4 rounded-3xl bg-white p-8">
        <label className={estiloLabel}>Nome
          <input value={nome} onChange={(e) => setNome(e.target.value)} className={estiloCampo} />
          {erros.nome && <span className="text-sm font-normal text-red-700">{erros.nome}</span>}
        </label>
        <label className={estiloLabel}>E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={estiloCampo} />
          {erros.email && <span className="text-sm font-normal text-red-700">{erros.email}</span>}
        </label>
        <label className={estiloLabel}>Assunto
          <select value={assunto} onChange={(e) => setAssunto(e.target.value)} className={estiloCampo}>
            <option value="">Escolha…</option>
            <option>Dúvida</option>
            <option>Parceria</option>
            <option>Sugestão</option>
            <option>Problema técnico</option>
          </select>
          {erros.assunto && <span className="text-sm font-normal text-red-700">{erros.assunto}</span>}
        </label>
        <label className={estiloLabel}>Mensagem
          <textarea rows={5} value={mensagem} onChange={(e) => setMensagem(e.target.value)} className={estiloCampo} />
          {erros.mensagem && <span className="text-sm font-normal text-red-700">{erros.mensagem}</span>}
        </label>

        {enviado && <div className="rounded-xl bg-zf-claro px-4 py-3 text-zf-escuro">Mensagem enviada! Responderemos em até 2 dias úteis.</div>}
        <button type="submit" className={`${btnPrimario} self-start`}>Enviar mensagem</button>
      </form>
    </main>
  )
}
