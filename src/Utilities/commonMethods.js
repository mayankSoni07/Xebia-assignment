const FIX_RESOURCE = "Luke Skywalker";

export function isEmptyField(value){
    if(value === null || value === undefined || value.length === 0)
        return true;
    else
        return false;
}

export function setLocalValue(key, value){
    localStorage.setItem(key, value);
}

export function getLocalValue(key){
    return localStorage.getItem(key);
}

export function checkUser(username){
    if(username === FIX_RESOURCE)
        return true;
    else
        return false;
}