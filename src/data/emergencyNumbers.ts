
export interface EmergencyService {
  name: string;
  number: string;
  icon: string;
  urgent?: boolean;
  description?: string;
}

export const nationalNumbers: EmergencyService[] = [
  {
    name: 'Police',
    number: '100',
    icon: '🚓',
    description: 'For crime, theft, violence, or any law enforcement emergency'
  },
  {
    name: 'Fire Department',
    number: '101',
    icon: '🔥',
    description: 'For fire emergencies, rescue operations'
  },
  {
    name: 'Ambulance',
    number: '102',
    icon: '🚑',
    description: 'For medical emergencies and ambulance services'
  },
  {
    name: 'Emergency Services (All)',
    number: '112',
    icon: '🆘',
    description: 'Universal emergency number for all services'
  },
  {
    name: 'Disaster Management',
    number: '108',
    icon: '⛑️',
    description: 'For natural disasters and emergency response'
  },
  {
    name: 'Women Helpline',
    number: '1091',
    icon: '👩‍🦱',
    description: 'For women in distress, domestic violence'
  },
  {
    name: 'Child Helpline',
    number: '1098',
    icon: '👶',
    description: 'For child abuse, missing children emergencies'
  },
  {
    name: 'Senior Citizens Helpline',
    number: '14567',
    icon: '👴',
    description: 'For elderly citizens in need of assistance'
  }
];

export const stateSpecialNumbers: EmergencyService[] = [
  {
    name: 'Tourist Helpline',
    number: '1363',
    icon: '🗺️',
    urgent: false,
    description: 'For tourist assistance and information'
  },
  {
    name: 'Road Accident Emergency',
    number: '1073',
    icon: '🛣️',
    description: 'NHAI road accident emergency service'
  },
  {
    name: 'COVID-19 Helpline',
    number: '1075',
    icon: '😷',
    description: 'For COVID-19 related queries and assistance'
  },
  {
    name: 'Mental Health (KIRAN)',
    number: '1800-599-0019',
    icon: '🧠',
    description: 'Mental health support and suicide prevention'
  },
  {
    name: 'AIDS Helpline',
    number: '1097',
    icon: '🏥',
    urgent: false,
    description: 'For AIDS/HIV related information and support'
  },
  {
    name: 'Central Vigilance Commission',
    number: '1964',
    icon: '🕵️',
    urgent: false,
    description: 'For reporting corruption in government offices'
  },
  {
    name: 'Railway Accident Emergency',
    number: '1072',
    icon: '🚂',
    description: 'For railway accidents and emergencies'
  },
  {
    name: 'Anti-Poison Helpline',
    number: '1066',
    icon: '☠️',
    description: 'For poisoning emergencies and treatment guidance'
  },
  {
    name: 'Cyber Crime Helpline',
    number: '1930',
    icon: '💻',
    description: 'For reporting cyber crimes and online fraud'
  },
  {
    name: 'LPG Emergency',
    number: '1906',
    icon: '🔥',
    urgent: false,
    description: 'For LPG gas leak and related emergencies'
  },
  {
    name: 'Electricity Emergency',
    number: '1912',
    icon: '⚡',
    description: 'For power outages and electrical emergencies'
  },
  {
    name: 'Water Emergency',
    number: '1916',
    icon: '💧',
    urgent: false,
    description: 'For water supply related emergencies'
  }
];
