# Application météo

### Contexte
Rendu du TD3 du cours de Programmation Web (Master 2).
Sujet : [TD3](https://www.reveillere.fr/M2WEB/tds/td3/)

## Installation
Télécharger l'archive et la décompresser. 

***Important ! Il faut ouvrir le fichier `index.html` via un serveur local (WAMP, XAMPP, Live Server pour vscode..)***

## Structure des dossiers
```
|- TD3/
	|- script/
		|- model/
		|- view/
		|- controller/
			|- API/
	|- style/
	|- assets/
	|- docs/
		|- assets/
```

## Fonctionnalités

- L'utilisateur peut entrer le nom d'une ville ou un code postale.
- Une auto-complétion propose à l'utilisateur les villes correspondant à sa recherche (plusieurs villes avec le même nom/code postale).
- L'utilisateur peut cliquer sur la map afin de sélectionner l'endroit où il veut connaître la météo.
- Les informations de chaque nouvelle ville recherchée s'ajoutent sur la page sous forme de liste cliquable pour dérouler le détails.
- Chaque ville ajoutée se met en tête de liste et toutes les autres listes se 'ferment' pour plus de lisibilité.
- Un bouton permet d'effacer la liste des villes.
- Une ville/endroit a un nom détaillé et 3 sections d'informations: 
	- Les informations détaillées du jour courant.
	- Les informations globales des 5 jours consécutifs (jour courant compris).
	- De courtes informations sur la météo par heures sur la journée courante. 
- Des animations lors de l'affichage des données viennent égayer l'application.
- Un accès à la documentation est possible via le bouton `Documentation`. 

### API utilisées
 - [prevision-meteo](https://www.prevision-meteo.ch/) pour récupérer les informations relatives à la météo.
 - [google maps](https://cloud.google.com/maps-platform/) pour afficher la carte et récupérer des informations plus précises sur le lieu en passant la géolocalisation (utile lors des cliques sur la map).
 - [woosmap](https://www.woosmap.com/fr/) pour générer l'auto-complétion lorsque l'utilisateur tape le nom de sa ville.


## Auteur
Wilfried Augeard.
