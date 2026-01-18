import { ArrowLeft, Plus, Search, MoreVertical, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MerchantProducts = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "全部" },
    { id: "coffee", label: "咖啡" },
    { id: "tea", label: "茶飲" },
    { id: "dessert", label: "甜點" },
    { id: "meal", label: "輕食" },
  ];

  const products = [
    { id: 1, name: "經典拿鐵", category: "coffee", price: 120, stock: "充足", status: "active" },
    { id: 2, name: "美式咖啡", category: "coffee", price: 90, stock: "充足", status: "active" },
    { id: 3, name: "抹茶拿鐵", category: "tea", price: 130, stock: "充足", status: "active" },
    { id: 4, name: "提拉米蘇", category: "dessert", price: 150, stock: "低庫存", status: "active" },
    { id: 5, name: "巧克力蛋糕", category: "dessert", price: 140, stock: "缺貨", status: "inactive" },
    { id: 6, name: "帕尼尼三明治", category: "meal", price: 180, stock: "充足", status: "active" },
  ];

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const getStockStyle = (stock: string) => {
    switch (stock) {
      case "充足": return "bg-primary/10 text-primary";
      case "低庫存": return "bg-accent/10 text-accent";
      case "缺貨": return "bg-destructive/10 text-destructive";
      default: return "bg-secondary text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-5 py-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl"
            onClick={() => navigate("/merchant")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">商品管理</h1>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Add Product Button */}
        <Button className="w-full h-14 rounded-2xl btn-press gap-2">
          <Plus className="w-5 h-5" />
          新增商品
        </Button>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="搜尋商品..." 
            className="pl-11 rounded-2xl h-12 border-border"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              className="rounded-full shrink-0"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Products List */}
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="rounded-2xl border-border shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{product.name}</h3>
                      {product.status === "inactive" && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          已下架
                        </span>
                      )}
                    </div>
                    <p className="text-primary font-medium">NT$ {product.price}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStockStyle(product.stock)}`}>
                      {product.stock}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-xl shrink-0">
                    <MoreVertical className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="rounded-2xl border-border shadow-soft">
          <CardContent className="p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">共 {filteredProducts.length} 項商品</span>
              <span className="text-muted-foreground">
                上架中 {filteredProducts.filter(p => p.status === "active").length} 項
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MerchantProducts;
