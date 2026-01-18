import { ArrowLeft, Plus, MapPin, Phone, Clock, ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MerchantStores = () => {
  const navigate = useNavigate();

  const stores = [
    {
      id: 1,
      name: "示範咖啡廳 - 信義店",
      address: "台北市信義區松仁路100號",
      phone: "02-2720-1234",
      hours: "08:00 - 22:00",
      rating: 4.8,
      status: "active",
    },
    {
      id: 2,
      name: "示範咖啡廳 - 大安店",
      address: "台北市大安區復興南路一段200號",
      phone: "02-2755-5678",
      hours: "09:00 - 21:00",
      rating: 4.6,
      status: "active",
    },
    {
      id: 3,
      name: "示範咖啡廳 - 中山店",
      address: "台北市中山區南京東路二段50號",
      phone: "02-2541-9012",
      hours: "07:30 - 20:00",
      rating: 4.7,
      status: "pending",
    },
  ];

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
          <h1 className="text-xl font-bold text-foreground">店家管理</h1>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Add Store Button */}
        <Button className="w-full h-14 rounded-2xl btn-press gap-2">
          <Plus className="w-5 h-5" />
          認領新店家
        </Button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="rounded-2xl border-border shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">總店家數</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">2</p>
              <p className="text-xs text-muted-foreground">已認證</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-accent">1</p>
              <p className="text-xs text-muted-foreground">審核中</p>
            </CardContent>
          </Card>
        </div>

        {/* Stores List */}
        <div className="space-y-3">
          {stores.map((store) => (
            <Card 
              key={store.id} 
              className="rounded-2xl border-border shadow-soft cursor-pointer card-hover"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{store.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        store.status === "active" 
                          ? "bg-primary/10 text-primary" 
                          : "bg-accent/10 text-accent"
                      }`}>
                        {store.status === "active" ? "營業中" : "審核中"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-accent">
                      <Star className="w-4 h-4 fill-accent" />
                      <span>{store.rating}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{store.hours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantStores;
