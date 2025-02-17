# Quickmath <img src="assets/logo.png" height="40" />

![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E?style=flat&logo=javascript&logoColor=black)
![React Native](https://img.shields.io/badge/React%20Native-%2300B0FF?style=flat&logo=react-native&logoColor=white)
![Python](https://img.shields.io/badge/Python-%233776AB?style=flat&logo=python&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837?style=flat&logo=npm&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-%23000000?style=flat&logo=fastapi&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-%23C21325?style=flat&logo=jest&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-%23000000?style=flat&logo=expo&logoColor=white)

## Set Up

1. **Install dependencies**  
Run the following command to install the required dependencies:

   ```bash
   npm install

2. **Start the backend server**   
Run the backend server using Uvicorn. Make sure you're in the project directory and run the following       command:

   ```bash
   uvicorn backend.main:app --reload

3. **Open the app**   
   To open the app on the web, run the following command on a separate terminal. The app will open on http://localhost:8081.
   
        npm run web
   This app is also compatible on iOS. To open it on iOS (Xcode & Simulator required), run the following       command:
   
        npm run ios

4. **Unit testing**   
Run tests by running the following commands:

   ```bash
   npm install jest-expo
   npm test

Testing results (done with jest):
![Test Results](test-results.png)
