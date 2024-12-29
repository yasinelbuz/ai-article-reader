type Props = {
  params: {
    level: string
  }
}

export default function ArticlesByLevel({ params }: Props) {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        {params.level.charAt(0).toUpperCase() + params.level.slice(1)} Seviye Makaleler
      </h1>
      
      <div className="grid gap-4">
        {/* Burada makaleler listelenecek */}
        <p>Bu bölümde {params.level} seviye makaleler listelenecek...</p>
      </div>
    </div>
  )
} 