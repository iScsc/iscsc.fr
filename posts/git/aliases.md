git config --global alias.gg "log --graph --oneline --all --decorate"
pour pouvoir exécuter $git gg et avoir un joli arbre git

POUR AVOIR LES DATES DANS UN git log --oneline:
je conseille le format '%C(auto)%h %Cred-%ch- %C(auto)%d %s', e.g.
git log --graph --all --decorate --color=always --pretty='%C(auto)%h %Cred-%ch- %C(auto)%d %s'
