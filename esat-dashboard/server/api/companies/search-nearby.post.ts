import { defineEventHandler, readBody, createError, getCookie } from 'h3';
import jwt from 'jsonwebtoken';
import { db } from '../../utils/db';

interface CompanySearchRequest {
  worker_location: number; // ESAT ID comme référence
  sectors: string[];
  radius: number; // en kilomètres
  limit?: number;
}

interface Company {
  id: string;
  name: string;
  sector: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  employees?: number;
  phone?: string;
  email?: string;
}

export default defineEventHandler(async (event): Promise<Company[]> => {
  try {
    // Vérifier l'authentification
    const token = getCookie(event, 'auth-token');
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication required'
      });
    }

    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const decoded = jwt.verify(token, jwtSecret) as any;

    if (!decoded.userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      });
    }

    const body: CompanySearchRequest = await readBody(event);
    
    if (!body.worker_location || !body.sectors || !body.radius) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields: worker_location, sectors, radius'
      });
    }

    // Récupérer les coordonnées de l'ESAT comme point de référence
    const esat = await db
      .selectFrom('esats')
      .select(['latitude', 'longitude', 'city'])
      .where('id', '=', body.worker_location)
      .executeTakeFirst();

    if (!esat || !esat.latitude || !esat.longitude) {
      // Si pas de coordonnées ESAT, utiliser une méthode de géocodage alternatif
      return await searchCompaniesWithAlternativeMethod(body);
    }

    // Rechercher les entreprises à proximité
    const companies = await searchNearbyCompanies(
      esat.latitude,
      esat.longitude,
      body.sectors,
      body.radius,
      body.limit || 50
    );

    return companies;

  } catch (error: any) {
    console.error('Error searching nearby companies:', error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to search nearby companies',
      message: error.message,
    });
  }
});

async function searchNearbyCompanies(
  latitude: number,
  longitude: number,
  sectors: string[],
  radius: number,
  limit: number
): Promise<Company[]> {
  // Pour cet exemple, nous utiliserons une approche hybride :
  // 1. D'abord essayer de récupérer depuis une base locale si disponible
  // 2. Sinon utiliser l'API Sirene ou d'autres sources ouvertes

  // Version simulée pour la démonstration
  // Dans la vraie version, vous intégreriez l'API Sirene, Google Places, ou une base de données d'entreprises
  
  const mockCompanies: Company[] = await generateMockCompanies(latitude, longitude, sectors, radius, limit);
  
  return mockCompanies.sort((a, b) => a.distance - b.distance).slice(0, limit);
}

async function generateMockCompanies(
  centerLat: number,
  centerLng: number,
  sectors: string[],
  radius: number,
  limit: number
): Promise<Company[]> {
  const companies: Company[] = [];
  
  // Secteurs et types d'entreprises correspondants
  const sectorMapping: Record<string, string[]> = {
    'restauration': ['Restaurant', 'Brasserie', 'Fast-food', 'Traiteur', 'Cantine'],
    'commerce': ['Supermarché', 'Magasin', 'Boutique', 'Centre commercial'],
    'services': ['Banque', 'Assurance', 'Agence immobilière', 'Cabinet comptable'],
    'nettoyage': ['Société de nettoyage', 'Service de propreté', 'Nettoyage industriel'],
    'espaces verts': ['Paysagiste', 'Jardinerie', 'Service espaces verts'],
    'industrie': ['Usine', 'Manufacture', 'Site industriel'],
    'transport': ['Transporteur', 'Logistique', 'Livraison'],
    'maintenance': ['Maintenance industrielle', 'Service technique', 'Réparation'],
    'bureautique': ['Bureau', 'Secrétariat', 'Administration'],
    'accueil': ['Réception', 'Accueil', 'Standard téléphonique']
  };

  // Générer des entreprises fictives mais réalistes
  for (let i = 0; i < limit * 2; i++) { // Générer plus pour filtrer ensuite
    const sector = sectors[Math.floor(Math.random() * sectors.length)] || 'services';
    const companyTypes = sectorMapping[sector] || ['Entreprise'];
    const companyType = companyTypes[Math.floor(Math.random() * companyTypes.length)];
    
    // Générer des coordonnées aléatoires dans le rayon
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;
    const deltaLat = (distance / 111) * Math.cos(angle); // Approximation : 1 degré ≈ 111 km
    const deltaLng = (distance / (111 * Math.cos(centerLat * Math.PI / 180))) * Math.sin(angle);
    
    const lat = centerLat + deltaLat;
    const lng = centerLng + deltaLng;
    
    companies.push({
      id: `company_${i}`,
      name: `${companyType} ${generateCompanyName()}`,
      sector: sector,
      address: `${Math.floor(Math.random() * 200) + 1} ${generateStreetName()}`,
      latitude: lat,
      longitude: lng,
      distance: Math.round(distance * 10) / 10, // Arrondir à 1 décimale
      employees: Math.floor(Math.random() * 500) + 10,
      phone: generatePhoneNumber(),
      email: undefined
    });
  }

  return companies.slice(0, limit);
}

function generateCompanyName(): string {
  const names = [
    'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Petit', 'Durand', 'Leroy',
    'Moreau', 'Simon', 'Laurent', 'Lefebvre', 'Michel', 'Garcia', 'David', 'Bertrand'
  ];
  
  const suffixes = ['& Fils', 'SARL', 'SAS', 'SA', 'et Associés', 'Services', 'Solutions'];
  
  const name = names[Math.floor(Math.random() * names.length)];
  const suffix = Math.random() > 0.5 ? ` ${suffixes[Math.floor(Math.random() * suffixes.length)]}` : '';
  
  return name + suffix;
}

function generateStreetName(): string {
  const streets = [
    'Rue de la République', 'Avenue Jean Jaurès', 'Rue de la Paix', 'Boulevard Victor Hugo',
    'Rue du Commerce', 'Avenue de la Liberté', 'Rue des Écoles', 'Place de la Mairie',
    'Rue de l\'Église', 'Avenue des Tilleuls', 'Rue des Roses', 'Boulevard de la Gare'
  ];
  
  return streets[Math.floor(Math.random() * streets.length)];
}

function generatePhoneNumber(): string {
  const prefixes = ['01', '02', '03', '04', '05'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
  let number = prefix;
  for (let i = 0; i < 4; i++) {
    number += ' ' + Math.floor(Math.random() * 90 + 10);
  }
  
  return number;
}

async function searchCompaniesWithAlternativeMethod(body: CompanySearchRequest): Promise<Company[]> {
  // Méthode alternative si pas de coordonnées ESAT
  // Ici vous pourriez implémenter une recherche par code postal, ville, etc.
  
  return generateMockCompanies(46.603354, 1.888334, body.sectors, body.radius, body.limit || 50);
} 
