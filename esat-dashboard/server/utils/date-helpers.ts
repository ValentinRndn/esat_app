/**
 * Utilitaires pour la gestion des dates dans l'application
 */

/**
 * Convertit une date en format SQL (YYYY-MM-DD)
 * @param date Date à convertir
 * @returns Chaîne au format SQL ou null si date invalide
 */
export function toSqlDate(date: Date | string | null | undefined): string | null {
  if (!date) return null;
  
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    
    // Vérifier si la date est valide
    if (isNaN(d.getTime())) {
      return null;
    }
    
    // Format YYYY-MM-DD
    return d.toISOString().split('T')[0];
  } catch (error) {
    console.error('Erreur lors de la conversion de la date:', error);
    return null;
  }
}

/**
 * Vérifie si une chaîne est une date valide
 * @param dateStr Chaîne de date à vérifier
 * @returns true si c'est une date valide, false sinon
 */
export function isValidDateString(dateStr: string | null | undefined): boolean {
  if (!dateStr) return false;
  
  // Date vide
  if (dateStr.trim() === '') return false;
  
  // Essayer de parser la date
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

/**
 * Convertit un objet avec des champs de date en format ISO
 * @param obj Objet contenant des champs de dates
 * @param dateFields Liste des noms des champs de date
 * @returns Nouvel objet avec les dates converties
 */
export function sanitizeDates<T extends Record<string, any>>(
  obj: T, 
  dateFields: string[] = ['birth_date', 'entry_date_esat']
): T {
  // Créer une copie pour ne pas modifier l'original
  const result = { ...obj };
  
  // Traiter chaque champ de date
  for (const field of dateFields) {
    if (field in result) {
      // Si c'est une chaîne vide ou une valeur falsy, mettre à null
      if (!result[field] || (typeof result[field] === 'string' && result[field].trim() === '')) {
        result[field] = null;
      } 
      // Si c'est une chaîne de date valide, la convertir au format SQL
      else if (typeof result[field] === 'string' && isValidDateString(result[field])) {
        result[field] = toSqlDate(result[field]);
      }
    }
  }
  
  return result;
} 
