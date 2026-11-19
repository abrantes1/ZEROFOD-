// Logo da ZeroFood (o "Z" de setas). "claro" = versão branca para fundo escuro
export default function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <svg width="32" height="32" viewBox="0 0 100 100">
        <path d="M8 34 C8 18 20 10 32 10 L78 10 L78 0 L100 20 L56 74 L44 74 L76 34 Z" fill={claro ? '#fff' : '#075c2c'} />
        <path d="M92 66 C92 82 80 90 68 90 L28 90 L28 100 L0 80 L40 40 L52 40 L28 66 Z" fill="#50b80d" />
      </svg>
      <span className={`font-display text-2xl font-extrabold ${claro ? 'text-white' : 'text-neutral-900'}`}>ZeroFood</span>
    </span>
  )
}
