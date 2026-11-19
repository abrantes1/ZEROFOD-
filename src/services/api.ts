// Endereço da API Java (vem do .env; se não existir, usa o Render)
const API = import.meta.env.VITE_API_URL || 'https://zerofood-zzer.onrender.com'

// Busca dados na API (GET)
export async function get(caminho: string) {
  const resposta = await fetch(API + caminho)
  if (!resposta.ok) throw new Error('Erro ' + resposta.status)
  return resposta.json()
}

// Envia dados para a API (POST)
export async function post(caminho: string, dados: object) {
  const resposta = await fetch(API + caminho, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  if (!resposta.ok) throw new Error('Erro ' + resposta.status)
  return resposta.json()
}
