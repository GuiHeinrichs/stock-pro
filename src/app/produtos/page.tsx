"use client";
import {
  Table,
  Button,
  message,
  Tooltip,
  Tag,
  Input,
  Form,
  Select,
} from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Product } from "@/types/Product";
import ProductModalContainer from "./components/containers/ProductModalContainer";
import { ModalMode } from "@/types/ModalMode";
import { ValidityMessage } from "@/types/ValidityMessage";
import { ValidityMessageValidation } from "@/app/lib/createValidityMessage";
import { useCategories } from "@/app/hooks/categories/useCategories";
import { Category } from "@/types/Category";

const { Search } = Input;
const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.CREATE);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  // Função para deletar produto
  const handleDeleteProduct = async (toDeleteProduct: Product) => {
    try {
      const response = await fetch(
        `/produtos/api/delete?id=${toDeleteProduct.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data) {
        const successData: ValidityMessage = {
          type: "success",
          content: "Produto removido com sucesso.",
          className: "mt-8",
        };
        ValidityMessageValidation(successData, messageApi);
        setProducts((prev) => prev.filter((p) => p.id !== toDeleteProduct.id));
      }
    } catch (error) {
      const errorData: ValidityMessage = {
        type: "error",
        content: "Erro ao remover Produto.",
        className: "mt-8",
      };
      ValidityMessageValidation(errorData, messageApi);
    }
  };

  // Filtros
  const [filters, setFilters] = useState({
    name: "",
    categoryId: null as number | null,
    minCost: undefined as number | undefined,
    maxCost: undefined as number | undefined,
    minSale: undefined as number | undefined,
    maxSale: undefined as number | undefined,
  });

  // Categorias
  const { categories = [] } = useCategories();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/produtos/api/get");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchProducts();
  }, [refetchTrigger]);

  // KPIs em linha (sem cards)
  const totalStock = useMemo(
    () => products.reduce((acc, p) => acc + (p.quantity || 0), 0),
    [products]
  );
  const criticalStockCount = useMemo(
    () => products.filter((p) => p.quantity === 0).length,
    [products]
  );
  const lowStockCount = useMemo(
    () => products.filter((p) => p.quantity > 0 && p.quantity < 5).length,
    [products]
  );

  // Filtro dos produtos
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const nameMatch =
        filters.name === "" ||
        product.name.toLowerCase().includes(filters.name.toLowerCase());
      const categoryMatch =
        !filters.categoryId || product.categoryId === filters.categoryId;
      const priceMatch =
        (filters.minCost === undefined || product.price >= filters.minCost) &&
        (filters.maxCost === undefined || product.price <= filters.maxCost);
      const saleMatch =
        (filters.minSale === undefined ||
          product.sellingPrice >= filters.minSale) &&
        (filters.maxSale === undefined ||
          product.sellingPrice <= filters.maxSale);
      return nameMatch && categoryMatch && priceMatch && saleMatch;
    });
  }, [products, filters]);

  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Descrição", dataIndex: "description", key: "description" },
    {
      title: "Preço custo",
      dataIndex: "price",
      key: "price",
      render: (value: number) => <Tag color="cyan">R$ {value.toFixed(2)}</Tag>,
    },
    {
      title: "Preço venda",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      render: (value: number) => <Tag color="gold">R$ {value.toFixed(2)}</Tag>,
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number) => (
        <Tag
          color={
            quantity === 0 ? "error" : quantity < 5 ? "warning" : "success"
          }
        >
          {quantity}
        </Tag>
      ),
    },
    {
      title: "Categoria",
      dataIndex: ["Category", "title"],
      key: "title",
      render: (title: string) => <Tag color="blue">{title}</Tag>,
    },
    { title: "Fornecedor", dataIndex: ["Supplier", "name"], key: "supplier" },
    {
      title: "Criado em",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: Product) => (
        <div className="flex justify-center gap-2">
          <Tooltip color="#F1592A" title="Visualizar">
            <Button
              size="small"
              icon={<Eye size={16} />}
              onClick={() => {
                setSelectedProduct(record);
                setModalMode(ModalMode.VIEW);
                setIsModalOpen(true);
              }}
            />
          </Tooltip>
          <Tooltip color="#F1592A" title="Editar">
            <Button
              size="small"
              icon={<Pencil size={16} />}
              onClick={() => {
                setSelectedProduct(record);
                setModalMode(ModalMode.EDIT);
                setIsModalOpen(true);
              }}
            />
          </Tooltip>
          <Tooltip color="#F1592A" title="Excluir">
            <Button
              size="small"
              icon={<Trash2 size={16} />}
              danger
              onClick={() => {
                setSelectedProduct(record);
                handleDeleteProduct(record);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="px-4 py-4 md:px-10 xl:px-20 space-y-8 bg-[#f9f9f9] min-h-screen">
      {contextHolder} {/* Toast */}
      {/* KPIs */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <p className="text-sm text-[#666]">Itens no estoque</p>
          <p className="text-lg font-semibold text-[#1F1F1F]">{totalStock}</p>
        </div>
        <div className="rounded-lg border border-yellow-400 bg-yellow-50 p-4 shadow-sm">
          <p className="text-sm text-yellow-700">Produtos em estoque crítico</p>
          <p className="text-lg font-semibold text-yellow-700">
            {criticalStockCount}
          </p>
        </div>
        <div className="rounded-lg border border-green-400 bg-green-50 p-4 shadow-sm">
          <p className="text-sm text-green-700">
            Produtos com menos de 5 unidades
          </p>
          <p className="text-lg font-semibold text-green-700">
            {lowStockCount}
          </p>
        </div>
      </div>
      {/* Filtros em linha com labels acima dos inputs */}
      <div className="rounded-lg border bg-white p-4 shadow-sm mb-4 flex justify-center items-center">
        <Form layout="vertical" className="gap-y-2 flex flex-wrap gap-x-8">
          <Form.Item label="Produto">
            <Search
              placeholder="Buscar por nome"
              allowClear
              value={filters.name}
              onChange={(e) =>
                setFilters((f) => ({ ...f, name: e.target.value }))
              }
              style={{ width: 250 }}
            />
          </Form.Item>
          <Form.Item label="Categoria">
            <Select
              allowClear
              placeholder="Selecionar"
              value={filters.categoryId}
              onChange={(value) =>
                setFilters((f) => ({ ...f, categoryId: value }))
              }
              style={{ width: 200 }}
            >
              {categories.map((cat: Category) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Preço custo (mín)">
            <Input
              type="number"
              min={0}
              placeholder="Mín"
              style={{ width: 150 }}
              value={filters.minCost}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  minCost: Number(e.target.value) || undefined,
                }))
              }
            />
          </Form.Item>
          <Form.Item label="Preço custo (máx)">
            <Input
              type="number"
              min={0}
              placeholder="Máx"
              style={{ width: 150 }}
              value={filters.maxCost}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  maxCost: Number(e.target.value) || undefined,
                }))
              }
            />
          </Form.Item>
          <Form.Item label="Preço venda (mín)">
            <Input
              type="number"
              min={0}
              placeholder="Mín"
              style={{ width: 150 }}
              value={filters.minSale}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  minSale: Number(e.target.value) || undefined,
                }))
              }
            />
          </Form.Item>
          <Form.Item label="Preço venda (máx)">
            <Input
              type="number"
              min={0}
              placeholder="Máx"
              style={{ width: 150 }}
              value={filters.maxSale}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  maxSale: Number(e.target.value) || undefined,
                }))
              }
            />
          </Form.Item>
        </Form>
      </div>
      <Table
        columns={columns}
        bordered
        pagination={{ position: ["bottomCenter"] }}
        dataSource={filteredProducts.map((product) => ({
          ...product,
          key: product.id,
        }))}
      />
      <div className="flex justify-between items-center mt-4">
        <div /> {/* espaço à esquerda ou para inserir info futura */}
        <Button
          type="primary"
          className="!bg-[#F1592A] hover:!bg-[#F1592A]/90"
          onClick={() => {
            setModalMode(ModalMode.CREATE);
            setIsModalOpen(true);
          }}
        >
          + Novo Produto
        </Button>
      </div>
      <ProductModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        messageApi={messageApi}
        productsSetter={setProducts}
        modalMode={modalMode}
        selectedProduct={selectedProduct}
        onUpdateFinish={() => setRefetchTrigger((prev) => !prev)}
      />
    </div>
  );
};

export default Products;
