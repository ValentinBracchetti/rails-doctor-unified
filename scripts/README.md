# ⚠️ Scripts à générer

Les scripts dans ce dossier doivent être **générés par le développeur** (via Cursor, Claude Code,
ou tout autre outil d'assistance au développement).

## Fichiers attendus

| Script | Langage | Rôle | Spec détaillée |
|--------|---------|------|----------------|
| `run_audit.sh` | Bash | Orchestrateur : installe les gems, lance tous les outils, collecte les outputs | Voir `SCRIPTS_SPEC.md` §1 |
| `parse_brakeman.py` | Python 3.10+ | Parse `brakeman_report.json` → findings structurés JSON | Voir `SCRIPTS_SPEC.md` §2 |
| `parse_bundle_audit.py` | Python 3.10+ | Parse `bundler_audit.txt` → CVEs structurées JSON | Voir `SCRIPTS_SPEC.md` §3 |
| `detect_antipatterns.py` | Python 3.10+ | Analyse statique custom → anti-patterns JSON | Voir `SCRIPTS_SPEC.md` §4 |
| `generate_report.py` | Python 3.10+ | Prend tous les JSON + templates → génère le dossier markdown | Voir `SCRIPTS_SPEC.md` §5 |

## Comment générer les scripts

1. Ouvrir `SCRIPTS_SPEC.md` dans votre IDE
2. Pour chaque script, demander à votre assistant IA :
   > "Génère le script `parse_brakeman.py` en suivant les specs de SCRIPTS_SPEC.md §2"
3. Tester sur un projet Rails réel
4. Itérer

## Note importante

Les scripts sont **optionnels** pour le fonctionnement du skill.
L'agent qui utilise ce skill peut effectuer toutes les analyses **manuellement**
en exécutant les outils directement et en lisant leurs outputs bruts.

Les scripts automatisent et standardisent le processus pour les **audits répétitifs**
où la vitesse et la cohérence du format de sortie sont importantes.
