par nicolas
> ls -al ~/.ssh
> ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
> eval "$(ssh-agent -s)"
> ssh-add ~/.ssh/id_rsa
> cat ~/.ssh/id_rsa.pub
# Ajouter le résultat aux clés SSH sur github.com > settings
> ssh -T git@github.com
> cd ~/repo
> git remote set-url origin git@github.com:username/reponame.git
 au cas où, la procédure pour connecter via ssh à github
