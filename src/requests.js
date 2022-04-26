import { baseurl } from './config';

export function onFailedRequest(jqxhr, textStatus, errorThrown) {
    console.error({ jqxhr, textStatus, errorThrown })
}

export function onDoneRequest(data, textStatus, jqxhr) {
    console.debug({ data, textStatus, jqxhr })
}

export const Requests = {
    getMoons,
    checkVersion
}

const defaultFns = {
    done: onDoneRequest,
    fail: onFailedRequest,
    always: () => { }
}

export async function checkVersion(fns) {
    fns = { ...defaultFns, ...fns }

    var key = GM_getValue("spylard-api-key", "")

    await $.get(`${baseurl}/check?&apiKey=${key}`, fns.done)
        .fail(fns.fail)
        .always(fns.always)
}

export function getColoniesByAlliance(alliance, fns) {
    fns = { ...defaultFns, ...fns }

    var key = GM_getValue("spylard-api-key", "")

    $.get(`${baseurl}/alliance/?tag=${alliance}&apiKey=${key}`, fns.done)
        .fail(fns.fail)
        .always(fns.always)
}

export function getColoniesByUser(user, fns) {
    fns = { ...defaultFns, ...fns }

    var key = GM_getValue("spylard-api-key", "")

    var users = $.get(`${baseurl}/galaxy/system/planets?user=${user}&apiKey=${key}`, fns.done)
        .fail(fns.fail)
        .always(fns.always)
}

export function getMoons(galaxy, fns) {
    fns = { ...defaultFns, ...fns }

    var key = GM_getValue("spylard-api-key", "")

    var galaxyQuery = (galaxy) ? `&galaxy=${galaxy}` : ``

    var users = $.get(`${baseurl}/galaxy/moons?apiKey=${key}${galaxyQuery}`, fns.done)
        .fail(fns.fail)
        .always(fns.always)
}

export function loadEspionageInformation(ids, fns) {
    fns = { ...defaultFns, ...fns }

    var key = GM_getValue("spylard-api-key", "")

    $.ajax({
        url: `${baseurl}/espionage/check?&apiKey=${key}`,
        data: JSON.stringify(ids),
        type: 'POST',
        contentType: 'application/json',
        success: fns.done,
        error: fns.fail
    })
}

