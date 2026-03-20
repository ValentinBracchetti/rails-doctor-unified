# Scripts Specification

Ce fichier décrit les scripts à générer pour automatiser l'audit Rails Doctor.
Chaque script est **optionnel** — l'agent peut faire les analyses manuellement.
Ces scripts accélèrent le process pour les audits répétitifs.

**Langage recommandé** : Python 3.10+ (pour la manipulation JSON et la génération Markdown).
Alternative acceptable : Ruby, pour rester dans l'écosystème.

---

## Script 1 — `run_audit.sh`

### Rôle
Orchestrateur bash qui installe les gems d'audit, lance tous les outils, et collecte les outputs bruts.

### Input
- `$1` : chemin vers le projet Rails à auditer
- `$2` : chemin de sortie pour les rapports bruts (défaut : `/tmp/rails-doctor-raw/`)

### Comportement attendu
1. Vérifier que le chemin est un projet Rails valide (présence de `Gemfile` + `config/application.rb`)
2. Détecter la version de Ruby et Rails
3. Installer les gems d'audit si absentes :
   - `brakeman`
   - `bundler-audit`
   - `rubocop`, `rubocop-rails`, `rubocop-performance`
   - `reek`
   - `flog`
   - `rails_best_practices`
4. Exécuter chaque outil avec output JSON/texte dans le dossier de sortie :
   - `brakeman_report.json`
   - `bundler_audit.txt`
   - `rubocop_report.json`
   - `reek_report.json`
   - `flog_report.txt`
   - `rbp_report.json`
5. Si un outil échoue, loguer l'erreur dans `errors.log` et continuer
6. Afficher un résumé en fin d'exécution : nombre de findings par outil

### Output
- Dossier contenant les rapports bruts de chaque outil
- `errors.log` si des outils ont échoué
- `audit_metadata.json` : timestamp, versions des outils, version Rails/Ruby, durée

### Code de sortie
- `0` : tous les outils ont tourné
- `1` : au moins un outil a échoué (mais les autres ont produit leurs rapports)
- `2` : le chemin n'est pas un projet Rails valide

---

## Script 2 — `parse_brakeman.py`

### Rôle
Parser le JSON Brakeman et produire une liste structurée de findings.

### Input
- `--input` : chemin vers `brakeman_report.json`
- `--output` : chemin de sortie (JSON structuré)

### Output JSON attendu
```json
{
  "tool": "brakeman",
  "total_warnings": 12,
  "by_severity": {
    "critical": 2,
    "major": 5,
    "minor": 5
  },
  "by_type": {
    "SQL Injection": 2,
    "Cross-Site Scripting": 3,
    "Mass Assignment": 1
  },
  "findings": [
    {
      "id": "BRAK-001",
      "type": "SQL Injection",
      "severity": "critical",
      "confidence": "High",
      "file": "app/controllers/users_controller.rb",
      "line": 42,
      "message": "Possible SQL injection",
      "code_snippet": "User.where(\"name = '#{params[:name]}'\")",
      "recommendation": "Utiliser des requêtes paramétrées : User.where(name: params[:name])",
      "reference_url": "https://brakemanscanner.org/docs/warning_types/sql_injection/"
    }
  ]
}
```

### Mapping de sévérité
- Brakeman `confidence: High` → `severity: critical`
- Brakeman `confidence: Medium` → `severity: major`
- Brakeman `confidence: Weak` → `severity: minor`

---

## Script 3 — `parse_bundle_audit.py`

### Rôle
Parser la sortie texte de `bundle-audit` et produire une liste structurée de CVEs.

### Input
- `--input` : chemin vers `bundler_audit.txt`
- `--output` : chemin de sortie (JSON structuré)

### Output JSON attendu
```json
{
  "tool": "bundler-audit",
  "total_advisories": 3,
  "findings": [
    {
      "id": "CVE-2024-XXXXX",
      "gem": "actionpack",
      "installed_version": "6.1.7",
      "patched_versions": [">= 6.1.7.8"],
      "severity": "critical",
      "title": "Possible ReDoS vulnerability in Action Dispatch",
      "url": "https://github.com/advisories/GHSA-xxxx",
      "recommendation": "Mettre à jour actionpack vers >= 6.1.7.8"
    }
  ]
}
```

### Parsing
La sortie de `bundle-audit` suit ce format :
```
Name: gem-name
Version: x.y.z
Advisory: CVE-XXXX-XXXXX
Criticality: High
URL: https://...
Title: Description
Solution: upgrade to >= x.y.z

```
Chaque advisory est séparé par une ligne vide.

---

## Script 4 — `detect_antipatterns.py`

### Rôle
Analyse statique custom pour détecter les anti-patterns Rails non couverts par les outils standard.

### Input
- `--project-path` : chemin vers le projet Rails
- `--output` : chemin de sortie (JSON structuré)

### Anti-patterns à détecter

| ID | Pattern | Comment détecter | Sévérité |
|----|---------|-----------------|----------|
| AP-001 | Fat Model | Fichier model > 300 lignes ou > 20 méthodes publiques | major |
| AP-002 | Fat Controller | Fichier controller > 200 lignes ou action > 30 lignes | major |
| AP-003 | Callback Hell | Model avec > 5 callbacks (before_*, after_*) | major |
| AP-004 | default_scope | Présence de `default_scope` dans un model | major |
| AP-005 | N+1 dans les views | Appel d'association dans une boucle `.each` en view | major |
| AP-006 | Business logic en view | Conditions complexes (if/else > 3 branches) dans les vues | minor |
| AP-007 | God Object | Model avec > 50 méthodes (publiques + privées) | critical |
| AP-008 | Primitive Obsession | Manipulation de montants sans gem Money, emails sans ValueObject | minor |
| AP-009 | Shotgun Surgery | Même logique dupliquée dans > 3 fichiers | major |
| AP-010 | Mystery Guest | Tests avec fixtures/factories non visibles dans le test | minor |

### Output JSON attendu
```json
{
  "tool": "antipattern_detector",
  "total_findings": 8,
  "findings": [
    {
      "id": "AP-001",
      "pattern": "Fat Model",
      "severity": "major",
      "file": "app/models/user.rb",
      "detail": "User model has 450 lines and 32 public methods",
      "recommendation": "Extraire la logique en Service Objects et Concerns ciblés"
    }
  ]
}
```

---

## Script 5 — `generate_report.py`

### Rôle
Prend tous les JSON de findings et les templates markdown, et génère le dossier de rapport final.

### Input
- `--findings-dir` : dossier contenant les JSON de findings (output des scripts 2-4 + rubocop/reek/flog parsés)
- `--templates-dir` : dossier `templates/` du skill
- `--references-dir` : dossier `references/` du skill (pour le framing commercial)
- `--output-dir` : dossier de sortie pour les markdown générés
- `--project-profile` : chemin vers les métadonnées du projet (JSON de la phase Discovery)

### Comportement attendu
1. Charger tous les fichiers JSON de findings
2. Calculer le score santé global (cf. algorithme dans SKILL.md)
3. Pour chaque domaine (security, quality, performance, architecture) :
   - Trier les findings par sévérité
   - Appliquer le framing commercial depuis `references/commercial_framing.md`
   - Rendre le template `report_section.md` avec les findings
4. Générer le plan d'action (`05_action_plan.md`) avec priorisation
5. Générer le résumé exécutif (`06_executive_summary.md`)

### Output
```
rails-doctor-report/
├── 00_project_profile.md
├── 01_security_findings.md
├── 02_code_quality.md
├── 03_performance.md
├── 04_architecture.md
├── 05_action_plan.md
└── 06_executive_summary.md
```

---

## Notes d'implémentation

- Tous les scripts doivent être **idempotents** — relancer le même script produit le même résultat
- Les scripts doivent gérer gracieusement les fichiers manquants (outil qui n'a pas tourné)
- Utiliser `argparse` pour les arguments CLI
- Les scripts de parsing (2, 3, 4) doivent pouvoir fonctionner indépendamment
- Le script de génération (5) doit pouvoir tourner avec un sous-ensemble des findings
- Encoding UTF-8 partout (noms de fichiers français possibles dans les projets)
