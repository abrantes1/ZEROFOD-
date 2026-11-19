// Formato dos dados que a API devolve

export interface Lojista {
  idLojista: number
  razaoSocial: string
  nomeFantasia: string
  cnpj: string
  email: string
}

export interface Categoria {
  idCategoria: number
  nomeCategoria: string
}

export interface Insumo {
  idInsumo: number
  nome: string
  nomeCategoria: string
}

export interface Anuncio {
  idAnuncio: number
  idLojista: number
  nomeFantasiaLojista: string
  nomeInsumo: string
  nomeCategoria: string
  quantidadeEstoque: number
  valorUnitario: number
  dataValidade: string
}

export interface Transacao {
  idTransacao: number
  idAnuncio: number
  idLojistaComprador: number
  nomeInsumo: string
  dataHora: string
  quantidadeVendida: number
  valorTotal: number
}
