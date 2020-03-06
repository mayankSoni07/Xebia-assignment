export function isEmptyField(value){
    if(value === null || value === undefined || value.length === 0)
        return true;
    else
        return false;
}