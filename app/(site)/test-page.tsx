export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎨 Test de Estilos
        </h1>
        <p className="text-gray-600 mb-6">
          Si ves colores y este diseño bonito, ¡Tailwind está funcionando!
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
          ¡Funciona! 🎉
        </button>
      </div>
    </div>
  )
}