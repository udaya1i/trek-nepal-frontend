import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/ui/AppIcon";

const GuestAccessBanner = () => {
  const navigate = useNavigate();

  const handleGuestAccess = () => {
    navigate("/landing-home");
  };

  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="Eye" size={24} className="text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2">
            Explore as Guest
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Browse treks, read stories, and discover Nepal's beauty without
            creating an account. Sign up later to save favorites and join the
            community.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGuestAccess}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuestAccessBanner;