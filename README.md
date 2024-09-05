# Ronholingo

Ronholingo est un site web gratuit, interactif et amusant pour l'apprentissage du vocabulaire en anglais, français, espagnol, allemand, italien, japonais et vietnamien.

Le site est déjà déployé sur Netlify. Le lien est ci-dessous.

Lien Website : https://ronholingo.netlify.app/

Vous pouvez le tester mais si vous voulez contribuer et rajouter des fonctionnalités, vous devez suivre les instructions ci-dessous.
1. Cloner le projet.
2. Installer les dépendances avec la commande `npm install`.
3. Nous avons caché les clés API 'OpenAI' et l'avons définie comme une variable d'environnement sur netlify. Vous ne pouvez pas accéder à cette clé car elle est payante en fonction 
de l'utilisation des modèle et des tokens utilisés par requete envoyée et reçue. Si vous voulez travailler sur le projet en local et vous voulez l'utiliser vous devez configuer netlify-cli pour travauller en local
comme suit:  
    - Netlify CLI est déjà inclus dans le package.json. Donc si vous avez installé les dépendances, vous avez déjà netlify-cli.
    - Connexion à votre compte Netlify : Connectez-vous à votre compte Netlify via la CLI. Utilisez la commande : `netlify login`.
    - Lier netlify-cli à notre site: Pour cette partie on vous demande de nous contacter soit Cristhian : cristhian.roquillo@heig-vd.ch ou Julien : julien.holzer@heig-vd.ch. Nous devons
    faire quelques vérifications avant de vous donner l'id du site web car la clé est affichée dans le terminal à chaque fois qu'il y a une requête envoyée et reçue.
    - Une fois l'id du site web récu. Vous devez passer la commande suivante : `netlify link`.
    - Une fois la commande passée, vous devez selectinner Enter a site ID et coller l'id du site web.
    - Si vous avez le bon ID le message suivant s'affichera :  
   ![Linked to site](./src/images/netlify-link.png)
    - **Pour déployer le site en local vous devez passer la commande suivante :** `netlify dev`. Et ainsi avoir accès à la clé. Pour faire appel à la clé, utiliser : process.env.OPEN_AI_KEY
   , si vous voulez voir un exemple concret regagez les fichiers du repertoire `./functions`.
4. Si vous travaillez sur le front-end, Pas besoin de faire la partie `3.`
5. Vous devez travailler sur la branche `dev` et faire un `pull request` sur la branche `main` pour que nous puissions vérifier votre code et le merger sur la branche `main` car le pipeline est configuré pour déployer automatiquement sur netlify à chaque push sur la branche `main`.
6. Si vous voulez lacer les tests en local, vous pouvez utiliser la commande `npm test` un petit script est déjà configuré pour lancer tous les tests.
7. Si vous voulez rajouter des tests, vous devez les mettre imperativement dans le dossier `./tests` et les nommer de la manière suivante : `nomDuFichier.test.js`.