import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, ExternalLink, Apple, Store, User } from "lucide-react";
import mibuLogo from "@/assets/mibu-logo.jpeg";

type UserType = "consumer" | "merchant";

const LoginPage = () => {
  const [userType, setUserType] = useState<UserType>("consumer");

  const toggleUserType = () => {
    setUserType(prev => prev === "consumer" ? "merchant" : "consumer");
  };

  const handleLogin = (method: string) => {
    if (userType === "consumer") {
      window.location.href = "/home";
    } else {
      window.location.href = "/merchant";
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={mibuLogo}
            alt="Mibu Logo"
            className="w-12 h-12 object-contain rounded-lg"
          />
          <span className="text-xl font-bold text-foreground tracking-widest">MIBU</span>
        </div>
        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
          <Globe className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Switch user type button */}
      <div className="text-right px-4 mt-2">
        <button 
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          onClick={toggleUserType}
        >
          {userType === "consumer" ? (
            <>
              <Store className="w-4 h-4" />
              切換至商家端
            </>
          ) : (
            <>
              <User className="w-4 h-4" />
              切換至用戶端
            </>
          )}
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* User type indicator */}
        <div className="mb-6">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            userType === "consumer" 
              ? "bg-primary/10 text-primary" 
              : "bg-accent/10 text-accent"
          }`}>
            {userType === "consumer" ? (
              <>
                <User className="w-4 h-4" />
                用戶端
              </>
            ) : (
              <>
                <Store className="w-4 h-4" />
                商家端
              </>
            )}
          </span>
        </div>

        {/* Logo text */}
        <h1 className="text-5xl font-bold text-foreground mb-3 tracking-wide">
          Mibu
        </h1>
        <p className="text-primary text-base mb-12">
          {userType === "consumer" 
            ? "今天去哪玩?老天說了算" 
            : "商家後台管理系統"
          }
        </p>

        {/* Login buttons */}
        <div className="w-full max-w-sm space-y-3">
          <Button
            className="w-full h-14 text-base font-medium rounded-full bg-primary hover:bg-primary/90 text-primary-foreground btn-press"
            onClick={() => handleLogin("google")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Google 登入
          </Button>

          <Button
            className="w-full h-14 text-base font-medium rounded-full bg-foreground hover:bg-foreground/90 text-background btn-press"
            onClick={() => handleLogin("apple")}
          >
            <Apple className="w-4 h-4 mr-2" />
            使用 Apple 登入
          </Button>

          {userType === "consumer" && (
            <Button
              variant="outline"
              className="w-full h-14 text-base font-medium rounded-full border-border text-foreground hover:bg-secondary btn-press"
              onClick={() => handleLogin("guest")}
            >
              訪客登入
            </Button>
          )}

          <p className="text-center text-sm text-primary mt-4">
            {userType === "consumer" 
              ? "訪客模式的資料僅保存在此裝置"
              : "請使用商家帳號登入"
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
