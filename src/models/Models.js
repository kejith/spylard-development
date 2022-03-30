import { Keys } from "../const"


class Component {
    constructor(data = null, categoriesNeeded = null) {
        this.data = {}

        if (data === null) {
            return
        }

        if (data.espionages) {
            this.espionages = []
            data.espionages.forEach(espionageData => {
                this.espionages.push(new Espionage(espionageData))
            })
        }

        if (categoriesNeeded !== null)
            this.setPlanetCategories(categoriesNeeded, data)
    }

    setPlanetCategories(categories, data) {
        categories.forEach(category => {
            this.data[category] = {}

            const keys = Object.keys(Keys[category])
            keys.forEach((key) => {
                if (data[key]) {
                    this.data[category][key] = data[key]
                }
            })
        })
    }

    getData() {
        return this.data
    }
}

export class Espionage extends Component {
    constructor(data) {
        const categoriesNeeded = [
            "ressources",
            "fleet",
            "defense",
            "structures",
        ]
        super(data, categoriesNeeded)
        
        this.coords = {
            galaxy: data.galaxy,
            system: data.system,
            position: data.position
        }

    }
}

export class Planet extends Component {
    espionages

    constructor(data = null) {
        super(data, [
            "ressources",
            "fleet",
            "defense",
            "structures",
        ])

        if(data === null) return

        this.espionages = []
        this.coords = {
            galaxy: data.galaxy,
            system: data.system,
            position: data.position
        }

        this.name = data.name
    }

    addEspionage(espionage) {
        this.espionages.push(espionage)
        return this
    }
}

export class User extends Component {
    planets

    constructor(data = null) {
        super(data, ["techs"])

        this.planets = []

        if (data !== null) {
            this.name = data.name
            this.id = data.id
            this.alliance = data.alliance
        } else {
            this.name = ""
            this.id = -1
            this.alliance = {
                id: -1,
                name: "Dummy"
            }
        }
    }

    addPlanet(planet) {
        this.planets.push(planet)
    }
}

export class Alliance extends Component {
    members

    constructor(data = null) {
        super(data, null)

        this.members = []
        this.name = data.name
        this.id = data.id

        return this
    }

    addMember(user) {
        this.members.push(user)
    }
}

export class AllianceReader {
    static fromData(data) {
        var alliances = []
        if (Array.isArray(data)) {
            // alliance loop
            data.forEach(allianceData => {
                var alliance = new Alliance(allianceData)
                var users = UserReader.fromData(allianceData.users)

                users.forEach(user => {
                    alliance.addMember(user)
                })

                alliances.push(alliance)
            })
        }

        return alliances
    }
}

export class UserReader {
    static fromData(data){
        if(Array.isArray(data)){
            var users = []
            data.forEach(userData => {
                var user = new User(userData)

                if(Array.isArray(userData.planets)) {
                    userData.planets.forEach(planetData => {
                        var planet = new Planet(planetData)

                        if (planetData.espionages && Array.isArray(planetData.espionages)) {
                            // espionage loop
                            planetData.espionages.forEach(espionageData => {
                                var espionage = new Espionage(espionageData)
                                planet.addEspionage(espionage)
                            })
                        }

                        user.addPlanet(planet)
                    })
                }

                users.push(user)
            })
        }

        return users
    }
}

