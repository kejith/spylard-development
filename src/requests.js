import { baseurl } from './config';

const defaultFns = {
    done: () => {},
    fail: () => {},
    always: () => {}
}

export function getColoniesByAlliance(alliance, fns) {
    fns = {...defaultFns, ...fns}

    $.get(`${baseurl}/alliance/?tag=${alliance}`, fns.done)
    .fail(fns.fail)
    .always(fns.always)
}

export function getColoniesByUser(user, fns) {
    fns = {...defaultFns, ...fns}

    var users = $.get(`${baseurl}/galaxy/system/planets?user=${user}`, fns.done)
    .fail(fns.fail)
    .always(fns.always)
}

export function loadEspionageInformation(ids, fns) {
    fns = {...defaultFns, ...fns}

    $.ajax({
        url: `${baseurl}/espionage/check`,
        data: JSON.stringify(ids),
        type: 'POST',
        contentType: 'application/json',
        success: fns.done,
        error: fns.fail
    })
}
