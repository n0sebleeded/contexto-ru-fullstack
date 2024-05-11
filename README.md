## Сontexto-ru
### English description:
This repository is a full stack copy of the game [contexto](https://contexto.me/) in Russian.
It is worth mentioning the existence of a separate repository [backend](https://github.com/sabexzero/contexto-ru-backend) a game written in Java SpringBoot.
To start the project, follow the following steps:

1. First, you need to clone the project to your local computer:
```bash
git clone https://github.com/n0sebleeded/contexto-ru-frontend/
``` 

2. The project is launched on the local machine as follows:
```bash
npm install
npm run build
npm run start
```

3. If the application is launched with a port other than 3000, then go to the .env file and change the line:
```bash
NEXT_PUBLIC_REACT_APP_SERVER_URL=http://localhost:<PORT>
```

Instead of <PORT>, specify the port on which the application is deployed.

### Current issues:
- #### The problem of running a python script in next js was solved like this: 

```ts
const pythonExec = async (path: string | undefined, word: string | null) => {
    return new Promise((resolve, reject) => {
        const py = spawn('python', [`${path} ${word} ручка`], {shell: true});

        py.stdout.on('data', function(data) {
            console.log(data.toString());
            resolve(data.toString());
        });

        py.stderr.on('data', (data) => {
            console.log(data.toString());
            reject(data.toString());
        });
    });
};
```

If you have any suggestions on how to solve this problem, please contact me (translating the backend into python frameworks like FastAPI, Flask, Django, etc. I'm not considering it).
- #### The problem of dynamic generation:
The application cannot be deployed on gh-pages or vercel due to two reasons:
1. Dynamic generation.
Dynamic generation is necessary to pass parameters to a GET request:
```ts
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
    const path = process.env.NEXT_PUBLIC_SCRIPT_PATH;

    try {
        const searchParams= req.nextUrl.searchParams;
        const word = searchParams.get("word");
``` 
Gh-pages, in turn, only deploys static applications.

2. Running the python script through the server cli. 
It's simple, the kernel servers for deploying extjs applications do not have a python environment, therefore it is not possible to run the script.


### A function describing the fill width depending on the numeric value of the association:
```math
w =\left\{\begin{matrix}
 & 1, && x > 3500 \\
 & e^{\ln{100} - \frac{x}{800}} && x <= 3500
\end{matrix}\right.
```

w - fill width, x - value of the association

### The function of translating the distance between two vectors of words into a form similar to [contexto](https://contexto.me/):
```math
y(x) = e^{(\log(10000) - 9,21x)}
```

The functions is as close as possible to the originals one from contexto.me.

### Tech stack:
- React(TS)
- Vite(before migration)
- UI:
    - Framer-motion
    - Material-UI
- Redux/Toolkit
- Axios
- Next js(after migration)

### Русское описание:
Этот репозиторий представляет собой fullstack копию игры [contexto](https://contexto.me/) на русском языке.
Стоит упомянуть о существовании отдельного репозитория [серверной части](https://github.com/sabexzero/contexto-ru-backend) игры, написанном на Java SpringBoot.
Чтобы запустить проект следуйте следующим пунктам:

1. Клонируйте данный репозиторий на свою локальную машину:
```bash
git clone https://github.com/n0sebleeded/contexto-ru-frontend/
``` 

2. Запуск проекта на локальной машине осуществляется следующим образом:
```bash
npm install
npm run build
npm run start
```

3. Если приложение запускается с портом, отличным от 3000, то зайдите в .env файл и измените строку:
```bash
NEXT_PUBLIC_REACT_APP_SERVER_URL=http://localhost:<PORT>
```
Вместо <PORT> укажите порт на котором разворачивается приложение.

### Актуальные проблемы:
- #### Проблема запуска python скрипта в next js была решена так: 

```ts
const pythonExec = async (path: string | undefined, word: string | null) => {
    return new Promise((resolve, reject) => {
        const py = spawn('python', [`${path} ${word} ручка`], {shell: true});

        py.stdout.on('data', function(data) {
            console.log(data.toString());
            resolve(data.toString());
        });

        py.stderr.on('data', (data) => {
            console.log(data.toString());
            reject(data.toString());
        });
    });
};
```

Если у вас есть предложения, как решить эту проблему, то прошу связаться со мной(перевод бекенда на python фреймворки по типу FastAPI, Flask, Django и тд. не рассматриваю).
- #### Проблема динамической генерации:
Приложение невозможно развернуть на gh-pages или vercel из-за двух причин:
1. Динамическая генерация.
Динамическая генерация необходиима для передачи параметров в GET-запрос:
```ts
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
    const path = process.env.NEXT_PUBLIC_SCRIPT_PATH;

    try {
        const searchParams= req.nextUrl.searchParams;
        const word = searchParams.get("word");
``` 
Gh-pages в свою очередь разворачивает только статические приложения.

2. Запуск python скрипта через серверный cli. 
Все просто, сервера vercel для разворачивания next js приложений не имеют python окружения, следовательно запустить скрипт не представляется возможным. 

### Функция описывающая ширину заполнения строки ассоциации в зависимости от числового значения ассоциации:
```math
w(x) =\left\{\begin{matrix}
 & 1, && x > 3500 \\
 & e^{\ln{100} - \frac{x}{800}} && x <= 3500
\end{matrix}\right.
```

w - ширина заполнения(в процентах), x - числовое значения ассоциации

### Функция перевода расстояния между двумя векторами слов в вид, подобный [contexto](https://contexto.me/):
```math
y(x) = e^{(\log(10000) - 9,21x)}
```

Функции максимально близки к оригинальным из contexto.me.
