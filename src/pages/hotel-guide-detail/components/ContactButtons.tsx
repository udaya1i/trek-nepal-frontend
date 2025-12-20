
import React from 'react';
import Icon from 'components/ui/AppIcon';

interface ContactInfo {
  phone: string;
  whatsapp?: string;
  viber?: string;
  email?: string;
}

interface ContactButtonsProps {
  contactInfo: ContactInfo;
  providerName: string;
}

const ContactButtons = ({ contactInfo, providerName }: ContactButtonsProps) => {
  const handlePhoneClick = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  const handleWhatsAppClick = () => {
    if (contactInfo.whatsapp) {
      const message = encodeURIComponent(`Hi, I'm interested in ${providerName}`);
      window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank');
    }
  };

  const handleViberClick = () => {
    if (contactInfo.viber) {
      window.open(`viber://chat?number=${contactInfo.viber}`, '_blank');
    }
  };

  const handleEmailClick = () => {
    if (contactInfo.email) {
      window.location.href = `mailto:${contactInfo.email}`;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <button
        onClick={handlePhoneClick}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:scale-[0.97] transition-smooth"
      >
        <Icon name="PhoneIcon" size={20} />
        <span className="hidden sm:inline">Call</span>
      </button>

      {contactInfo.whatsapp && (
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-xl font-medium hover:scale-[0.97] transition-smooth"
        >
          <Icon name="ChatBubbleLeftRightIcon" size={20} />
          <span className="hidden sm:inline">WhatsApp</span>
        </button>
      )}

      {contactInfo.viber && (
        <button
          onClick={handleViberClick}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[#7360F2] text-white rounded-xl font-medium hover:scale-[0.97] transition-smooth"
        >
          <Icon name="VideoCameraIcon" size={20} />
          <span className="hidden sm:inline">Viber</span>
        </button>
      )}

      {contactInfo.email && (
        <button
          onClick={handleEmailClick}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:scale-[0.97] transition-smooth"
        >
          <Icon name="EnvelopeIcon" size={20} />
          <span className="hidden sm:inline">Email</span>
        </button>
      )}
    </div>
  );
};

export default ContactButtons;