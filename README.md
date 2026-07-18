# Tremplin

Repère les offres administratives (assistanat, secrétariat, accueil, ADV…) sur
le marché de l'emploi via l'**API officielle France Travail**, prépare une
candidature pour chacune (atouts + message au recruteur), et laisse le candidat
**valider d'un clic**. L'envoi passe toujours par le canal officiel de l'offre
(lien de candidature ou email) : rien ne part sans action humaine — conforme et
sans risque de bannissement.

## Lancer la démo (sans aucune clé, tout de suite)

```bash
npm install
npm start
```

Ouvrez http://localhost:4059 — l'appli tourne en **mode simulé** (badge
« Aperçu démo »), avec de vraies offres administratives factices. Parfait pour
montrer le produit en rendez-vous.

## Passer en réel (vraies offres France Travail)

1. **Créer votre application** sur https://francetravail.io et souscrire à l'API
   « Offres d'emploi v2 ». Vous obtenez un `client_id` et un `client_secret`,
   et le `scope` exact s'affiche sur le tableau de bord de votre application.
2. **Copier `.env.example` en `.env`**, mettre `MOCK_MODE=0` et coller vos clés :

   ```
   MOCK_MODE=0
   FT_CLIENT_ID=votre_client_id
   FT_CLIENT_SECRET=votre_client_secret
   FT_SCOPE=api_offresdemploiv2 o2dsoffre
   ```
3. **Relancer** `npm start`. Le badge passe à « Données réelles ».

> Le test en conditions réelles doit se faire chez vous : l'appel à
> `api.francetravail.io` nécessite vos identifiants (qui ne doivent jamais
> quitter votre serveur).

## Structure

| Fichier            | Rôle |
|--------------------|------|
| `server.js`        | Serveur Express : API + service du front, bascule démo/réel |
| `francetravail.js` | OAuth2 + recherche d'offres (token mis en cache) |
| `profils.js`       | Profils candidats : mots-clés/ROME, atouts, pitch |
| `candidature.js`   | Normalisation d'offre + score d'affinité + candidature préparée |
| `mock.js`          | Offres simulées pour le mode démo |
| `public/index.html`| Interface (onglets profils, pipeline, cartes offres) |

## À faire avant une vraie mise en ligne

- **Codes ROME** : vérifier/compléter ceux de `profils.js` via l'endpoint
  référentiel de l'API (`/partenaire/offresdemploi/v2/referentiel/metiers`).
- **Affinité** : le score actuel est un simple recouvrement de mots-clés
  (`candidature.js`) — remplaçable par un vrai modèle.
- **RGPD** : dès que vous stockez CV et données candidats, vous êtes
  responsable de traitement (consentement, politique de confidentialité,
  sécurité). À cadrer avant la mise en ligne.
- **Envoi** : garder le modèle « assisté » (préparer, l'humain valide). Ne pas
  ajouter d'envoi 100 % automatique par-dessus.
