pour modifier les messages du service ssh :
     + /etc/banner : affiche un message avant de se login en ssh (il faut changer Banner none dans /etc/ssh/sshd_config et systemctl restart sshd), commun entre les user normaux et les prisonniers
     + /etc/update-motd.d/10-uname : execute un script apres le login, commun entre les users normaux et les prisonniers, on doit pouvoir l'enlever voire rajouter d'autres scripts a cote -> ouep, xx-script dans le meme dossier, l'execution se fait par ordre croissant des xx, i.e. /etc/update-motd.d/10-foo s'execute avant /etc/update-motd.d/20-bar
     + /etc/motd : affiche un message apres le login, commun entre les users normaux et les prisonniers
     + /etc/profile.d/mymotd.sh : execute un script apres le login, uniquement les users normaux
     + /path/to/jail/prisoner/.ssh/rc : execute un script apres le login, uniquement les prisonniers

les messages et les sorties des scripts sont dans l'ordre de la liste !
il faut aussi mettre PrintLastLog no dans /etc/ssh/sshd_config et systemctl restart sshd

pour changer le port de la VM : https://www.cyberciti.biz/faq/howto-change-ssh-port-on-linux-or-unix-server/
