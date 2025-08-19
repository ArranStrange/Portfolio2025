import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "home" },
    { path: "/projects", label: "projects" },
    { path: "/about", label: "about" },
    { path: "/github", label: "github" },
    { path: "/blog", label: "blog" },
    { path: "/contact", label: "contact" },
  ];

  return (
    <nav className="absolute top-4 left-8 z-50">
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-warm-white/40 font-satoshi font-light text-sm hover:text-warm-white/60 transition-colors cursor-pointer ${
              location.pathname === item.path ? "text-warm-white/80" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
