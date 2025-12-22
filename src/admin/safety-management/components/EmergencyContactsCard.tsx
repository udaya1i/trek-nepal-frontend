import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { EmergencyContact } from '../types';
import Icon from 'components/ui/AppIcon';

interface EmergencyContactsCardProps {
  contacts: EmergencyContact[];
  onEdit: (contact: EmergencyContact) => void;
  onAdd: () => void;
}

const EmergencyContactsCard = ({ contacts, onEdit, onAdd }: EmergencyContactsCardProps) => {
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-heading font-semibold">Emergency Contacts</h3>
          <p className="text-sm text-muted-foreground caption mt-1">
            Quick access to emergency response teams
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={onAdd}
        >
          Add
        </Button>
      </div>

      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {contacts.map((contact) => (
          <div key={contact.id} className="p-4 hover:bg-muted/30 transition-smooth">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-sm font-medium text-foreground">{contact.name}</h4>
                  {contact.available24x7 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      24/7
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground caption mb-2">{contact.role} • {contact.region}</p>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Phone" size={14} className="text-muted-foreground" />
                    <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="Mail" size={14} className="text-muted-foreground" />
                    <a href={`mailto:${contact.email}`} className="text-primary hover:underline line-clamp-1">
                      {contact.email}
                    </a>
                  </div>
                </div>

                {expandedContact === contact.id && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground caption mb-1">Languages:</p>
                    <div className="flex flex-wrap gap-1">
                      {contact.languages.map((lang, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-muted text-foreground"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setExpandedContact(expandedContact === contact.id ? null : contact.id)}
                  className="p-2 hover:bg-muted rounded-md transition-smooth focus-ring"
                  title={expandedContact === contact.id ? 'Show less' : 'Show more'}
                >
                  <Icon name={expandedContact === contact.id ? 'ChevronUp' : 'ChevronDown'} size={16} />
                </button>
                <button
                  onClick={() => onEdit(contact)}
                  className="p-2 hover:bg-muted rounded-md transition-smooth focus-ring"
                  title="Edit contact"
                >
                  <Icon name="Edit" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContactsCard;