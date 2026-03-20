import type { Report, Domain } from "./types";

export const report: Report = {
  profile: {
    name: "pjr-rails",
    path: "c:\\Users\\vbrac\\Desktop\\code\\Poujauran\\pjr-rails",
    date: "18 mars 2025",
    railsVersion: "6.0.6",
    rubyVersion: ">= 3.1.2",
    database: "PostgreSQL",
    webServer: "Puma 5.6",
    backgroundJobs: "Sidekiq + sidekiq-scheduler",
    cacheStore: "Dalli (Memcached) — non configuré en production",
    fileStorage: "AWS S3 (Active Storage)",
    frontend: "ActiveAdmin (ERB), API JSON (Jbuilder), GraphQL, CoffeeScript",
    stats: [
      { label: "Models", value: 31 },
      { label: "Controllers", value: 7 },
      { label: "Views", value: 10 },
      { label: "Services", value: 3 },
      { label: "Jobs", value: 5 },
      { label: "Mailers", value: 2 },
      { label: "Tables BDD", value: 29 },
      { label: "Routes", value: "~30" },
      { label: "Gems", value: "~50" },
      { label: "Fichiers de test", value: 9 },
    ],
  },
  globalScore: 42,
  maxScore: 100,
  executiveSummary: {
    headline: "Score de santé : 42 / 100",
    meaning:
      "Votre application fonctionne, mais elle accumule des risques de sécurité et des freins techniques qui coûteront plus cher à corriger demain. Sans intervention, les coûts de maintenance et le risque d'incidents augmenteront sensiblement. Une action rapide sur les points critiques est recommandée.",
    topRisks: [
      {
        title: "Vulnérabilité critique dans GraphQL (exécution de code à distance)",
        description:
          "Une faille de sécurité connue dans la bibliothèque GraphQL permet à un attaquant de prendre le contrôle du serveur. La correction est simple (mise à jour) et urgente.",
      },
      {
        title: "Données non chiffrées en production",
        description:
          "Le chiffrement SSL (HTTPS) est désactivé. Les mots de passe, tokens et données sensibles peuvent être interceptés lors de leur transmission.",
      },
      {
        title: "Plus de 40 vulnérabilités dans les bibliothèques",
        description:
          "Les composants logiciels (Rails, ActiveAdmin, Puma, etc.) contiennent des failles de sécurité connues. Votre application n'est plus couverte par les mises à jour de sécurité depuis 2023.",
      },
      {
        title: "Absence de tests sur les fonctionnalités critiques",
        description:
          "Moins de 10 % du code est couvert par des tests. Chaque mise en production comporte un risque de régression non détectée.",
      },
      {
        title: "Performance dégradée sous charge",
        description:
          "L'application n'est pas équipée pour détecter les requêtes inefficaces (N+1). Le cache n'est pas configuré en production. Les listes de commandes et clients peuvent devenir lentes avec la croissance des données.",
      },
    ],
    recommendation:
      "Nous recommandons de commencer par le **Lot 1 — Quick Wins** (5 jours) pour un investissement de 2 500€ à 5 000€. Cette première phase corrige les risques les plus critiques : activation du SSL, mise à jour de GraphQL, configuration du cache, détection des problèmes de performance. Elle pose les bases pour les chantiers suivants.",
  },
  domains: [
    {
      id: "security",
      name: "Sécurité",
      score: 8,
      maxScore: 30,
      icon: "🔒",
      color: "#ef4444",
      summary:
        "L'application présente des risques de sécurité significatifs : une CVE critique (GraphQL RCE), SSL désactivé, log level trop verbeux, CORS placeholder, absence de CSP, et 40+ CVEs dans les dépendances.",
      quickWins: [
        "SEC-002 — Activer force_ssl (XS)",
        "SEC-005 — Réduire log_level en production (XS)",
        "SEC-006 — Configurer CORS correctement (XS)",
        "SEC-008 — Externaliser les secrets development/test (XS)",
        "SEC-001 — Mise à jour graphql (S)",
      ],
      structuralWork: [
        "SEC-003 — Mise à jour ActiveAdmin (M)",
        "SEC-004 — Migration Rails 6.0 → 6.1+ (S-M)",
        "SEC-007 — Mise en place CSP (S)",
        "SEC-009+ — Mise à jour globale des dépendances (L)",
      ],
      findings: [
        {
          id: "SEC-001",
          title: "CVE GraphQL : exécution de code à distance",
          severity: "critical",
          effort: "S",
          sellability: 3,
          location: "graphql gem (2.0.14)",
          observation:
            "CVE-2025-27407 (GHSA-q92j-grw3-h492) — Critical. La gem graphql permet l'exécution de code à distance lors du chargement d'un schéma GraphQL malveillant.",
          risk:
            "Un attaquant peut exécuter du code arbitraire sur le serveur en soumettant une requête GraphQL crafted. Compromission totale de l'application et des données.",
          recommendation:
            "Mettre à jour graphql vers >= 2.0.32 : bundle update graphql",
          benefit:
            "Élimination d'une vulnérabilité critique permettant la prise de contrôle du serveur.",
        },
        {
          id: "SEC-002",
          title: "SSL désactivé en production",
          severity: "critical",
          effort: "XS",
          sellability: 3,
          location: "config/environments/production.rb (ligne 40)",
          observation:
            "config.force_ssl = true est commenté. Les requêtes HTTP ne sont pas redirigées vers HTTPS. Les cookies et tokens peuvent transiter en clair.",
          risk:
            "Interception des sessions, tokens d'authentification et données sensibles (man-in-the-middle). Non-conformité RGPD pour les données personnelles.",
          recommendation: "Décommenter la ligne : config.force_ssl = true",
          benefit:
            "Chiffrement de toutes les communications. Conformité aux bonnes pratiques de sécurité.",
        },
        {
          id: "SEC-003",
          title: "CVE ActiveAdmin : XSS stocké et injection CSV",
          severity: "critical",
          effort: "M",
          sellability: 3,
          location: "activeadmin gem (2.12.0)",
          observation:
            "CVE-2024-37031 : XSS stocké dans les légendes de formulaires dynamiques. CVE-2023-51763 : Injection CSV.",
          risk:
            "Usurpation de session admin, vol de credentials, exécution de scripts malveillants. Export CSV manipulable pour injection de formules Excel.",
          recommendation:
            "Mettre à jour ActiveAdmin vers >= 3.2.2 ou >= 4.0.0.beta7. Attention aux breaking changes.",
          benefit: "Interface d'administration sécurisée contre XSS et injection CSV.",
        },
        {
          id: "SEC-004",
          title: "CVE ActiveRecord : injection SQL",
          severity: "critical",
          effort: "S",
          sellability: 3,
          location: "activerecord (6.0.6)",
          observation:
            "CVE-2023-22794 (GHSA-hq7p-j377-6v63) — High. Vulnérabilité d'injection SQL via les commentaires ActiveRecord.",
          risk:
            "Extraction, modification ou suppression de données. Bypass des contrôles d'accès. Sanctions RGPD.",
          recommendation:
            "Mettre à jour Rails vers >= 6.1.7.1 (ou 7.x). Planifier une migration Rails 6.0 → 6.1.",
          benefit: "Élimination d'une faille SQL critique dans le cœur de l'ORM.",
        },
        {
          id: "SEC-005",
          title: "Log level debug en production",
          severity: "major",
          effort: "XS",
          sellability: 3,
          location: "config/environments/production.rb (ligne 44)",
          observation:
            "config.log_level = :debug expose des informations détaillées (stack traces, requêtes SQL, variables) dans les logs.",
          risk:
            "Fuites d'informations sensibles (mots de passe, tokens, structure interne). Surface d'attaque accrue si les logs sont accessibles.",
          recommendation:
            "Utiliser config.log_level = :info ou :warn. S'appuyer sur ENV[\"LOG_LEVEL\"] pour le debug ponctuel.",
          benefit: "Réduction de la surface d'information exposée en production.",
        },
        {
          id: "SEC-006",
          title: "CORS mal configuré",
          severity: "major",
          effort: "XS",
          sellability: 2,
          location: "config/initializers/cors.rb (ligne 10)",
          observation:
            "origins 'example.com' — valeur placeholder. L'API ne sera pas accessible depuis le frontend réel.",
          risk:
            "Si modifié en '*' par erreur : toute origine peut appeler l'API. Si laissé en example.com : l'API mobile/web ne fonctionne pas correctement.",
          recommendation:
            "Configurer les origines réelles via ENV : origins ENV.fetch('CORS_ORIGINS', '').split(',')",
          benefit: "CORS correctement restreint aux domaines légitimes.",
        },
        {
          id: "SEC-007",
          title: "Absence de Content Security Policy",
          severity: "major",
          effort: "S",
          sellability: 2,
          location: "Pas de config/initializers/content_security_policy.rb",
          observation:
            "Aucune Content Security Policy configurée. Les headers CSP ne sont pas envoyés.",
          risk: "Mitigation réduite contre XSS. Scripts inline et chargements non contrôlés.",
          recommendation:
            "Créer l'initializer CSP avec rails g content_security_policy ou configuration manuelle.",
          benefit: "Couche de défense supplémentaire contre les attaques XSS.",
        },
        {
          id: "SEC-008",
          title: "Secrets development/test en clair dans secrets.yml",
          severity: "major",
          effort: "XS",
          sellability: 2,
          location: "config/secrets.yml (lignes 21-24)",
          observation:
            "secret_key_base pour development et test sont en clair dans le fichier. Si le repo est partagé ou fuit, ces clés sont exposées.",
          risk:
            "Fabrication de cookies/sessions valides pour l'environnement de test. Risque si le repo est public ou compromis.",
          recommendation:
            "Utiliser ENV[\"SECRET_KEY_BASE\"] pour tous les environnements, ou credentials pour development/test.",
          benefit: "Aucun secret en clair dans le dépôt.",
        },
        {
          id: "SEC-009",
          title: "40+ CVEs dans Rails, Puma, Loofah et autres gems",
          severity: "major",
          effort: "L",
          sellability: 3,
          location: "Gemfile (multiples gems)",
          observation:
            "bundle-audit a identifié 40+ vulnérabilités supplémentaires : actionview (XSS), actionpack (ReDoS), puma (HTTP smuggling), loofah, rails-html-sanitizer, rexml (DoS), dalli (code injection), devise (race condition), sidekiq (DoS).",
          risk:
            "Surface d'attaque étendue. Les CVEs publiques sont les premières testées par les attaquants.",
          recommendation:
            "Planifier une mise à jour majeure : Rails 6.0 → 6.1 ou 7.x, puis mise à jour des gems dépendantes.",
          benefit: "Réduction drastique des vulnérabilités connues.",
        },
      ],
    },
    {
      id: "quality",
      name: "Qualité",
      score: 12,
      maxScore: 20,
      icon: "🧹",
      color: "#a855f7",
      summary:
        "La qualité de code est globalement correcte (RuboCop propre) mais des points critiques existent : la mutation UpdateClient est monolithique, et la loi de Déméter est violée dans mapotempo.rb.",
      quickWins: [
        "CQ-005 — Mémoïser Rails.logger et Time.zone dans les jobs (XS)",
        "CQ-007 — Use scope access dans UsersController (XS)",
        "CQ-011 — Supprimer trailing whitespace (XS)",
      ],
      structuralWork: [
        "CQ-001 — Refactorer UpdateClient en Form Object (M)",
        "CQ-002 — Corriger Law of Demeter dans mapotempo (S)",
        "CQ-003 — Supprimer les méthodes inutilisées (S)",
        "CQ-004 — Refactorer mutations Order et QueryType (S)",
        "CQ-006 — Extraire logique Import/Invoice (S)",
      ],
      findings: [
        {
          id: "CQ-001",
          title: "Mutation UpdateClient : méthode monolithique (52 paramètres, 57 statements)",
          severity: "critical",
          effort: "M",
          sellability: 2,
          location: "app/graphql/mutations/update_client.rb (lignes 61-174)",
          observation:
            "La mutation UpdateClient#resolve accepte 52 arguments et contient ~57 statements. Score Flog 100.3 (seuil critique > 60). FeatureEnvy massif sur l'objet client.",
          risk:
            "Maintenance extrêmement difficile. Chaque ajout de champ Client nécessite de modifier la mutation. Risque de régressions élevé.",
          recommendation:
            "Introduire un Form Object ou Input Object GraphQL structuré (ClientAttributesInput). Grouper les attributs par domaine.",
          benefit:
            "Réduction de la complexité cyclomatique. Évolution du modèle Client sans toucher à la signature de la mutation.",
        },
        {
          id: "CQ-002",
          title: "Law of Demeter violée massivement (mapotempo.rb)",
          severity: "critical",
          effort: "S",
          sellability: 2,
          location: "app/admin/mapotempo.rb (lignes 23-74)",
          observation:
            "rails_best_practices signale 18 violations de la loi de Déméter. Chaînes d'appels du type object.a.b.c sur plusieurs lignes.",
          risk:
            "Couplage fort aux structures internes. Toute modification des modèles associés casse ce code. Difficile à tester en isolation.",
          recommendation:
            "Introduire des méthodes déléguées ou un Presenter/Decorator pour la vue Mapotempo.",
          benefit: "Découplage, testabilité, évolution des modèles sans impact sur l'admin.",
        },
        {
          id: "CQ-003",
          title: "Méthodes inutilisées (dead code)",
          severity: "major",
          effort: "S",
          sellability: 1,
          location: "Multiple (Client, Invoice, Order, Notification)",
          observation:
            "rails_best_practices identifie 20+ méthodes 'unused' : Client#image_url, Client#available_products, Invoice#unknown, Order#ordered_by_client, etc.",
          risk:
            "Code mort augmente la dette cognitive. Confusion pour les développeurs. Possible utilisation future non documentée.",
          recommendation:
            "Audit manuel avec grep pour confirmer l'absence d'appel. Supprimer le code mort confirmé.",
          benefit: "Codebase plus claire, moins de bruit.",
        },
        {
          id: "CQ-004",
          title: "Mutations Order : TooManyStatements, DuplicateMethodCall",
          severity: "major",
          effort: "S",
          sellability: 2,
          location:
            "app/graphql/mutations/order.rb, phone_number_verification.rb, query_type.rb",
          observation:
            "Mutations::Order#resolve : 16 statements, Flog 48.8, order.product_items appelé 3 fois. Mutations::PhoneNumberVerification#resolve : Rails.logger appelé 2 fois.",
          risk:
            "Duplication et complexité inutiles. Mémoïsation manquante pour les appels répétés.",
          recommendation:
            "Extraire des méthodes privées. Mémoïser order.product_items dans une variable locale.",
          benefit: "Code plus lisible, moins de requêtes redondantes.",
        },
        {
          id: "CQ-005",
          title: "Jobs : DuplicateMethodCall (Rails.logger, Time.zone.today)",
          severity: "major",
          effort: "XS",
          sellability: 1,
          location:
            "app/jobs/daily_create_orders_job.rb, daily_needs_validation_notification_job.rb, daily_validate_orders_job.rb",
          observation:
            "Rails.logger appelé 3-4 fois par job, Time.zone.today 2 fois. Reek signale DuplicateMethodCall.",
          risk: "Overhead mineur. Incohérence de style.",
          recommendation:
            "today = Time.zone.today en début de méthode. logger = Rails.logger si plusieurs appels.",
          benefit: "Code plus propre, légère optimisation.",
        },
        {
          id: "CQ-006",
          title: "Models : FeatureEnvy, TooManyStatements (Import, Invoice, InvoiceGroup)",
          severity: "major",
          effort: "S",
          sellability: 2,
          location: "app/models/import.rb, invoice.rb, invoice_group.rb",
          observation:
            "Import#execute_now : 12 statements, Flog 28.4. Import#attribute_for_line : FeatureEnvy sur line. Invoice#populate_items : NestedIterators. InvoiceGroup#submit! : 23.1 Flog.",
          risk: "Logique métier difficile à isoler et tester. Méthodes trop longues.",
          recommendation:
            "Extraire des services. Import pourrait déléguer à des classes ImportLineParser, ImportExecutor.",
          benefit: "Séparation des responsabilités, testabilité.",
        },
        {
          id: "CQ-007",
          title: "Use scope access (UsersController)",
          severity: "major",
          effort: "XS",
          sellability: 2,
          location: "app/controllers/api/v1/users_controller.rb (ligne 52)",
          observation:
            "rails_best_practices signale 'use scope access' — probablement un User.find ou User.where qui pourrait utiliser un scope nommé.",
          risk: "Logique de requête dupliquée dans le controller. Moins de réutilisabilité.",
          recommendation:
            "Créer un scope sur le modèle User et l'utiliser dans le controller.",
          benefit: "Cohérence, réutilisation.",
        },
        {
          id: "CQ-008",
          title: "RuboCop : 0 offenses (positif)",
          severity: "positive",
          effort: "XS",
          sellability: 1,
          location: "app/ et lib/",
          observation:
            "RuboCop ne signale aucune offense sur app/ et lib/. Le projet respecte les conventions configurées.",
          risk: "N/A",
          recommendation: "Maintenir cette configuration. Ajouter rubocop-performance si pertinent.",
          benefit: "Code style cohérent et conforme aux conventions Ruby.",
        },
        {
          id: "CQ-009",
          title: "Noms de variables non communicatifs (e, v, p, t, a, i, c)",
          severity: "minor",
          effort: "M",
          sellability: 1,
          location: "Multiple (GraphQL mutations, models, services)",
          observation:
            "Reek signale UncommunicativeVariableName : e (exception), v, p (paramètre), t (token), a (array), i (index), c (client). Une trentaine d'occurrences.",
          risk: "Lisibilité réduite. Variables ambiguës dans des contextes complexes.",
          recommendation:
            "Renommer progressivement : e → error, p → params ou product, a → attributes.",
          benefit: "Meilleure lisibilité.",
        },
        {
          id: "CQ-010",
          title: "IrresponsibleModule (absence de documentation)",
          severity: "cosmetic",
          effort: "L",
          sellability: 1,
          location: "Global (~80 occurrences)",
          observation:
            "Reek signale ~80 occurrences de IrresponsibleModule — classes/modules sans commentaire descriptif.",
          risk: "Onboarding difficile pour les nouveaux développeurs.",
          recommendation:
            "Ajouter des commentaires YARD ou des docstrings au fil des modifications.",
          benefit: "Documentation vivante du code.",
        },
      ],
    },
    {
      id: "performance",
      name: "Performance",
      score: 10,
      maxScore: 20,
      icon: "⚡",
      color: "#f97316",
      summary:
        "Les principaux points de performance sont : l'absence de Bullet (détection N+1), les N+1 probables dans GraphQL, le cache non configuré en production, et l'absence de fragment caching.",
      quickWins: [
        "PERF-001 — Ajouter Bullet (XS)",
        "PERF-003 — Configurer cache_store en production (S)",
        "PERF-005 — Précharger associations dans QueryType clients (XS)",
      ],
      structuralWork: [
        "PERF-002 — Résoudre les N+1 GraphQL avec Batch/DataLoader (S)",
        "PERF-004 — Introduire le fragment caching (M)",
        "PERF-006 — Analyser et ajouter index si nécessaire (S)",
      ],
      findings: [
        {
          id: "PERF-001",
          title: "Absence de la gem Bullet pour détecter les N+1",
          severity: "critical",
          effort: "XS",
          sellability: 3,
          location: "Gemfile — Bullet absente",
          observation:
            "Aucun outil n'est en place pour détecter les requêtes N+1 en développement. Les développeurs ne sont pas alertés lors de l'introduction de N+1.",
          risk:
            "Les N+1 passent en production inaperçus. Une liste de 50 commandes avec N+1 peut générer des centaines de requêtes.",
          recommendation:
            "Ajouter gem 'bullet', group: :development et configurer Bullet.enable = true dans development.rb.",
          benefit:
            "Détection proactive des N+1 avant mise en production. Réduction des incidents de performance.",
        },
        {
          id: "PERF-002",
          title: "N+1 potentiels dans les types GraphQL (Order, Client)",
          severity: "major",
          effort: "S",
          sellability: 3,
          location: "app/graphql/types/order_type.rb, client_type.rb, query_type.rb",
          observation:
            "OrderType expose client, products, subscription. Sur une requête orders(client_id: X), chaque order charge séparément ses associations. Une requête sur 20 commandes = 61+ requêtes au lieu de 4 avec includes.",
          risk:
            "Requêtes GraphQL lentes sur les listes. Performance dégradée à mesure que les données croissent.",
          recommendation:
            "Utiliser GraphQL::Batch ou graphql-batch pour le batching. Ou précharger : Order.includes(:client, product_items: :product, daily_subscription: :subscription).",
          benefit:
            "Réduction drastique du nombre de requêtes sur les queries GraphQL listant des orders ou clients.",
        },
        {
          id: "PERF-003",
          title: "Cache store non configuré en production",
          severity: "major",
          effort: "S",
          sellability: 2,
          location: "config/environments/production.rb (ligne 54)",
          observation:
            "config.cache_store = :mem_cache_store est commenté. Rails utilise le :memory_store par défaut — non partagé entre processus, perdu au redémarrage.",
          risk:
            "Aucun cache applicatif efficace. Les fragment caches et Rails.cache ne persistent pas. Sous charge, la base de données est sollicitée inutilement.",
          recommendation:
            "Décommenter et configurer config.cache_store = :mem_cache_store. Ou utiliser Redis si déjà en place pour Sidekiq.",
          benefit:
            "Cache partagé et persistant. Possibilité d'utiliser le fragment caching et Rails.cache.",
        },
        {
          id: "PERF-004",
          title: "Pas de fragment caching dans les vues",
          severity: "major",
          effort: "M",
          sellability: 2,
          location: "app/views/, app/admin/",
          observation:
            "Aucun cache do ... end ou cache @model trouvé dans les vues. Les vues Admin (ActiveAdmin) et API (Jbuilder) sont régénérées à chaque requête.",
          risk:
            "Pages admin lourdes (listes de commandes, clients, factures) recalculent tout à chaque visite.",
          recommendation:
            "Identifier les vues les plus coûteuses. Ajouter cache [model, model.updated_at] pour les fragments stables.",
          benefit: "Réduction de la charge serveur sur les pages admin consultées fréquemment.",
        },
        {
          id: "PERF-005",
          title: "QueryType#all_clients et #client : Client.all sans optimisation",
          severity: "major",
          effort: "XS",
          sellability: 2,
          location: "app/graphql/types/query_type.rb (lignes 51-63)",
          observation:
            "Client.ordered et Client.all sont retournés sans includes. Une requête all_clients { id name comments } sur 100 clients = 1 + 100 requêtes pour les comments.",
          risk: "Performance dégradée sur les listes de clients avec associations.",
          recommendation:
            "Précharger les associations selon les champs demandés. Client.ordered.includes(:active_admin_comments) pour une première approche.",
          benefit: "Moins de requêtes sur les listes de clients.",
        },
        {
          id: "PERF-006",
          title: "Index potentiellement manquants",
          severity: "minor",
          effort: "S",
          sellability: 2,
          location: "db/schema.rb",
          observation:
            "La plupart des foreign keys ont des index. Un index composite sur notifications (target_type, target_id, happened_at) pourrait aider les requêtes d'order.",
          risk: "Full table scans possibles sur les notifications triées.",
          recommendation:
            "Analyser les requêtes lentes en production (logs, APM). Ajouter des index ciblés si des full table scans sont identifiés.",
          benefit: "Optimisation des requêtes les plus fréquentes.",
        },
        {
          id: "PERF-007",
          title: "Emails : deliver_later utilisé (positif)",
          severity: "positive",
          effort: "XS",
          sellability: 1,
          location: "app/controllers/api/v1/users_controller.rb",
          observation:
            "UserMailer.welcome_new_user(@user).deliver_later — les emails sont envoyés en asynchrone via Sidekiq. Bonne pratique.",
          risk: "N/A",
          recommendation: "Maintenir cette approche pour tous les envois d'emails.",
          benefit: "Emails asynchrones, pas de blocage des requêtes HTTP.",
        },
        {
          id: "PERF-008",
          title: "Jobs planifiés : exécution synchrone possible",
          severity: "minor",
          effort: "XS",
          sellability: 1,
          location: "app/jobs/",
          observation:
            "Les jobs sont conçus pour Sidekiq. Vérifier que perform_later est bien utilisé partout et qu'aucun perform_now n'est appelé en production pour ces jobs lourds.",
          risk: "Blocage des requêtes HTTP si perform_now est utilisé pour des jobs lourds.",
          recommendation:
            "Audit des appels aux jobs. S'assurer que les jobs planifiés utilisent perform_later.",
          benefit: "Performances HTTP maintenues même lors de traitements lourds.",
        },
      ],
    },
    {
      id: "architecture",
      name: "Architecture",
      score: 9,
      maxScore: 20,
      icon: "🏗️",
      color: "#06b6d4",
      summary:
        "L'architecture présente des forces (API versionnée, services pour certains domaines) mais des faiblesses structurelles : ratio services/models faible, couverture de tests insuffisante, Rails EOL.",
      quickWins: [
        "ARCH-004 — Planifier migration Rails 6.1+ (M)",
        "ARCH-005 — Mettre à jour rspec-rails, évaluer coffee-rails (S)",
        "ARCH-010 — Introduire un APM ou monitoring de base (S)",
      ],
      structuralWork: [
        "ARCH-001 — Enrichir la couche Service (M)",
        "ARCH-002 — Augmenter la couverture de tests (L)",
        "ARCH-003 — Introduire Form Objects, Query Objects, Policies (L)",
        "ARCH-006 — Réviser les callbacks à effet de bord (S)",
      ],
      findings: [
        {
          id: "ARCH-001",
          title: "Ratio services/models insuffisant (0.11 vs 0.3 recommandé)",
          severity: "critical",
          effort: "M",
          sellability: 2,
          location: "app/services/ (3 services) vs app/models/ (27 models)",
          observation:
            "Le projet compte 3 services (CryptoService, ExpoPushNotificationService, TwilioService) pour 27 models. Ratio 0.11. Un projet sain vise ≥ 0.3.",
          risk:
            "Chaque nouvelle fonctionnalité nécessite de modifier les models existants. Pas de briques réutilisables. Tests difficiles.",
          recommendation:
            "Extraire progressivement la logique métier vers des services : ImportService, InvoiceCreationService, OrderValidationService.",
          benefit: "Réutilisation, testabilité, séparation des responsabilités.",
        },
        {
          id: "ARCH-002",
          title: "Couverture de tests insuffisante (9 specs pour ~99 fichiers)",
          severity: "critical",
          effort: "L",
          sellability: 3,
          location: "spec/ — 9 fichiers de test",
          observation:
            "9 specs pour ~99 fichiers dans app/. Aucun spec pour : UsersController, SessionController, GraphQL mutations (UpdateClient, Order), Jobs, Services.",
          risk:
            "Chaque déploiement est un pari. Les régressions ne sont pas détectées. Refactoring risqué.",
          recommendation:
            "Prioriser les tests sur : mutations GraphQL critiques, services, jobs. Viser un ratio spec/code ≥ 0.3.",
          benefit:
            "Confiance pour déployer et refactorer. Documentation vivante du comportement attendu.",
        },
        {
          id: "ARCH-003",
          title: "Patterns manquants : Form Objects, Query Objects, Presenters, Policies",
          severity: "major",
          effort: "L",
          sellability: 2,
          location: "Global",
          observation:
            "Form Objects manquants pour les mutations complexes. Query Objects manquants pour les scopes enchaînés. Pas de couche Policy centralisée (Pundit).",
          risk: "Logique dispersée. Évolution coûteuse. Autorisation difficile à auditer.",
          recommendation:
            "Introduire des Form Objects pour les mutations complexes. Créer des Query Objects pour les requêtes réutilisables. Envisager Pundit.",
          benefit: "Code plus structuré, autorisation centralisée, validations réutilisables.",
        },
        {
          id: "ARCH-004",
          title: "Rails 6.0 en fin de vie (EOL depuis juin 2023)",
          severity: "major",
          effort: "M",
          sellability: 3,
          location: "Gemfile — rails ~> 6.0.1",
          observation:
            "Rails 6.0 a atteint sa fin de support de sécurité en juin 2023. Aucun correctif de sécurité n'est plus fourni pour cette version.",
          risk:
            "Non-conformité pour les audits sécurité (RGPD, ISO 27001). Assurance et clients peuvent exiger une version supportée.",
          recommendation:
            "Planifier une migration vers Rails 6.1 (LTS) ou Rails 7.x. Tester en environnement de staging.",
          benefit: "Support sécurité, accès aux nouvelles fonctionnalités Rails.",
        },
        {
          id: "ARCH-005",
          title: "Dépendances obsolètes (coffee-rails, spring, rspec-rails 3.5)",
          severity: "major",
          effort: "S",
          sellability: 2,
          location: "Gemfile",
          observation:
            "coffee-rails : CoffeeScript en maintenance minimale. spring : retiré du générateur Rails 7+. rspec-rails ~> 3.5 : très ancien. mandrill_mailer : vérifier la pérennité.",
          risk:
            "Gems non maintenues = pas de correctifs. Incompatibilités futures avec Ruby/Rails.",
          recommendation:
            "Migrer CoffeeScript vers JavaScript/TypeScript. Remplacer spring. Mettre à jour rspec-rails.",
          benefit: "Stack moderne, moins de dette technique.",
        },
        {
          id: "ARCH-006",
          title: "Callbacks avec effets de bord (Notification, PushNotification)",
          severity: "major",
          effort: "S",
          sellability: 1,
          location: "app/models/",
          observation:
            "Notification#send_push_notifications! et PushNotification#schedule déclenchent des effets de bord importants (envoi de notifications, planification de jobs) via callbacks.",
          risk: "Comportement imprévisible, tests complexes.",
          recommendation:
            "Pour les effets de bord complexes, envisager des services appelés explicitement après create/commit.",
          benefit: "Comportement plus prévisible, tests plus simples.",
        },
        {
          id: "ARCH-007",
          title: "API versioning présent (api/v1) — positif",
          severity: "positive",
          effort: "XS",
          sellability: 1,
          location: "config/routes.rb, app/controllers/api/v1/",
          observation:
            "L'API REST est versionnée (api/v1). Bonne pratique pour l'évolution sans casser les clients existants.",
          risk: "N/A",
          recommendation:
            "Maintenir le versioning. Documenter la politique de dépréciation si v2 est introduite.",
          benefit: "Évolution de l'API sans impact sur les clients existants.",
        },
        {
          id: "ARCH-008",
          title: "GraphQL sans versioning explicite",
          severity: "minor",
          effort: "M",
          sellability: 1,
          location: "app/graphql/",
          observation:
            "L'API GraphQL n'a pas de versioning. Les changements breaking impactent tous les clients.",
          risk: "Changements breaking non contrôlés.",
          recommendation:
            "Documenter les changements. Envisager des champs dépréciés avec deprecation_reason.",
          benefit: "Évolution contrôlée de l'API GraphQL.",
        },
        {
          id: "ARCH-009",
          title: "Structure Admin (ActiveAdmin) chargée (21 fichiers)",
          severity: "minor",
          effort: "S",
          sellability: 1,
          location: "app/admin/",
          observation:
            "21 fichiers ActiveAdmin. Personnalisations importantes (mapotempo, recapitulatif, ebp_gestion). La logique métier dans les blocks Admin peut devenir difficile à maintenir.",
          risk: "Admin difficile à maintenir.",
          recommendation:
            "Extraire la logique complexe des blocks Admin vers des services ou des presenters.",
          benefit: "Admin plus maintenable.",
        },
        {
          id: "ARCH-010",
          title: "Absence de monitoring applicatif (APM)",
          severity: "minor",
          effort: "S",
          sellability: 2,
          location: "Global",
          observation:
            "Barnes est présent (métriques Heroku) mais aucun APM (New Relic, Datadog, Scout). Pas de tracing des requêtes lentes.",
          risk: "Détection tardive des problèmes en production.",
          recommendation:
            "Envisager un APM. Au minimum, logs structurés et alertes sur les erreurs 5xx.",
          benefit: "Détection proactive des problèmes en production.",
        },
      ],
    },
    {
      id: "dependencies",
      name: "Dépendances",
      score: 3,
      maxScore: 10,
      icon: "📦",
      color: "#22c55e",
      summary:
        "Les dépendances présentent des risques majeurs : Rails 6.0 en EOL, 40+ CVEs identifiées via bundle-audit, gems obsolètes (coffee-rails, spring, rspec-rails 3.5).",
      quickWins: [
        "Mettre à jour graphql vers >= 2.0.32 (S)",
        "Activer bundle-audit en CI (XS)",
      ],
      structuralWork: [
        "Migration Rails 6.0 → 6.1 ou 7.x (M)",
        "Mise à jour globale des gems vulnérables (L)",
        "Remplacement des gems obsolètes (coffee-rails, spring) (S)",
      ],
      findings: [],
    },
  ],
  actionPlan: {
    lots: [
      {
        id: "lot1",
        name: "Quick Wins",
        color: "#22c55e",
        emoji: "🟢",
        days: 5,
        budgetMin: 2500,
        budgetMax: 5000,
        description:
          "Correction immédiate des risques les plus critiques avec un effort minimal.",
        sellability: 3,
        items: [
          {
            findingId: "SEC-002",
            title: "Activer force_ssl",
            domain: "Sécurité",
            severity: "critical",
            effort: "XS",
            impact: "Conformité SSL",
            details: "Décommenter config.force_ssl = true dans config/environments/production.rb",
            deliverable: "SSL forcé, redirection HTTP → HTTPS",
            estimate: "30 min",
          },
          {
            findingId: "SEC-005",
            title: "Réduire log_level en production",
            domain: "Sécurité",
            severity: "major",
            effort: "XS",
            impact: "Réduction fuites",
            details: "Remplacer config.log_level = :debug par :info (ou :warn)",
            deliverable: "Logs moins verbeux en production",
            estimate: "15 min",
          },
          {
            findingId: "SEC-006",
            title: "Configurer CORS correctement",
            domain: "Sécurité",
            severity: "major",
            effort: "XS",
            impact: "Sécurité API",
            details:
              "Remplacer origins 'example.com' par les domaines réels via ENV",
            deliverable: "CORS configuré pour le frontend réel",
            estimate: "1 h",
          },
          {
            findingId: "SEC-008",
            title: "Externaliser secrets dev/test",
            domain: "Sécurité",
            severity: "major",
            effort: "XS",
            impact: "Secrets sécurisés",
            details:
              "Utiliser ENV ou credentials pour secret_key_base en dev/test",
            deliverable: "Aucun secret en clair dans secrets.yml",
            estimate: "1 h",
          },
          {
            findingId: "SEC-001",
            title: "Mise à jour graphql (CVE RCE)",
            domain: "Sécurité",
            severity: "critical",
            effort: "S",
            impact: "Élimination CVE critique",
            details: "bundle update graphql vers >= 2.0.32",
            deliverable: "CVE-2025-27407 corrigée",
            estimate: "2-4 h",
          },
          {
            findingId: "PERF-001",
            title: "Ajouter Bullet",
            domain: "Performance",
            severity: "critical",
            effort: "XS",
            impact: "Détection N+1",
            details: "Ajouter gem bullet, configurer en development",
            deliverable: "Alertes N+1 en dev",
            estimate: "1 h",
          },
          {
            findingId: "PERF-003",
            title: "Configurer cache_store",
            domain: "Performance",
            severity: "major",
            effort: "S",
            impact: "Cache production",
            details:
              "Configurer :mem_cache_store ou :redis_cache_store en production",
            deliverable: "Cache partagé fonctionnel",
            estimate: "2-4 h",
          },
          {
            findingId: "PERF-005",
            title: "Précharger associations QueryType",
            domain: "Performance",
            severity: "major",
            effort: "XS",
            impact: "Moins de requêtes",
            details: "Ajouter includes dans all_clients et client selon les champs",
            deliverable: "Moins de requêtes sur les listes clients",
            estimate: "2 h",
          },
          {
            findingId: "CQ-005",
            title: "Mémoïser Rails.logger/Time.zone (jobs)",
            domain: "Qualité",
            severity: "major",
            effort: "XS",
            impact: "Code propre",
            details: "today = Time.zone.today et logger = Rails.logger en début de perform",
            deliverable: "Code plus propre",
            estimate: "1 h",
          },
          {
            findingId: "CQ-007",
            title: "Use scope access UsersController",
            domain: "Qualité",
            severity: "major",
            effort: "XS",
            impact: "Réutilisation",
            details: "Créer un scope User et l'utiliser dans le controller",
            deliverable: "Logique de requête centralisée",
            estimate: "1 h",
          },
        ],
      },
      {
        id: "lot2",
        name: "Chantiers Structurants",
        color: "#f97316",
        emoji: "🟡",
        days: 18,
        budgetMin: 9000,
        budgetMax: 18000,
        description:
          "Amélioration profonde de la sécurité, performance et maintenabilité.",
        sellability: 2,
        items: [
          {
            findingId: "SEC-003",
            title: "Mise à jour ActiveAdmin",
            domain: "Sécurité",
            severity: "critical",
            effort: "M",
            impact: "XSS, CSV injection",
            details: "Mettre à jour vers ActiveAdmin >= 3.2.2 (ou 4.x)",
            deliverable: "CVE XSS et CSV injection corrigées",
            estimate: "1-3 j",
            prerequisite: "Tests de non-régression admin",
          },
          {
            findingId: "SEC-004",
            title: "Migration Rails 6.0 → 6.1+",
            domain: "Sécurité",
            severity: "critical",
            effort: "S",
            impact: "SQL injection, EOL",
            details: "Mise à jour Gemfile, résolution des dépréciations, tests",
            deliverable: "Rails supporté, CVE ActiveRecord corrigées",
            estimate: "1-2 j",
            prerequisite: "Environnement de staging",
          },
          {
            findingId: "SEC-007",
            title: "Mise en place CSP",
            domain: "Sécurité",
            severity: "major",
            effort: "S",
            impact: "Défense XSS",
            details:
              "Créer config/initializers/content_security_policy.rb",
            deliverable: "Headers CSP envoyés",
            estimate: "2-4 h",
          },
          {
            findingId: "SEC-009",
            title: "Mise à jour dépendances (CVEs)",
            domain: "Sécurité",
            severity: "major",
            effort: "L",
            impact: "40+ CVEs",
            details:
              "bundle update sur les gems vulnérables (puma, loofah, rexml, etc.)",
            deliverable: "Réduction des CVEs",
            estimate: "3-5 j",
            prerequisite: "Migration Rails (certaines gems dépendent de la version Rails)",
          },
          {
            findingId: "CQ-001",
            title: "Refactorer UpdateClient",
            domain: "Qualité",
            severity: "critical",
            effort: "M",
            impact: "Maintenabilité",
            details:
              "Introduire ClientAttributesInput, grouper les assignations",
            deliverable: "Mutation lisible, maintenable",
            estimate: "1-2 j",
            prerequisite: "Tests sur la mutation",
          },
          {
            findingId: "CQ-002",
            title: "Corriger Law of Demeter mapotempo",
            domain: "Qualité",
            severity: "critical",
            effort: "S",
            impact: "Découplage",
            details: "Introduire méthodes déléguées ou Presenter",
            deliverable: "Découplage mapotempo",
            estimate: "4-8 h",
          },
          {
            findingId: "PERF-002",
            title: "Résoudre N+1 GraphQL",
            domain: "Performance",
            severity: "major",
            effort: "S",
            impact: "Requêtes",
            details:
              "graphql-batch ou DataLoader, ou includes dans résolveurs",
            deliverable: "Requêtes GraphQL optimisées",
            estimate: "4-8 h",
            prerequisite: "Bullet pour valider",
          },
          {
            findingId: "ARCH-001",
            title: "Enrichir couche Service",
            domain: "Architecture",
            severity: "critical",
            effort: "M",
            impact: "Réutilisation",
            details:
              "Créer ImportService, InvoiceCreationService, OrderValidationService",
            deliverable: "Logique métier extraite des models",
            estimate: "2-3 j",
            prerequisite: "Tests sur les chemins critiques",
          },
          {
            findingId: "ARCH-002",
            title: "Augmenter couverture tests",
            domain: "Architecture",
            severity: "critical",
            effort: "L",
            impact: "Confiance",
            details:
              "Specs pour mutations GraphQL, services, jobs",
            deliverable: "Ratio spec/code ≥ 0.3",
            estimate: "5-10 j",
          },
        ],
      },
      {
        id: "lot3",
        name: "Nice to Have",
        color: "#3b82f6",
        emoji: "🔵",
        days: 8,
        budgetMin: 4000,
        budgetMax: 8000,
        description:
          "Amélioration de la qualité de vie des développeurs et maintenabilité long terme.",
        sellability: 1,
        items: [
          {
            findingId: "CQ-009",
            title: "Noms de variables",
            domain: "Qualité",
            severity: "minor",
            effort: "M",
            impact: "Lisibilité",
            details: "Renommer les variables non communicatives (e, v, p, t, a)",
            deliverable: "Variables explicites dans tout le codebase",
            estimate: "1-3 j",
          },
          {
            findingId: "CQ-010",
            title: "Documentation (IrresponsibleModule)",
            domain: "Qualité",
            severity: "cosmetic",
            effort: "L",
            impact: "Onboarding",
            details: "Ajouter des commentaires YARD ou des docstrings",
            deliverable: "~80 modules documentés",
            estimate: "3-10 j",
          },
          {
            findingId: "PERF-006",
            title: "Index manquants",
            domain: "Performance",
            severity: "minor",
            effort: "S",
            impact: "Requêtes",
            details:
              "Analyser les requêtes lentes en production. Ajouter index composite sur notifications.",
            deliverable: "Index optimisés",
            estimate: "2-8 h",
          },
          {
            findingId: "ARCH-006",
            title: "Réviser callbacks",
            domain: "Architecture",
            severity: "major",
            effort: "S",
            impact: "Testabilité",
            details:
              "Extraire les effets de bord complexes vers des services appelés explicitement",
            deliverable: "Callbacks simplifiés",
            estimate: "2-8 h",
          },
          {
            findingId: "ARCH-008",
            title: "GraphQL versioning",
            domain: "Architecture",
            severity: "minor",
            effort: "M",
            impact: "Évolution API",
            details:
              "Documenter les changements. Ajouter deprecation_reason sur les champs obsolètes.",
            deliverable: "Politique de dépréciation GraphQL documentée",
            estimate: "1-3 j",
          },
          {
            findingId: "ARCH-010",
            title: "Monitoring applicatif",
            domain: "Architecture",
            severity: "minor",
            effort: "S",
            impact: "Observabilité",
            details: "Envisager un APM (New Relic, Datadog, Scout). Alertes sur les erreurs 5xx.",
            deliverable: "Alertes et tracing en production",
            estimate: "2-8 h",
          },
        ],
      },
    ],
    budget: [
      { lot: "Quick Wins (Lot 1)", days: 5, budgetMin: 2500, budgetMax: 5000 },
      { lot: "Chantiers Structurants (Lot 2)", days: 18, budgetMin: 9000, budgetMax: 18000 },
      { lot: "Nice to Have (Lot 3)", days: 8, budgetMin: 4000, budgetMax: 8000 },
    ],
    sequencing:
      "Approche recommandée : livraison itérative par sprints de 2 semaines, avec une revue de progression à chaque fin de sprint.",
  },
};

export function getDomainById(id: string): Domain | undefined {
  return report.domains.find((d) => d.id === id);
}
