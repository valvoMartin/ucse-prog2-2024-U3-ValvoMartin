# Iniciar
1- Abrimos un cmd/Powershell y nos dirigimos a la carpeta raíz de ambas aplicaciones, donde se encuentra el archivo => docker-compose.yml

2- Corremoscomando - docker-compose up --build

## Pruebas
### App1

http://localhost:4000/tz?zone=America/Argentina/Santa-Fe
![image](https://github.com/valvoMartin/ucse-prog2-2024-U3-ValvoMartin/blob/main/Screenshot%202024-07-28%20185522.png)
<br>


### App2
http://localhost:4001/checker?url=app1&zone=America/Argentina/Santa-Fe
![image](https://github.com/valvoMartin/ucse-prog2-2024-U3-ValvoMartin/blob/main/Screenshot%202024-07-28%20185537.png)
<br>

# Correcciones - Estado: APROBADO con Correcciones
- Las correcciones son opcionales, el trabajo está aprobado, pero si desean enviar las correcciones para reforzar conceptos pueden hacerlo
La aplicación no funciona, cuando hago `docker-compose up --build` aparece el siguiente error:
    $ docker-compose up --build
    time="2024-10-23T08:00:05-03:00" level=warning msg="C:\\Users\\mauro\\Desktop\\UCSE_TPs\\SEGURA\\ucse-prog2-2024-U3-ValvoMartin\\docker-compose.yml: `version` is obsolete"
    app2 Pulling
    app1 Pulling
    app2 Error pull access denied for app2-nodejs-image, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
    app1 Error context canceled
    Error response from daemon: pull access denied for app2-nodejs-image, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
el error justamente está en la forma en la que especifican las imágenes, de la forma en que lo hacen docker está tratando de hacer un pull de las mismas desde el repositorio central en DockerHub. Deberían de haber escrito el path en el cual las imagenes deberían de generarse, algo como:
    app1:
        image: timezone-api
        build: ./app1
        ports:
        - "4000:4000"
por otra parte, si yo hago un build de las imagenes previo a correr docker run, todo funciona correctamente.
- Como aclaración porque he visto en otros casos que no lo están probando correctamente, cuando se hace "docker-compose up" la aplicación debería hacer el build y el bootstraping de los servicios.
Una vez se ejecutaron, al acceder a la siguiente url `http://localhost:4001/checker?url=app1&zone=America/New_York` éste servicio "app2" se conecta con la "app1" y retorna el valor.
Noten que se pasan 2 query parameters, uno es el zone y el otro el nombre del contenedor del servicio 1 para poder generar el request correspondiente al contenedor del servicio1. Hay que resaltar que éste último se utiliza al hacer el GET usando Axios para dirigirse al servicio, pero NO deberían de hardcodearlo como "localhost".
Les dejo otras urls para testear:
    http://localhost:4001/checker
    http://localhost:4001/checker?url=app1&zone=America/Argentina/Buenos_Aires
    http://localhost:4001/checker?url=app1&zone=America/New_York
    http://localhost:4001/checker?url=app1&zone=Europe/London
Más acerca de timezones https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
- Podrían haber utilizado "container_name" como parámetro en el docker-compose.yml (https://community.bigbeartechworld.com/t/customizing-container-names-in-docker-and-docker-compose/320)