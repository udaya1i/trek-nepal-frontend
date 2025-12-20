import { Link, useLocation } from "react-router-dom";
import Icon from "./AppIcon";

interface BreadcrumbItem {
  label: string;
  path?: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const location = useLocation();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items && items.length > 0) {
      return items.map(item => ({
        ...item,
        path: item.path || item.href || ''
      }));
    }

    // Safety check for location
    if (!location || !location.pathname) {
      return [{ label: "Home", path: "/landing-home" }];
    }

    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Home", path: "/landing-home" },
    ];

    const routeMap: Record<string, string> = {
      "trek-listing": "Discover Treks",
      "trek-detail": "Trek Details",
      "user-profile": "Profile",
      "story-feed-community": "Community",
      "login-register": "Account",
    };

    pathSegments.forEach((segment, index) => {
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const label = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, path });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isMiddle = index > 0 && index < breadcrumbs.length - 1 && breadcrumbs.length > 3;

          if (isMiddle && window.innerWidth < 640) {
            return (
              <li key={crumb.path || index} className="flex items-center gap-2">
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">...</span>
              </li>
            );
          }

          return (
            <li key={crumb.path || index} className="flex items-center gap-2">
              {index > 0 && (
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              )}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path || '#'}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;