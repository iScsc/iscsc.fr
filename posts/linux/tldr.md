On en reparlera certainement la semaine prochaine mais, si on vous parle de commandes ou de choses que vous ne connaissez pas ou dont vous ne savez pas vous servir, comment obtenir des explications simplement?
     - utiliser la commande tldr (apt install tldr ou pacman -S tldr)
          + il suffit de lancer tldr cmd pour avoir des infos rapides et surtout des exemples d'utilisation d'une commande
          + si vous voulez une liste des commandes disponibles dans tldr
               * tldr -l | sed "s/, /\n/g; s/'//g; s/]//; s/\[//" | sort | less pour toutes les commandes
               * tldr -l | sed "s/, /\n/g; s/'//g; s/]//; s/\[//" | sort | grep "<pattern>" | less pour filtrer avec pattern
     - utiliser le switch d'aide de la commande:
          + typiquement cmd --help, cmd -h ou plus rarement cmd help
     - utiliser la commande man (je crois qu'elle est installe par defaut sur beaucoup de syteme)
          + lancer man cmd pour avoir le manuel complet de la commande
          + en general, c'est assez lourd, donc vous pouvez effectuer une recherche en tapant sur / puis pattern et entree. Ensuite, on appuie sur n pour chercher pattern en avant et N pour chercher en arriere

si vous avez toujours une question apres ca, n'hesitez pas a nous demander ou a google !!
mais si vous essayez un peu de chercher avant, les discussions et les explications seront plus interessantes et plus riches, et c'est en cherchant un peu soi meme avant de chercher de l'aide qu'on apprend le plus et que ca rentre 😉

exemple avec la commande git tag qu'on vous demande d'utiliser pour le fil rouge, comment savoir comment l'utiliser ?
     - tldr git-tag donne exactement la commande que je vous donne ici (https://discord.com/channels/844490231771955212/844624791574020108/931111551837012008)
     - man git puis /tag vous donne le nom de l'alias de git tag, i.e. git-tag
          + depuis la man git-tag vous donne encore plus d'info !
     - et git tag -h vous donne un resume de man git-tag

et ca marche pour plein d'autres commandes 💪
