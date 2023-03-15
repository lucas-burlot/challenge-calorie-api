# Challenge Calories API

## Introduction

Challenge Calories API est une API permettant de calculer les calories d'une recette créée. Elle a été développée avec Node.js et Express.js.

Nous avons mis en place un système de test unitaire avec la librairie `mocha`

## Installation

1. Cloner le projet à partir du repo GitHub : `git clone https://github.com/lucas-burlot/challenge-calorie-api.git`
2. Installer les dépendances en utilisant la commande : `npm install`
3. Lancer l'application avec la commande : `npm start`
4. Pour lancer les tests unitaire : `npm run test`

## Utilisation

### Endpoints

L'API propose les endpoints suivants :

| Route                    | Controller           | Modèle       | Description                                                  |
|--------------------------|----------------------|--------------|--------------------------------------------------------------|
| `GET /recipes`            | `recipeController`   | `Recipe`     | Récupère toutes les recettes                                  |
| `GET /recipes/:id`        | `recipeController`   | `Recipe`     | Récupère une recette en fonction de son ID                    |
| `POST /recipes`           | `recipeController`   | `Recipe`     | Crée une nouvelle recette                                     |
| `PUT /recipes/:id`        | `recipeController`   | `Recipe`     | Met à jour une recette en fonction de son ID                   |
| `DELETE /recipes/:id`     | `recipeController`   | `Recipe`     | Supprime une recette en fonction de son ID                     |
| `GET /recipes/:id/analyse`| `recipeController`   | `Recipe`     | Calcule les calories d'une recette en fonction de son ID      |
| `GET /recipes/random`| `recipeController`   | `Recipe`     | Génère une recette aléatoire      |
| `GET /ingredients`        | `ingredientController`| `Ingredient`| Récupère tous les ingrédients                                 |                |
| `POST /users/register`    | `userController`     | `User`       | Crée un nouvel utilisateur                                    |
| `POST /users/login`       | `userController`     | `User`       | Connecte un utilisateur en générant un JWT dans le header     |

### Modèle
L'API utilise 3 modèles : Recipe, Ingredient et User.

##### Recipe

| Modèle  | Descripton                                 |
|---------------|----------------------------------|
| id            | identifiant unique de la recette |
| user_id       | identifiant de l'utilisateur     |
| name          | nom de la recette                 |
| description   | description de la recette         |
| ingredients   | liste des ingrédients utilisés    |
| steps  | liste des instructions            |

| Modèle |  Descripton                                  |
|------------------|------------------------------------|
| id               | identifiant unique de l'ingrédient |
| name             | nom de l'ingrédient                |
| units            | unité (en g ou ml)                 |
| calories         | nombre de calories pour 100g       |
| proteins         | nombre de protéines pour 100g      |
| carbohydrates    | nombre de glucides pour 100g       |
| lipids           | nombre de lipides pour 100g        |

| Modèle |   Descripton                         |
|-------------|----------------------------|
| id          | identifiant unique de l'utilisateur |
| username    | nom d'utilisateur                 |
| password    | mot de passe hashé de l'utilisateur |


### JWT

Un JSON Web Token (JWT) est utilisé pour les endpoints nécessitant une authentification. Le token doit être placé dans le header de la requête sous la clé `Authorization`. La valeur du header doit être `Bearer [token]` où `token` est le JWT généré lors de la connexion.

### Modèles

L'API utilise trois modèles :

1. `Recipe` : représente une recette
2. `Ingredient` : représente un ingrédient
3. `User` : représente un utilisateur

### Documentation

La documentation de l'API est générée automatiquement à l'aide de la commande `apidoc -i ./routes -o ./apid`

La documentation est ensuite accessible à l'adresse suivante : https://challenge-calories-api.herokuapp.com/apidoc
