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

    await $.get(`${baseurl}/check`, fns.done)
        .fail(fns.fail)
        .always(fns.always)
}

export function getColoniesByAlliance(alliance, fns) {
    fns = { ...defaultFns, ...fns }

    $.get(`${baseurl}/alliance/?tag=${alliance}`, fns.done)
        .fail(fns.fail)
        .always(fns.always)
}

export function getColoniesByUser(user, fns) {
    fns = { ...defaultFns, ...fns }

    var users = $.get(`${baseurl}/galaxy/system/planets?user=${user}`, fns.done)
        .fail(fns.fail)
        .always(fns.always)
}

export function getMoons(galaxy, fns) {
    fns = { ...defaultFns, ...fns }

    var galaxyQuery = (galaxy) ? `?galaxy=${galaxy}` : ``

    var users = $.get(`${baseurl}/galaxy/moons${galaxyQuery}`, fns.done)
        .fail(fns.fail)
        .always(fns.always)
}

export function loadEspionageInformation(ids, fns) {
    fns = { ...defaultFns, ...fns }

    $.ajax({
        url: `${baseurl}/espionage/check`,
        data: JSON.stringify(ids),
        type: 'POST',
        contentType: 'application/json',
        success: fns.done,
        error: fns.fail
    })
}

