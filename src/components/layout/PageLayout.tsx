import BottomNav from "./BottomNav";

interface PageLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  className?: string;
}

const PageLayout = ({ children, showNav = true, className = "" }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className={`${showNav ? "pb-20" : ""} ${className}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
};

export default PageLayout;