# Paper Trading Front End


## Project setup
1. Clone this Repo `git clone git@github.com:Ideapreneurnepal/trading-vue-fe.git`
2. CD to the folder `cd trading-vue-fe`
3. Install dependencies `npm install`
4. Create `.env` file
    ```env
    VUE_APP_CHARTING_LIBRARY_PATH = "/paper-trading/charting_library/"
    VUE_APP_BACKEND_URL="/"
    VUE_APP_CHART_CLIENT_ID = "ideapreneurnepal.com"

    PUBLIC_PATH = "/paper-trading/"

    VUE_APP_API_BASEPATH = "/guru-mantra/api/v1/trading/"

    VUE_APP_CHART_FEED_URL="/guru-mantra/api/v1/chart/1"
    VUE_APP_CHART_FEED_UNADJ_URL="/guru-mantra/api/v1/chart/0"
    VUE_APP_CHART_STORAGE_URL="/guru-mantra/api/v1/trading/chart"

    # For test purpose
    VUE_APP_API_TOKEN="xxxxxxxxxxxxxxx" 

    ```
5. Run project
    ```
    npm run serve
    ``` 
    *Compiles and hot-reloads for development*

# Other commands
### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

# Folder Structure
```
Trading Vue Front End/
├── .github
├── pinejs
├── scripts
└── src/
    ├── assets/
    │   ├── css/
    │   └── img/
    ├── components/
    │   ├── trading/
    │   ├── ui/
    │   ├── vriddhi/
    │   ├── TopHorizontalMenu.vue
    │   └── TVChartContainer.vue
    ├── lib/
    │   ├── chart/
    │   └── helper.js
    ├── router/
    │   ├── index.js
    │   └── vriddhi.js
    ├── stores/
    │   ├── data/
    │   └── ...storefiles...
    ├── views
    ├── App.vue
    └── main.js
```

- **components** -- contains ui components
    - **trading** 
      - side-widgets/ -- components of sidebar
      - trading-tabs/ -- components of paper trading tabs (bottom)
- **lib** -- contains helpers and library methods
- **router** -- container vue router settings
- **stores** -- contains pinia store config files
- **views** -- contains vue views


<img width="258" alt="Screenshot 2023-04-23 at 11 31 15 AM" src="https://user-images.githubusercontent.com/5916748/233822143-2a6a2995-6f2e-40d6-90e1-ed8ea565b8eb.png">

# Quick Guide/Links

The project is build on Vue JS 

Here are list of libraries being used in this project

- [FormKit](https://formkit.com/) for generating and validating forms
- [Bootstrap](https://getbootstrap.com/) for ui
- [Chart.js](https://www.chartjs.org/) for report charts
- [Trading View Charting Library](https://www.tradingview.com/charting-library-docs/)
- [Pinia](https://pinia.vuejs.org/) for state management
- [vue3 easy data table](https://hc200ok.github.io/vue3-easy-data-table-doc/) For data table
- [Vue Router](https://router.vuejs.org/) For routing

