# Convertisseur Euro/Dollar - Liste des tâches

## Objectif

Réalisation d'un convertisseur euro/dollar en utilisant une single page application en Angular (version >= 8).

## Fonctionnalités demandées

1. Affichage du Taux de Change

   - [ ] Afficher une valeur représentant le taux de change initial EUR/USD (1.1).
   - [ ] Toutes les 3 secondes, ajouter/soustraire une valeur aléatoire entre -0.05 et +0.05.

2. Conversion Euro vers Dollar

   - [ ] Réaliser une interface utilisateur permettant de saisir un montant en EUR.
   - [ ] Afficher la valeur correspondante en USD en utilisant le taux de change.

3. Mise à jour automatique

   - [ ] Mettre en place un polling régulier pour mettre à jour la valeur en USD en fonction du taux de change.

4. Switch de Devise

   - [ ] Ajouter un switch pour choisir entre saisir un montant en EUR ou USD.
   - [ ] Si le switch est sur "EUR", la saisie est en Euro, et la valeur affichée est en USD.
   - [ ] Si le switch est sur "USD", la saisie est en Dollar, et la valeur affichée est en EUR.
   - [ ] Assurer la continuité des valeurs lorsque le switch est activé.

5. Champ de Taux de Change Fixe

   - [ ] Ajouter un champ permettant de fixer (forcer) un taux de change.

6. Désactivation du Taux de Change Fixe

   - [ ] Désactiver le taux de change fixe si actif lors d'une variation de plus de 2% avec le taux réel.
   - [ ] Effectuer la conversion en prenant en compte le taux réel dans ce cas.

7. Tableau d'Historique

   - [ ] Ajouter un tableau d'historique des 5 dernières demandes de conversion calculées.
   - [ ] Afficher le taux réel, le taux saisi, la valeur initiale avec la devise associée, et la valeur calculée avec la devise associée.

8. Attention à l'UX
   - [ ] Assurer une expérience utilisateur (UX) optimale pour toutes les fonctionnalités.
