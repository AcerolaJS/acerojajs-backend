# acerojajs-backend
Propuesta de proyecto colaborativo para la comunidad de AngulaJS&Beers

##Idea general
Backend to provide specific API to the acerolajs-frontend app and a public API.

##Primera aproximación
La idea de este proyecto seria que poniendo que tenemos una Startup de ejemplo que llamaremos "A -> Alakazam"  que quiere incluir gamificación en su modelo de negocio y en Alakazam tenemos a un Desarollador "J -> Jonh" y a un responsable de Marketing "K -> Kyle".

Con este proyecto tendriamos:

*Jonh* consumiria con una API REST pública (en la que previamente se ha registrado y tiene las credenciales correspondientes) en la que basicamente podrá realizar tres acciones:
- Registrar *"Gamers"* (Usuarios de *Alakazam*). p.e:"L -> Lilly".
- Emitir eventos concretos de *Alakazam* asociados a un usuario. p.e.: "PRIMER_POST_EN_ALAKAZAM" a *Lilly*.
- Obtener la información y estado de la gamificación de un usuario. p.e: Lilly (Obteniendo las Medallas de *Lilly*, el nivel de *Lilly*,...).

*Kyle* seria el que gestionaria la App (AngularJS) y crearia las medallas, diseñaria los niveles... y como parte pricipal de esta App (AngularJS) *Kyle* prodia asociar a los eventos una serie de acciones. p.e:Cuando se lance "PRIMER_POST_EN_ALAKAZAM" a *Gamer* , *Gamer* recibie una medalla y sube un poco su nivel. Esta configuración al dia siguiente la podria modificar para que se dieran dos medallas en lugar de una o subira mas el nivel sin tener que pedir a *Jonh* ninguna modificación.

El modelo entero estaria divido en tres grandes bloques:

1. Servidor NodeJS + (Expressjs || Lookbackjs) + MongoDB) [acerolajs-backend]
2. App (AngularJS) [acerolajs-frontend]
3. Landing de presentación [acerolajs-landing]
 
###1. acerolajs-backend

Este modulo/projecto es el core de todo en el se disitiguirian dos partes
- Api REST de consumo publico.
- Api REST Para la App. (acerolajs-frontend)

La Api REST de consumo publico deberia permitir:
- Registrar un *Gamer*.
- Emitir eventos sobre *Gamers*.
- Obtener infomación sobre un *Gamer*.

La Api de acerolajs-frontend
- Gestionar tus API Keys públicas y tus datos personales.
- Para cada API Key
  - Gestionar *Games* (CRUD)
  - Gestionar *Medallas* (CRUD)
  - Gestionar *Levels* (CRUD)
  - Gestionar *Eventos* que serian colecciones de *Acciones*
  
###2. acerolajs-frontend
Seria una aplicación web que prodria realizar todas las acciones que le proporciona acerolajs-backend mediante una interface limpia mediante AngularJS

- Gestionar tus API Keys públicas y tus datos personales.
- Para cada API Key
  - Gestionar *Games* (CRUD)
  - Gestionar *Medallas* (CRUD)
  - Gestionar *Levels* (CRUD)
  - Gestionar *Eventos* que serian colecciones de *Acciones*

###3. acerolajs-landing
Pagina web en la que:
- Se venderia la idea
- Se podrian registrar los usuarios
- Estaria la documentación necesaria para *John* para poder consumir la API pública y un tuto para *Kyle* de como funciona la APP
