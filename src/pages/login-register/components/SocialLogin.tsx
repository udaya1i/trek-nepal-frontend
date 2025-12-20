import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/AppIcon";
import type { SocialLoginProvider } from "../types";

const SocialLogin = () => {
  const socialProviders: SocialLoginProvider[] = [
    {
      id: "google",
      name: "Google",
      icon: "Chrome",
      color: "hover:bg-red-50",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "Facebook",
      color: "hover:bg-blue-50",
    },
  ];

  const handleSocialLogin = (provider: string) => {
    alert(`${provider} login integration coming soon!`);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            type="button"
            variant="outline"
            onClick={() => handleSocialLogin(provider.name)}
            className={`${provider.color} transition-colors duration-200`}
          >
            <Icon name={provider.icon} size={20} className="mr-2" />
            {provider.name}
          </Button>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our data protection and privacy policies
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;