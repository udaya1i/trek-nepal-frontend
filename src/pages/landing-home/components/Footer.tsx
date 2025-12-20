import { Link } from 'react-router-dom';
import Icon from '../../../components/ui/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    explore: [
      { label: 'All Treks', path: '/trek-listing' },
      { label: 'Popular Routes', path: '/trek-listing?sort=popular' },
      { label: 'Easy Treks', path: '/trek-listing?difficulty=easy' },
      { label: 'Expert Treks', path: '/trek-listing?difficulty=expert' }
    ],
    community: [
      { label: 'Stories', path: '/story-feed-community' },
      { label: 'Join Community', path: '/login-register' },
      { label: 'Share Experience', path: '/story-feed-community' },
      { label: 'Guidelines', path: '/story-feed-community' }
    ],
    support: [
      { label: 'Help Center', path: '/landing-home' },
      { label: 'Safety Tips', path: '/landing-home' },
      { label: 'Contact Us', path: '/landing-home' },
      { label: 'FAQs', path: '/landing-home' }
    ]
  };

  const socialLinks = [
    { icon: 'Facebook', label: 'Facebook', url: '#' },
    { icon: 'Instagram', label: 'Instagram', url: '#' },
    { icon: 'Twitter', label: 'Twitter', url: '#' },
    { icon: 'Youtube', label: 'YouTube', url: '#' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link to="/landing-home" className="flex items-center gap-2 mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 4L4 14L6 14L6 26L14 26L14 18L18 18L18 26L26 26L26 14L28 14L16 4Z"
                  fill="var(--color-primary)"
                />
                <path
                  d="M16 2L14.5 3.5L8 10L8 12L10 12L10 24L12 24L12 16L20 16L20 24L22 24L22 12L24 12L24 10L17.5 3.5L16 2Z"
                  fill="var(--color-secondary)"
                />
              </svg>
              <span className="font-heading font-semibold text-lg text-primary">
                Nepal Trek Explorer
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Your trusted companion for discovering and planning unforgettable trekking adventures in the Himalayas.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  aria-label={social?.label}
                  className="w-10 h-10 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-200"
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerLinks?.explore?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Community</h3>
            <ul className="space-y-2">
              {footerLinks?.community?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <Link
                    to={link?.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} Nepal Trek Explorer. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/landing-home" className="hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/landing-home" className="hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/landing-home" className="hover:text-primary transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;