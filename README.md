# Como iniciar
1- Abrimos un cmd/Powershell y nos dirigimos a la carpeta raíz de ambas aplicaciones, donde se encuentra el archivo => docker-compose.yml

2- Corremoscomando - docker-compose up --build

## Pruebas
### App1
http://localhost:4000/tz?zone=America/Argentina/Santa-Fe
<br>
![image]()

### App2
http://localhost:4001/checker?url=app1&zone=America/Argentina/Santa-Fe
<br>
![image]()
