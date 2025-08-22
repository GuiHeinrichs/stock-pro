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
import { useDashboardData } from "@/app/hooks/dashboard/useDashboardData";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import type { Notification } from "@/app/services/notificationService";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data } = useDashboardData();
  const { data: session } = useSession();
  const clientId = session?.user?.clientId;
  const { data: notifications } = useSWR<Notification[]>(
    clientId ? `/api/notifications?clientId=${clientId}` : null,
    fetcher,
    { refreshInterval: 30000 }
  );

  const recentMovements = data?.recentMovements ?? [];
  const weeklyData = data?.weeklyData ?? [];

  const estoqueHistorico = data?.estoqueHistorico ?? [];
  const categoriasEstoque = data?.categoriasEstoque ?? [];
  const evolucaoMovimentacoes = data?.evolucaoMovimentacoes ?? [];
  const topProducts = data?.topProducts ?? [];

  const totalStock = data?.totalStock ?? 0;
  const recentEntries = data?.recentEntries ?? 0;
  const recentExits = data?.recentExits ?? 0;
  const criticalStock = data?.criticalStock ?? 0;
  const totalStockValue = data?.totalStockValue ?? 0;

  const COLORS = ["#F1592A", "#2196F3", "#FFC107"];

  return (
    <main className="py-4 px-4 md:px-10 xl:px-20 space-y-8 bg-background dark:bg-background-dark min-h-screen">
      {notifications && notifications.length > 0 && (
        <section>
          <div className="bg-red-100 border border-red-300 text-red-800 rounded-lg p-4 mb-4">
            <h2 className="font-bold mb-2">Alertas de Estoque</h2>
            <ul className="list-disc ml-5">
              {notifications.map((n) => (
                <li key={n.id}>{n.message}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
      {/* KPIs Bento */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          <DashboardCard
            title="Estoque Total"
            value={totalStock.toString()}
            color="#F1592A"
            resize={false}
            icon={<PackageCheck size={28} />}
          />
          <DashboardCard
            title="Entradas Recentes"
            value={`+${recentEntries}`}
            color="#4CAF50"
            resize={false}
            icon={<ArrowDown size={28} />}
          />
          <DashboardCard
            title="Saídas Recentes"
            value={`-${recentExits}`}
            color="#F44336"
            resize={false}
            icon={<ArrowUp size={28} />}
          />
          <DashboardCard
            title="Estoque Crítico"
            value={criticalStock.toString()}
            color="#FFC107"
            resize={false}
            icon={<AlertTriangle size={28} />}
          />
          <DashboardCard
            title="Valor Total em Estoque"
            value={totalStockValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            color="#2196F3"
            resize={true}
            icon={<Warehouse size={28} />}
          />
        </div>
      </section>

      {/* Bento Grid: Gráficos */}
      <section className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Evolução do Estoque (Area Chart) */}
        <div className="bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-md col-span-2">
          <h2 className="text-lg font-bold text-foreground dark:text-foreground-dark mb-4">
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
        <div className="bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-md flex flex-col justify-between col-span-1">
          <h2 className="text-lg font-bold text-foreground dark:text-foreground-dark mb-2">
            Produto em Destaque
          </h2>
          <p className="text-2xl font-bold text-primary mb-1">
            {topProducts[0]?.name ?? "-"}
          </p>
          {topProducts[0] && (
            <span className="text-foregroundSec dark:text-foregroundSec-dark">
              Movimentado {topProducts[0].movimentado}x na semana
            </span>
          )}
        </div>

        {/* Pie Chart: Distribuição por Categoria */}
        <div className="bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-md flex flex-col items-center justify-center col-span-1">
          <h2 className="text-lg font-bold text-foreground dark:text-foreground-dark mb-4 text-center">
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
        <div className="bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-md flex flex-col items-center justify-center col-span-2">
          <h2 className="text-lg font-bold text-foreground dark:text-foreground-dark mb-4 text-center">
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
        <div className="bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-md col-span-2">
          <h2 className="text-lg font-bold text-foreground dark:text-foreground-dark mb-4">
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
        <div className="bg-card dark:bg-card-dark border border-border dark:border-border-dark rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-bold mb-4 text-foreground dark:text-foreground-dark">
            Últimas Movimentações
          </h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-foregroundSec dark:text-foregroundSec-dark border-b border-border dark:border-border-dark">
                <th className="py-2">Produto</th>
                <th className="py-2">Tipo</th>
                <th className="py-2">Quantidade</th>
                <th className="py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentMovements.map((mov, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-2 text-foreground dark:text-foreground-dark">{mov.product}</td>
                  <td
                    className={`py-2 ${mov.type === "Entrada" ? "text-success" : "text-danger"}`}
                  >
                    {mov.type}
                  </td>
                  <td className="py-2">{mov.quantity}</td>
                  <td className="py-2 text-foregroundSec dark:text-foregroundSec-dark">{mov.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
