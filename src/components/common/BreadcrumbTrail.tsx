import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from 'components/ui/AppIcon';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbTrailProps {
  customItems?: BreadcrumbItem[];
}

const BreadcrumbTrail = ({ customItems }: BreadcrumbTrailProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) return customItems;

    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

    const pathMap: Record<string, string> = {
      'trek-listing': 'Treks',
      'trek-detail': 'Trek Details',
      'story-feed-community': 'Community',
      'story-detail': 'Story',
      'create-story': 'Create Story',
      'hotel-guide-listing': 'Services',
      'hotel-guide-detail': 'Service Details',
      'user-profile': 'Profile',
      'settings': 'Settings',
    };

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;

      // Ignore route params like /:id
      if (/^\d+$/.test(segment)) return;

      const label =
        pathMap[segment] ||
        segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 flex-wrap">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.path} className="flex items-center gap-2">
              {!isFirst && (
                <Icon
                  name="ChevronRightIcon"
                  size={16}
                  className="text-muted-foreground"
                />
              )}

              {isLast ? (
                <span className="font-medium text-foreground caption">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-muted-foreground hover:text-foreground transition caption"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbTrail;
