SI vous voulez créer un repo, que ce soit sur l'orga de SCSC ou sur votre compte perso, il y a essentiellement 3 possibilités:
1️⃣ si le repo est créé depuis github avec aucun travail en local, 
cd ~/path/to/workspace
git clone <url_or_ssh_of_remote>`

2️⃣ si le repo est créé depuis github et que vous voulez tout faire depuis votre machine sans repo local déjà créé
cd ~/path/to/workspace
echo "# tmp" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin <url_or_ssh_of_remote>
git push -u origin main

3️⃣ si vous avez déjà un repo local avec du travail à push sur un remote tout juste créé
git remote add origin git@github.com:AntoineStevan/tmp.git
git branch -M main
git push -u origin main


➡️ petites précisions : 
 + git branch -M ... pour renommer la branche courante vers main, c'est un raccourci de git branch --move --force ...
github privilégie main plutôt que master, c'est pour forcer le renommage de la branche principale
 + git push -u ... ... pour set le upstream à utiliser par défaut quand vous utiliser push et pull
comme ça il est possible d'écrire git push au lieu de git push origin et git fera bien un push sur origin

et n'hésitez pas à utiliser man <command> ou <command> --help ou <command> -h (pas toujours) pour aller lire la doc 
j'ai pas fait grand chose de plus que recopier la doc pour les précisions 😉
