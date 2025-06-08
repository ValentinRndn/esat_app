-- Script simplifié pour créer la table ai_suggestions
-- Version sans contraintes de clés étrangères pour éviter les erreurs

DROP TABLE IF EXISTS ai_suggestions;

CREATE TABLE ai_suggestions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  worker_id INT NOT NULL,
  esat_id INT NOT NULL,
  suggestion_type VARCHAR(100) NOT NULL DEFAULT 'job_recommendation',
  prompt TEXT NOT NULL,
  response LONGTEXT NOT NULL,
  summary TEXT NULL,
  confidence_score TINYINT UNSIGNED NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'completed',
  tags VARCHAR(500) NULL,
  created_by INT NOT NULL,
  reviewed_by INT NULL,
  reviewed_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Index pour améliorer les performances
CREATE INDEX idx_ai_suggestions_worker_id ON ai_suggestions(worker_id);
CREATE INDEX idx_ai_suggestions_esat_id ON ai_suggestions(esat_id);
CREATE INDEX idx_ai_suggestions_created_by ON ai_suggestions(created_by);
CREATE INDEX idx_ai_suggestions_type ON ai_suggestions(suggestion_type);
CREATE INDEX idx_ai_suggestions_status ON ai_suggestions(status);
CREATE INDEX idx_ai_suggestions_created_at ON ai_suggestions(created_at);

-- Insertion d'un exemple pour tester
INSERT INTO ai_suggestions (
  worker_id, 
  esat_id, 
  suggestion_type, 
  prompt, 
  response, 
  summary, 
  created_by
) VALUES (
  1, 
  1, 
  'job_recommendation', 
  'Suggestion de métiers pour le travailleur',
  'Basé sur le profil du travailleur, voici quelques suggestions de métiers...', 
  'Recommandations de métiers générées par IA',
  1
);

SELECT 'Table ai_suggestions créée avec succès!' as message;
SELECT COUNT(*) as total_suggestions FROM ai_suggestions; 