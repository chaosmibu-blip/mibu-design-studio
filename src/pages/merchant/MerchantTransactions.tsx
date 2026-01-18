import { ArrowLeft, Search, Filter, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const MerchantTransactions = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "全部" },
    { id: "coupon", label: "優惠券" },
    { id: "points", label: "點數" },
    { id: "refund", label: "退款" },
  ];

  const transactions = [
    { id: 1, type: "coupon", desc: "咖啡買一送一", customer: "王小明", amount: "-1 張", time: "今天 14:30", status: "completed" },
    { id: 2, type: "coupon", desc: "甜點9折券", customer: "李小花", amount: "-1 張", time: "今天 12:15", status: "completed" },
    { id: 3, type: "points", desc: "點數核銷", customer: "張大華", amount: "-50 點", time: "今天 10:00", status: "completed" },
    { id: 4, type: "coupon", desc: "飲品第二杯半價", customer: "陳小美", amount: "-1 張", time: "昨天 16:45", status: "completed" },
    { id: 5, type: "refund", desc: "優惠券退回", customer: "林小明", amount: "+1 張", time: "昨天 09:30", status: "refunded" },
  ];

  const filteredTransactions = activeFilter === "all" 
    ? transactions 
    : transactions.filter(t => t.type === activeFilter);

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
          <h1 className="text-xl font-bold text-foreground">交易記錄</h1>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="搜尋交易記錄..." 
            className="pl-11 rounded-2xl h-12 border-border"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              className="rounded-full shrink-0"
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="rounded-2xl border-border shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{transaction.desc}</p>
                    <p className="text-sm text-muted-foreground">{transaction.customer}</p>
                    <p className="text-xs text-muted-foreground mt-1">{transaction.time}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.status === "refunded" ? "text-accent" : "text-primary"}`}>
                      {transaction.amount}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      transaction.status === "completed" 
                        ? "bg-primary/10 text-primary" 
                        : "bg-accent/10 text-accent"
                    }`}>
                      {transaction.status === "completed" ? "已完成" : "已退款"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <Button variant="outline" className="w-full rounded-2xl h-12">
          載入更多
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MerchantTransactions;
