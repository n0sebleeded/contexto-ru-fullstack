## Сontexto-ru
It is copy of original [contexto game](https://contexto.me/) on another language.
I recommend that before getting to know the frontend part of this web application, first visit the page of its [backend part](https://github.com/sabexzero/contexto-ru-backend).
To run this project, follow the following instructions:

First, you need to clone the project to your local computer
```bash
git clone https://github.com/n0sebleeded/contexto-ru-frontend/
``` 

Then go to the folder with the cloned project and create an .env file with the following contents if you run the entire project on a local machine:
```
VITE_REACT_APP_SERVER_PORT=8080
VITE_REACT_APP_SERVER_IP=http://localhost
```

If you have already read the backend part, you can start the project using next command:
```bash
npm install
npm run dev
```

### A function describing the fill width depending on the numeric value of the association
```math
w =\left\{\begin{matrix}
 & 1, && x > 3500 \\
 & e^{\ln{100} - \frac{x}{800}} && x <= 3500
\end{matrix}\right.
```

w - fill width, x - value of the association

The function is as close as possible to the original one from contexto.me.

Tech stack:
- React(TS)
- Vite
- UI:
    - Framer-motion
    - Material-UI
- Redux/Toolkit
- Axios
