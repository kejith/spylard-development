function parseLabelValuePairFromToolip(tds, possibleLabels = []) {
    var tmpLabel = ""
    var fleet = {}
    tds.each((id, element) => {
        var text = $(element).text()
        var isLabel = (text.indexOf(":") !== -1) || possibleLabels.includes(text)


        if (isLabel) {
            tmpLabel = text.replace(":", "")
        } else {
            fleet[tmpLabel] = parseInt(text.replace(".", ""))
            tmpLabel = ""
        }
    })

    return fleet
}

export function parseFleetsFromOverview() {
    var fleetTooltips = $(`#hidden-div2 span.return a[data-tooltip-content]`).filter((id, element) => {
        return $(element).text() == "Flotten"
    })

    var ressourceTooltips = $(`#hidden-div2 span.return a[data-tooltip-content]`).filter((id, element) => {
        return $(element).text() != "Flotten"
    })

    ressourceTooltips.each((id, tooltip) => {
        var tooltipHTML = $(tooltip).attr("data-tooltip-content")
        var tooltipElement = $(tooltipHTML)
        var tds = tooltipElement.find("td")
        var ressources = parseLabelValuePairFromToolip(tds, ["Metall", "Kristall", "Deuterium"])
    })

    fleetTooltips.each((id, tooltip) => {
        var tooltipHTML = $(tooltip).attr("data-tooltip-content")
        var tooltipElement = $(tooltipHTML)
        var tds = tooltipElement.find("td")
        var fleet = parseLabelValuePairFromToolip(tds)
    })
}