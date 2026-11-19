// Título usado no topo das páginas
export default function Titulo({ titulo, subtitulo }: { titulo: string; subtitulo?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-display text-3xl font-extrabold md:text-4xl">{titulo}</h1>
      {subtitulo && <p className="max-w-2xl text-lg text-neutral-600">{subtitulo}</p>}
    </div>
  )
}
