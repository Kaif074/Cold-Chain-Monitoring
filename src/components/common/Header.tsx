import { Link, useLocation, useNavigate } from "react-router-dom";
import { Thermometer, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import routes from "../../routes";
import { toast } from "sonner";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = routes.filter((route) => route.visible !== false);

  const handleLogout = () => {
    localStorage.removeItem('coldchain_auth');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Thermometer className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Cold-Chain Monitor
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
