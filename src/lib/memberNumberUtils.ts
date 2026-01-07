// Utility functions for KAFA member number generation

/**
 * Removes accents and special characters from a string
 */
export const normalizeText = (text: string): string => {
  const accentMap: Record<string, string> = {
    'à': 'a', 'â': 'a', 'ä': 'a', 'á': 'a', 'ã': 'a',
    'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
    'ï': 'i', 'î': 'i', 'í': 'i', 'ì': 'i',
    'ô': 'o', 'ö': 'o', 'ó': 'o', 'ò': 'o', 'õ': 'o',
    'ù': 'u', 'û': 'u', 'ü': 'u', 'ú': 'u',
    'ç': 'c', 'ñ': 'n',
    'À': 'A', 'Â': 'A', 'Ä': 'A', 'Á': 'A', 'Ã': 'A',
    'É': 'E', 'È': 'E', 'Ê': 'E', 'Ë': 'E',
    'Ï': 'I', 'Î': 'I', 'Í': 'I', 'Ì': 'I',
    'Ô': 'O', 'Ö': 'O', 'Ó': 'O', 'Ò': 'O', 'Õ': 'O',
    'Ù': 'U', 'Û': 'U', 'Ü': 'U', 'Ú': 'U',
    'Ç': 'C', 'Ñ': 'N',
  };

  return text
    .split('')
    .map(char => accentMap[char] || char)
    .join('')
    .replace(/[^A-Za-z]/g, '')
    .toUpperCase();
};

/**
 * Generates a KAFA member number based on the formula:
 * KAFA-[CCC]-[NN][PP]-[XXXX]
 * 
 * Where:
 * - CCC = first 3 letters of commune
 * - NN = first 2 letters of last name
 * - PP = first 2 letters of first name
 * - XXXX = 4-digit sequential number
 */
export const generateMemberNumberPreview = (
  lastName: string,
  firstName: string,
  commune: string,
  sequentialNumber: number
): string => {
  const communeCode = normalizeText(commune).substring(0, 3).padEnd(3, 'X');
  const lastNameCode = normalizeText(lastName).substring(0, 2).padEnd(2, 'X');
  const firstNameCode = normalizeText(firstName).substring(0, 2).padEnd(2, 'X');
  const sequentialCode = sequentialNumber.toString().padStart(4, '0');

  return `KAFA-${communeCode}-${lastNameCode}${firstNameCode}-${sequentialCode}`;
};

/**
 * Parses a full name into first name and last name
 * Assumes format: "LastName FirstName" or "FirstName LastName"
 */
export const parseFullName = (fullName: string): { firstName: string; lastName: string } => {
  const parts = fullName.trim().split(/\s+/);
  
  if (parts.length === 0) {
    return { firstName: '', lastName: '' };
  }
  
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: parts[0] };
  }
  
  // Assume first part is last name, rest is first name
  const lastName = parts[0];
  const firstName = parts.slice(1).join(' ');
  
  return { firstName: firstName || parts[1] || '', lastName };
};

// List of all Haiti communes for the dropdown
export const haitiCommunes = [
  "Abricots",
  "Acul-du-Nord",
  "Anse-à-Foleur",
  "Anse-à-Galets",
  "Anse-à-Pitres",
  "Anse-à-Veau",
  "Anse-d'Hainault",
  "Anse-Rouge",
  "Aquin",
  "Arcahaie",
  "Arnaud",
  "Arniquet",
  "Bahon",
  "Baie-de-Henne",
  "Bainet",
  "Baptiste",
  "Baradères",
  "Bas-Limbé",
  "Bassin-Bleu",
  "Beaumont",
  "Belladère",
  "Belle-Anse",
  "Bombardopolis",
  "Bonbon",
  "Borgne",
  "Boucan-Carré",
  "Cabaret",
  "Camp-Perrin",
  "Cap-Haïtien",
  "Capotille",
  "Caracol",
  "Carice",
  "Carrefour",
  "Cavaillon",
  "Cayes-Jacmel",
  "Cerca-Carvajal",
  "Cerca-la-Source",
  "Chambellan",
  "Chansolme",
  "Chantal",
  "Chardonnières",
  "Cité Soleil",
  "Corail",
  "Cornillon",
  "Côteaux",
  "Côtes-de-Fer",
  "Croix-des-Bouquets",
  "Dame-Marie",
  "Delmas",
  "Desdunes",
  "Dessalines",
  "Dondon",
  "Ennery",
  "Ferrier",
  "Fond-des-Blancs",
  "Fonds-des-Nègres",
  "Fonds-Verretes",
  "Fort-Liberté",
  "Ganthier",
  "Gonaïves",
  "Grand-Boucan",
  "Grand-Goâve",
  "Grand-Gosier",
  "Grande-Rivière-du-Nord",
  "Grande-Saline",
  "Gressier",
  "Gros-Morne",
  "Hinche",
  "Iles-â-Vache",
  "Ile de la Tortue",
  "Jacmel",
  "Jean-Rabel",
  "Jérémie",
  "Kenscoff",
  "L'Asile",
  "L'Estère",
  "La Chapelle",
  "La Vallée-de-Jacmel",
  "La Victoire",
  "Lascahobas",
  "Léogâne",
  "Les Anglais",
  "Les Cayes",
  "Les Irois",
  "Liancourt",
  "Limbé",
  "Limonade",
  "Maniche",
  "Marfranc",
  "Marigot",
  "Marmelade",
  "Milot",
  "Miragoâne",
  "Mirebalais",
  "Mombin-Crochu",
  "Mont-Organisé",
  "Môle-Saint-Nicolas",
  "Moron",
  "Ouanaminthe",
  "Paillant",
  "Perches",
  "Pestel",
  "Pétion-Ville",
  "Petit-Goâve",
  "Petite-Rivière-de-Nippes",
  "Petite Rivière de l'Artibonite",
  "Pignon",
  "Pilate",
  "Plaine-du-Nord",
  "Plaisance",
  "Plaisance-du-Sud",
  "Pointe-à-Raquete",
  "Port-Margot",
  "Port-à-Piment",
  "Port-au-Prince",
  "Port-de-Paix",
  "Port-Salut",
  "Quartier-Morin",
  "Ranquitte",
  "Roche-à-Bateaux",
  "Roseaux",
  "Saint-Jean-du-Sud",
  "Saint-Louis-du-Nord",
  "Saint-Louis-du-Sud",
  "Saint-Marc",
  "Saint-Michel-de-l'Atalaye",
  "Saint-Raphaël",
  "Sainte-Suzanne",
  "Saut-d'Eau",
  "Savanette",
  "Tabarre",
  "Terre-Neuve",
  "Terrier-Rouge",
  "Thiotte",
  "Thomassique",
  "Thomazeau",
  "Thomonde",
  "Tiburon",
  "Torbeck",
  "Trou-du-Nord",
  "Vallières",
  "Verretes",
];
