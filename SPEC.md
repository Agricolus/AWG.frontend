# FIWARE Agri Weather Gateway

[![FIWARE Banner](https://fiware.github.io/tutorials.Context-Providers/img/fiware.png)](https://www.fiware.org/developers)

### A first FIWARE Domain Application: Agri Weather Gateway

[![FIWARE Core Context Management](https://nexus.lab.fiware.org/repository/raw/public/badges/chapters/core.svg)](https://github.com/FIWARE/catalogue/blob/master/core/README.md)
[![License badge](https://img.shields.io/github/license/FIWARE/context.Orion-LD.svg)](https://opensource.org/licenses/AGPL-3.0)
[![Support badge](https://nexus.lab.fiware.org/repository/raw/public/badges/stackoverflow/fiware.svg)](https://stackoverflow.com/questions/tagged/fiware)
[![NGSI-LD badge](https://img.shields.io/badge/NGSI-LD-red.svg)](https://www.etsi.org/deliver/etsi_gs/CIM/001_099/009/01.02.01_60/gs_CIM009v010201p.pdf)
[![Documentation](https://img.shields.io/readthedocs/fiware-tutorials.svg)](https://fiware-tutorials.rtfd.io)

It is a frontend service written to visualize the weather data through maps and charts, manage the weather stations to add, update or remove them.

It was written using:
* [Visual Studio Code](https://code.visualstudio.com)
* [NPM](https://www.npmjs.com)
* [Vue.js](https://vuejs.org)
* [Font Awesome](https://fontawesome.com/)
* [Weather Icons](https://erikflowers.github.io/weather-icons/)
* [FIWARE Data Models](https://github.com/FIWARE/data-models)

##### Project setup
```
npm install
```

##### Compiles and hot-reloads for development
```
npm run serve
```

##### Compiles and minifies for production
```
npm run build
```

##### Lints and fixes files
```
npm run lint
```

See [Configuration Reference](https://cli.vuejs.org/config/).

These configuration parameters are in **config.json**:
* **env**: deploy environment
* **authenticationServerUrl**: authentication server url
* **apiServerUrl**: API server url

## Versioning

We use [SemVer](http://semver.org) for versioning. 

For the versions available, see the **tags** on this repository.

## Authors

See the list of **contributors** who participated in this project.

## Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

This project is licensed under the [AGPL License](https://www.gnu.org/licenses/agpl-3.0.en.html).