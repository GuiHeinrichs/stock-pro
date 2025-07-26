export const ClientService = {
  async getAll() {
    try {
      const response = await fetch("/api/client/get");
      if (!response.ok) {
        throw new Error("Erro ao buscar clientes");
      }
      return response.json();
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      throw error;
    }
  },
};
