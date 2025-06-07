"use client";
import {
  ArrowDown,
  ArrowUp,
  PackageCheck,
  AlertTriangle,
  Warehouse,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import DashboardCard from "@/app/components/DashboardCard";

export default function Dashboard() {
  const recentMovements = [
    {
      product: "Teclado USB",
      type: "Entrada",
      quantity: 10,
      date: "2025-05-18 09:21",
    },
    {
      product: 'Monitor 24"',
      type: "Saída",
      quantity: 2,
      date: "2025-05-18 08:45",
    },
    {
      product: "Mouse Gamer",
      type: "Entrada",
      quantity: 15,
      date: "2025-05-17 14:10",
    },
  ];

  const weeklyData = [
    { day: "Seg", entradas: 40, saidas: 24 },
    { day: "Ter", entradas: 30, saidas: 18 },
    { day: "Qua", entradas: 20, saidas: 32 },
    { day: "Qui", entradas: 27, saidas: 20 },
    { day: "Sex", entradas: 35, saidas: 22 },
    { day: "Sáb", entradas: 45, saidas: 28 },
    { day: "Dom", entradas: 25, saidas: 15 },
  ];

  const evolucaoMovimentacoes = [
    { day: "Seg", entradas: 40, saidas: 24 },
    { day: "Ter", entradas: 30, saidas: 18 },
    { day: "Qua", entradas: 20, saidas: 32 },
    { day: "Qui", entradas: 27, saidas: 20 },
    { day: "Sex", entradas: 35, saidas: 22 },
    { day: "Sáb", entradas: 45, saidas: 28 },
    { day: "Dom", entradas: 25, saidas: 15 },
  ];

  const topProducts = [
    { name: "Teclado USB", movimentado: 50 },
    { name: 'Monitor 24"', movimentado: 38 },
    { name: "Mouse Gamer", movimentado: 60 },
    { name: "HD Externo", movimentado: 22 },
  ];

  const estoqueHistorico = [
    { day: "Seg", estoque: 1100 },
    { day: "Ter", estoque: 1120 },
    { day: "Qua", estoque: 1070 },
    { day: "Qui", estoque: 1150 },
    { day: "Sex", estoque: 1200 },
    { day: "Sáb", estoque: 1250 },
    { day: "Dom", estoque: 1230 },
  ];

  const categoriasEstoque = [
    { categoria: "Periféricos", valor: 800 },
    { categoria: "Monitores", valor: 400 },
    { categoria: "Acessórios", valor: 363 },
  ];

  const COLORS = ["#F1592A", "#2196F3", "#FFC107"];

  return (
    <main className="py-4 px-4 md:px-10 xl:px-20 space-y-8 bg-[#f9f9f9] min-h-screen">
      {/* KPIs Bento */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <DashboardCard
            title="Estoque Total"
            value="1.563"
            color="#F1592A"
            resize={false}
            icon={<PackageCheck size={28} />}
          />
          <DashboardCard
            title="Entradas Recentes"
            value="+240"
            color="#4CAF50"
            resize={false}
            icon={<ArrowDown size={28} />}
          />
          <DashboardCard
            title="Saídas Recentes"
            value="-120"
            color="#F44336"
            resize={false}
            icon={<ArrowUp size={28} />}
          />
          <DashboardCard
            title="Estoque Crítico"
            value="5"
            color="#FFC107"
            resize={false}
            icon={<AlertTriangle size={28} />}
          />
          <DashboardCard
            title="Valor Total em Estoque"
            value="R$ 18.320,00"
            color="#2196F3"
            resize={true}
            icon={<Warehouse size={28} />}
          />
        </div>
      </section>

      {/* Bento Grid: Gráficos */}
      <section className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Evolução do Estoque (Area Chart) */}
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-md col-span-2">
          <h2 className="text-lg font-bold text-[#1F1F1F] mb-4">
            Evolução do Estoque na Semana
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={estoqueHistorico}>
              <defs>
                <linearGradient id="colorEstoque" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F1592A" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F1592A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="estoque"
                stroke="#F1592A"
                fillOpacity={1}
                fill="url(#colorEstoque)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Card Produto em Destaque */}
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-md flex flex-col justify-between col-span-1">
          <h2 className="text-lg font-bold text-[#1F1F1F] mb-2">
            Produto em Destaque
          </h2>
          <p className="text-2xl font-bold text-[#F1592A] mb-1">Mouse Gamer</p>
          <span className="text-[#666666]">Movimentado 60x na semana</span>
        </div>

        {/* Pie Chart: Distribuição por Categoria */}
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-md flex flex-col items-center justify-center col-span-1">
          <h2 className="text-lg font-bold text-[#1F1F1F] mb-4 text-center">
            Distribuição por Categoria
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoriasEstoque}
                dataKey="valor"
                nameKey="categoria"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {categoriasEstoque.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart Evolução Entradas/Saídas */}
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-md flex flex-col items-center justify-center col-span-2">
          <h2 className="text-lg font-bold text-[#1F1F1F] mb-4 text-center">
            Evolução de Entradas e Saídas
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={evolucaoMovimentacoes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="entradas"
                stroke="#4CAF50"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="saidas"
                stroke="#F44336"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Produtos Movimentados (Bar Chart vertical) */}
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-md col-span-2">
          <h2 className="text-lg font-bold text-[#1F1F1F] mb-4">
            Top Produtos Movimentados
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={topProducts}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="movimentado" fill="#F1592A" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Últimas movimentações */}
      <section>
        <div className="bg-white border border-[#E0E0E0] rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-bold mb-4 text-[#1F1F1F]">
            Últimas Movimentações
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-[#666666] border-b">
                <th className="py-2">Produto</th>
                <th className="py-2">Tipo</th>
                <th className="py-2">Quantidade</th>
                <th className="py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentMovements.map((mov, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-2 text-[#1F1F1F]">{mov.product}</td>
                  <td
                    className={`py-2 ${mov.type === "Entrada" ? "text-[#4CAF50]" : "text-[#F44336]"}`}
                  >
                    {mov.type}
                  </td>
                  <td className="py-2">{mov.quantity}</td>
                  <td className="py-2 text-[#666666]">{mov.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
