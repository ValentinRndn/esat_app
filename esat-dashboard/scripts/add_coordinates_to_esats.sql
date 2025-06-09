-- Script pour ajouter les coordonnées géographiques aux ESATs
-- Cela permettra à la carte d'afficher les entreprises à proximité

ALTER TABLE esats 
ADD COLUMN latitude DECIMAL(10, 8) NULL COMMENT 'Latitude de l\'ESAT pour géolocalisation',
ADD COLUMN longitude DECIMAL(11, 8) NULL COMMENT 'Longitude de l\'ESAT pour géolocalisation';

-- Exemple d'update pour quelques ESATs (vous devrez ajuster selon vos données réelles)
-- UPDATE esats SET latitude = 48.8566, longitude = 2.3522 WHERE id = 1; -- Paris
-- UPDATE esats SET latitude = 45.7640, longitude = 4.8357 WHERE id = 2; -- Lyon
-- UPDATE esats SET latitude = 43.2965, longitude = 5.3698 WHERE id = 3; -- Marseille

-- Index pour optimiser les requêtes géographiques
CREATE INDEX idx_esats_coordinates ON esats(latitude, longitude); 