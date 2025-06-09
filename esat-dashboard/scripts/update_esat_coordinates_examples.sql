-- Exemples de mise à jour des coordonnées d'ESATs
-- Ajustez les ID et les coordonnées selon vos ESATs réels

-- Quelques exemples de villes françaises avec leurs coordonnées
-- Vous pouvez utiliser Google Maps ou un service de géocodage pour obtenir les coordonnées précises

-- Paris (exemple)
-- UPDATE esats SET latitude = 48.8566, longitude = 2.3522 WHERE id = 1;

-- Lyon (exemple)
-- UPDATE esats SET latitude = 45.7640, longitude = 4.8357 WHERE id = 2;

-- Marseille (exemple)
-- UPDATE esats SET latitude = 43.2965, longitude = 5.3698 WHERE id = 3;

-- Toulouse (exemple)
-- UPDATE esats SET latitude = 43.6047, longitude = 1.4442 WHERE id = 4;

-- Nice (exemple)
-- UPDATE esats SET latitude = 43.7102, longitude = 7.2620 WHERE id = 5;

-- Nantes (exemple)
-- UPDATE esats SET latitude = 47.2184, longitude = -1.5536 WHERE id = 6;

-- Strasbourg (exemple)
-- UPDATE esats SET latitude = 48.5734, longitude = 7.7521 WHERE id = 7;

-- Montpellier (exemple)
-- UPDATE esats SET latitude = 43.6108, longitude = 3.8767 WHERE id = 8;

-- Bordeaux (exemple)
-- UPDATE esats SET latitude = 44.8378, longitude = -0.5792 WHERE id = 9;

-- Lille (exemple)
-- UPDATE esats SET latitude = 50.6292, longitude = 3.0573 WHERE id = 10;

-- Pour trouver les coordonnées de votre ESAT :
-- 1. Allez sur Google Maps
-- 2. Recherchez l'adresse de votre ESAT
-- 3. Clic droit sur le point → "Plus d'infos sur cet endroit"
-- 4. Les coordonnées apparaissent en bas

-- Ou utilisez cette requête pour voir vos ESATs actuels :
-- SELECT id, name, city, latitude, longitude FROM esats; 