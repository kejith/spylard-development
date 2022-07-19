export function copyFleetDiscordMessage(){
    $(".table519 > tbody > tr").last().find("td").prepend(/*html*/
        `&nbsp;<button id="spylard-discord-copy" type="button" class="btn btn-primary">Discord</button>`
    )

    $("#spylard-discord-copy").on("click", (e) => {
        e.preventDefault()

        var data = {
            ships: [],
            techs: {
                weapon: 0,
                shield: 0,
                armour: 0,
                combustion: 0,
                impuls: 0,
                hyper: 0,
            }
        }

        $(".table519 > tbody").find("tr").slice(2, -3).each(function(i, element) {
            data.ships.push({
                name: $(this).find("a").eq(0).text(),
                amount: $(this).find("td").eq(1).text()
            })
        })

        var techStrings = []
        techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(2).find("td").eq(0).text())
        techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(2).find("td").eq(2).text())
        techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(2).find("td").eq(1).text())
        
        techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(4).find("td").eq(0).text())
        techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(4).find("td").eq(1).text())
        techStrings.push($('table[style="min-width:519px;width:519px;"').find("tr").eq(4).find("td").eq(2).text())

        Object.keys(techStrings).forEach((id) => {
            var techLevelStr = techStrings[id].replace("+", "").replace(" %", "")
            techStrings[id] = parseInt(techLevelStr) / 10
        })

        data.weapon = techStrings[0]
        data.shield = techStrings[1]
        data.armour = techStrings[2]
        data.combustion = techStrings[3]
        data.impuls = techStrings[4] / 2
        data.hyper = techStrings[5] / 3

        var message = createDiscordMessage(data)
        navigator.clipboard.writeText(message).then(function() {
          console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
    })
}

function createDiscordMessage(data) {
    let message = `\`\`\`
${Object.keys(data.ships).map((key) => {
    var ship = data.ships[key]
    if(ship.name !== "") {
       return `${ship.name.padStart(19)}: ${ship.amount.padStart(6)}\n`
    }
}).join("")}
Waffen: ${data.weapon} - Schild: ${data.shield} - Panzer: ${data.armour}
Verbrennung: ${data.combustion} - Impuls: ${data.impuls} - Hyper: ${data.hyper} 
\`\`\``

    return message
}