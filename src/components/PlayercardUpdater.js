function updatePlayercardInformation() {
    var playerCard = parsePlayerCard()
    console.log(playerCard)
}

export function setupPlayerCardUpdate() {
    $(`body#playerCard > #content`).prepend(/*html*/`
        <div class="update-playercard-container">
            <div style="display:flex; justify-content: center; align-items: center">
                <input id="update-playercard" type="button" value="Update">
            </div>
        </div>
    `)

    $('#update-playercard').click(updatePlayercardInformation)


}


function parsePlayerCard() {
    var playercardQuery = $(`body#playerCard table`)

    var getCell = (row, col) => {
        return $($(playercardQuery).find("tr").eq(row).find("td").eq(col))
    }

    var getValueOfCell = (row, col) => {
        return parseInt(
            getCell(row, col)
                .text()
                // remove decimal seperator
                .replaceAll(".", "")
        )

    }

    var playercard = {
        points: {
            structures: getValueOfCell(5, 1),
            reasearch: getValueOfCell(6, 1),
            fleet: getValueOfCell(7, 1),
            defensive: getValueOfCell(8, 1),
            total: getValueOfCell(9, 1)
        },
        ranks: {
            structures: getValueOfCell(5, 2),
            reasearch: getValueOfCell(6, 2),
            fleet: getValueOfCell(7, 2),
            defensive: getValueOfCell(8, 2),
            total: getValueOfCell(9, 2)
        },
        combat: {
            wins: getValueOfCell(12, 1),
            draws: getValueOfCell(13, 1),
            loses: getValueOfCell(14, 1),
            total: getValueOfCell(15, 1),
        },
        units: {
            destroyed: getValueOfCell(17, 1),
            lost: getValueOfCell(18, 1),
        },
        debris: {
            metal: getValueOfCell(19, 1),
            crystal: getValueOfCell(20, 1),
        }
    }

    return playercard
}
