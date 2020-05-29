export const checkUrl = (url: string) => {
    const regexp =  /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/;

    if (regexp.test(url)){
        return true;
    } else {
        return false;
    }
}