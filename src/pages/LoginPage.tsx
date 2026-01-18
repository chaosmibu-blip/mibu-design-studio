import { Button } from "@/components/ui/button";
import { Globe, ExternalLink, Apple } from "lucide-react";
import mibuLogo from "@/assets/mibu-logo.jpeg";

const LoginPage = () => {
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

      {/* Switch user link */}
      <div className="text-right px-4 mt-2">
        <button className="text-sm text-primary">切換用戶別</button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo text */}
        <h1 className="text-5xl font-bold text-foreground mb-3 tracking-wide">
          Mibu
        </h1>
        <p className="text-primary text-base mb-12">今天去哪玩?老天說了算</p>

        {/* Login buttons */}
        <div className="w-full max-w-sm space-y-3">
          <Button
            className="w-full h-14 text-base font-medium rounded-full bg-primary hover:bg-primary/90 text-primary-foreground btn-press"
            onClick={() => window.location.href = "/home"}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Google 登入
          </Button>

          <Button
            className="w-full h-14 text-base font-medium rounded-full bg-foreground hover:bg-foreground/90 text-background btn-press"
            onClick={() => window.location.href = "/home"}
          >
            <Apple className="w-4 h-4 mr-2" />
            使用 Apple 登入
          </Button>

          <Button
            variant="outline"
            className="w-full h-14 text-base font-medium rounded-full border-border text-foreground hover:bg-secondary btn-press"
            onClick={() => window.location.href = "/home"}
          >
            訪客登入
          </Button>

          <p className="text-center text-sm text-primary mt-4">
            訪客模式的資料僅保存在此裝置
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
