export type DashboardMovement = {
  product: string;
  type: string;
  quantity: number;
  date: string;
};

export type DashboardWeekly = {
  day: string;
  entradas: number;
  saidas: number;
};

export type DashboardCategory = {
  categoria: string;
  valor: number;
};

export type DashboardTopProduct = {
  name: string;
  movimentado: number;
};

export type DashboardStock = {
  day: string;
  estoque: number;
};

export type DashboardData = {
  totalStock: number;
  recentEntries: number;
  recentExits: number;
  criticalStock: number;
  totalStockValue: number;
  weeklyData: DashboardWeekly[];
  evolucaoMovimentacoes: DashboardWeekly[];
  topProducts: DashboardTopProduct[];
  categoriasEstoque: DashboardCategory[];
  recentMovements: DashboardMovement[];
  estoqueHistorico: DashboardStock[];
};
