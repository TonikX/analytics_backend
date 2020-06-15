export const checkUrl = (url: string) => {
    const regexp =  /^(https?:\/\/)/;

    if (regexp.test(url)){
        return true;
    } else {
        return false;
    }
}