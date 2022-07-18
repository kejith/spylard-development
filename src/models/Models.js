import { Keys, Data } from "../const"


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

    getFleet() {
        var fleet = new Fleet()
        fleet.setData(this.data.fleet)
        return fleet
    }

    getDefense() {
        var defense = new Defense()
        defense.setData(this.data.defense)
        return defense
    }

    getStructures() {
        var structures = new Structures()
        structures.setData(this.data.structures)
        return structures
    }
}


export class UnitCollection {
    constructor() {
        this.data = {}
        this.category = ""
    }

    setData(data) {
        this.data = data
    }

    value() {
        var amount = 0
        Object.keys(this.data).forEach(element => {
            const {metal, crystal, deuterium} = Data[this.category][element]
            amount += (metal + crystal + deuterium) * this.getUnitAmount(element)
        })
        
        return amount
    }

    getUnitAmount(unit) {
        if(!this.data[unit])
            return 0
        
        return this.data[unit]
    }
}

export class Fleet extends UnitCollection {
    constructor() {
        super()
        this.category = "fleet"
    }
}

export class Defense extends UnitCollection {
    constructor() {
        super()
        this.category = "defense"
    }
}

export class Structures extends UnitCollection {
    constructor() {
        super()
        this.category = "structures"
    }

    value() {
        var amount = 0

        Object.keys(this.data).forEach(structure => {
            var level = this.data[structure]
            var factor = Data[this.category][structure].factor
            var structureAmount = 0
            for (let i = 0; i < level; i++) {             
                var metal = Math.floor(Data[this.category][structure].metal * (factor**(i)))
                var crystal = Math.floor(Data[this.category][structure].crystal * (factor**(i)))
                var deuterium = Math.floor(Data[this.category][structure].deuterium * (factor**(i)))
                
                structureAmount = metal + crystal + deuterium
            }

            amount += structureAmount
        })

        return Math.floor(amount)
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
    static fromData(data, galaxy = 0) {
        var alliances = []
        if (Array.isArray(data)) {
            // alliance loop
            data.forEach(allianceData => {
                var alliance = new Alliance(allianceData)
                var users = UserReader.fromData(allianceData.users, galaxy)

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
    static fromData(data, galaxy = 0){
        if(Array.isArray(data)){
            var users = []
            data.forEach(userData => {
                var user = new User(userData)

                if(Array.isArray(userData.planets)) {
                    userData.planets.forEach(planetData => {
                        var planet = new Planet(planetData)
                        console.log({galaxy, planetGalaxy: planet.coords.galaxy})
                        if(galaxy == 0 || galaxy == planet.coords.galaxy) {


                        if (planetData.espionages && Array.isArray(planetData.espionages)) {
                            // espionage loop
                            planetData.espionages.forEach(espionageData => {
                                var espionage = new Espionage(espionageData)
                                planet.addEspionage(espionage)
                            })
                        }

                        
                        user.addPlanet(planet)
                        }
                    })
                }

                users.push(user)
            })
        }

        return users
    }
}

