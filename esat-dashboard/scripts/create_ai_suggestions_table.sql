-- Script de migration pour créer la table ai_suggestions
-- À exécuter avec votre client MySQL

USE your_database_name; -- Remplacez par le nom de votre base de données

-- Création de la table ai_suggestions
CREATE TABLE IF NOT EXISTS ai_suggestions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  worker_id INT NOT NULL,
  esat_id INT NOT NULL,
  suggestion_type VARCHAR(100) NOT NULL,
  prompt TEXT NOT NULL,
  response LONGTEXT NOT NULL,
  summary TEXT,
  confidence_score TINYINT UNSIGNED,
  status ENUM('pending', 'completed', 'reviewed', 'applied', 'rejected') DEFAULT 'completed',
  tags VARCHAR(500),
  created_by INT NOT NULL,
  reviewed_by INT,
  reviewed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- Foreign keys (ajoutées séparément pour éviter les erreurs si les tables n'existent pas)
  INDEX idx_worker_id (worker_id),
  INDEX idx_esat_id (esat_id),
  INDEX idx_created_by (created_by),
  INDEX idx_suggestion_type (suggestion_type),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ajout des contraintes de clés étrangères (si les tables existent)
-- Décommentez ces lignes si vos tables workers, esats et users existent

/*
ALTER TABLE ai_suggestions 
ADD CONSTRAINT fk_ai_suggestions_worker_id 
FOREIGN KEY (worker_id) REFERENCES workers(id) ON DELETE CASCADE;

ALTER TABLE ai_suggestions 
ADD CONSTRAINT fk_ai_suggestions_esat_id 
FOREIGN KEY (esat_id) REFERENCES esats(id) ON DELETE CASCADE;

ALTER TABLE ai_suggestions 
ADD CONSTRAINT fk_ai_suggestions_created_by 
FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT;

ALTER TABLE ai_suggestions 
ADD CONSTRAINT fk_ai_suggestions_reviewed_by 
FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL;
*/

-- Vérification de la création
SELECT 'Table ai_suggestions créée avec succès!' as message; 