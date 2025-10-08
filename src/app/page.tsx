import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
      <h1 className="text-4xl font-bold text-center">Chile Tourism Tracker</h1>
      <p className="text-xl text-muted-foreground text-center max-w-2xl">
        Ferramenta inteligente e automatizada para identificar, mapear e captar brasileiros interessados em turismo no Chile,
        especialmente passeios em Santiago e regiões próximas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="font-semibold mb-2">Mapeamento em Tempo Real</h3>
          <p className="text-sm">Monitora tendências no Google, YouTube e redes sociais</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="font-semibold mb-2">Segmentação Inteligente</h3>
          <p className="text-sm">Gera personas baseadas em comportamento digital</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="font-semibold mb-2">Relatórios Automatizados</h3>
          <p className="text-sm">Atualização contínua com insights de tráfego pago</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="font-semibold mb-2">Alertas Preditivos</h3>
          <p className="text-sm">Central de captação antes da compra de passagens</p>
        </div>
      </div>

      <Link href="/dashboard" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
        Acessar Dashboard
      </Link>
    </div>
  );
}