import Icon from "../../../components/AppIcon";

interface TrustSignal {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const TrustSignals = () => {
  const trustSignals: TrustSignal[] = [
    {
      id: "secure",
      icon: "Shield",
      title: "Secure & Encrypted",
      description: "Your data is protected with SSL encryption",
    },
    {
      id: "verified",
      icon: "CheckCircle",
      title: "Verified Platform",
      description: "Nepal Tourism Board compliant",
    },
    {
      id: "privacy",
      icon: "Lock",
      title: "Privacy Protected",
      description: "We never share your personal information",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-border">
      {trustSignals.map((signal) => (
        <div key={signal.id} className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name={signal.icon} size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm text-foreground mb-1">
              {signal.title}
            </h4>
            <p className="text-xs text-muted-foreground">{signal.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustSignals;