0️⃣ cloner le repo sur votre machine :
     1️⃣ git clone git@github.com:iScsc/fil-rouge.git avec ssh ou git clone https://github.com/iScsc/fil-rouge.git et vous aurez acces au remote en tant que origin
     2️⃣ si vouz aimez fork les repos. git clone git@github.com:<username>/fil-rouge.git puis git remote add upstream git@github.com:iScsc/fil-rouge.git -> origin sera VOTRE fork et upstream sera la fork du club

1️⃣ configurer git :
git config --global user.name "<name>"
git config --global user.email "<email>"
git config --global alias.tr "log --graph --all --oneline --decorate"
   - si vous voulez pas que votre vrai mail soit diffuse. checker https://github.com/settings/emails, activer email privacy, section Primary email address et prendre l'adresse qui ressemble a hash+user@users.noreply.github.com
  - pour tr vous pouvez le nommer comme vous voulez, moi c'est tr pour raccourcir tree parce que ca affiche l'arbre de git, mais si vous voulez l'appeler super-arbre-de-git-trop-cool, vous devriez pouvoir (chui un malade je raccourcis a mort mes commandes https://github.com/a2n-s/dotfiles/blob/main/.gitconfig)
  - si vous etes un jour bloque dans tr ou whatever le nom que vous lui avez donne, appuyez sur q pour sortir

2️⃣ creer et se mettre sur une nouvelle branche :
git switch --create <brname>

3️⃣ travailler et commit sur <brname>
git status        # pour voir l'etat de votre branche
git add <filname>  # pour ajouter un nouveau fichier ou bien
git add -u        # pour ajouter tous les fichiers deja trackes

git commit -m "<meaningful message>"
 a repeter a chaque changement, pas oblige de commit des qu'une modification est faite, mais penser a le faire regulierement
