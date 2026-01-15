import BottomNav from "./BottomNav";

interface PageLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  className?: string;
}

const PageLayout = ({ children, showNav = true, className = "" }: PageLayoutProps) => {
  return (
    <div className="min-h-screen-safe bg-background pt-safe">
      <main className={`${showNav ? "pb-[calc(5rem+env(safe-area-inset-bottom))]" : "pb-safe"} ${className}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};

export default PageLayout;
