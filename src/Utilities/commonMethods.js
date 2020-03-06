export function isEmptyField(value){
    if(value === null || value === undefined || value.length === 0)
        return true;
    else
        return false;
}

export function setTokenValue(value){
    localStorage.setItem("token", value);
}

export function getTokenValue(value){
    return localStorage.getItem("token");
}