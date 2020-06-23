export const checkUrl = (url: string) => {
    const regexp =  /^(https?:\/\/)/;

    if (regexp.test(url)){
        return true;
    } else {
        return false;
    }
}

export const FULL_DATE_FORMAT = 'DD.MM.YYYY';
export const YEAR_DATE_FORMAT = 'YYYY';