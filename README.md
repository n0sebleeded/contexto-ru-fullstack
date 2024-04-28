## Сontexto-ru
### English description:
It is copy of original [contexto game](https://contexto.me/) on another language.
I recommend that before getting to know the frontend part of this web application, first visit the page of its [backend part](https://github.com/sabexzero/contexto-ru-backend).
To run this project, follow the following instructions:

1. First, you need to clone the project to your local computer:
```bash
git clone https://github.com/n0sebleeded/contexto-ru-frontend/
``` 

2. Then go to the folder with the cloned project and create an .env file with the following contents if you run the entire project on a local machine:
```
VITE_REACT_APP_SERVER_PORT=8080
VITE_REACT_APP_SERVER_IP=http://localhost
```

3. If you have already read instructions for the [backend part](https://github.com/sabexzero/contexto-ru-backend), you can start the project using next command:
```bash
npm install
npm run dev
```

### A function describing the fill width depending on the numeric value of the association:
```math
w =\left\{\begin{matrix}
 & 1, && x > 3500 \\
 & e^{\ln{100} - \frac{x}{800}} && x <= 3500
\end{matrix}\right.
```

w - fill width, x - value of the association

The function is as close as possible to the original one from contexto.me.

### Tech stack:
- React(TS)
- Vite
- UI:
    - Framer-motion
    - Material-UI
- Redux/Toolkit
- Axios

### Russian desctiption:
Этот репозиторий представляет собой клиентскую часть копии игры [contexto](https://contexto.me/) на русском языке.
Рекомендую перед ознакомлением с клиентской частью прочитать описание и инструкции для [серверной части](https://github.com/sabexzero/contexto-ru-backend) игры.
Чтобы запустить проект следуйте следующим пунктам:

1. Клонируйте данный репозиторий на свою локальную машину:
```bash
git clone https://github.com/n0sebleeded/contexto-ru-frontend/
``` 

2. Затем, перейдите в директорию склонированного репозитория и создайте .env файл, добавьте в него следующие строки(Если вы запускаете проект на локальной машине, SERVER_IP должен остаться таким же, SERVER_PORT следует узнать развернув серверную часть): 
```
VITE_REACT_APP_SERVER_PORT=8080
VITE_REACT_APP_SERVER_IP=http://localhost
```

3. Если вы уже ознакомились с описанием [серверной части](https://github.com/sabexzero/contexto-ru-backend), вы можете запустить проект следующими командами:
```bash
npm install
npm run dev
```

### Функция описывающая ширину заполнения строки ассоциации в зависимости от числового значения ассоциации:
```math
w =\left\{\begin{matrix}
 & 1, && x > 3500 \\
 & e^{\ln{100} - \frac{x}{800}} && x <= 3500
\end{matrix}\right.
```

w - ширина заполнения(в процентах), x - числовое значения ассоциации

Функция максимально близка к оригинальной из contexto.me.
