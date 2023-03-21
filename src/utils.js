import { format } from "date-fns";


export const baseAPI = 'https://script.google.com/macros/s/AKfycbyy_JR7AM_AAnUB2DB_AnKXqsdqlIPJoBc-7CKW-S2In2_OslstV1XSz0Ex2MWobh9w/exec?path=';

const h = window.innerHeight;
// export const graphHeight = h/3.46;
export const graphHeight = h/3.75;
export const chartHeight = h/3.75;

 {/* @ts-ignore */ }
export const dateFormatter = date => {
    return format(new Date(date), "MMM yyyy");
};

 {/* @ts-ignore */ }
export const quarterlyFormatter = epoch => {
   return (new Date(epoch)).getFullYear() + " Q" + (Math.floor(((new Date(epoch)).getMonth() + 3) / 3));
};

  {/* @ts-ignore */ }
export const decimalFormatter = (value) => {
    let num = (value * 100).toFixed(1);
    let label = `${num}%`;
    return label;
};

export const commaFormatter = (value) => {
    return value.toLocaleString("en-US");
};

export const dollarFormatter = (value) => {
    return ('$' + Math.round(value).toLocaleString("en-US"));
};

export const ordinal = n => {
if (n === 1) {
    n += 'st';
    } else if (n === 2) {
    n += 'nd';
    } else if (n === 3) {
    n += 'rd';
    } else {
    n += 'th';
    }
    return n;
};


export const options = { month: "long", year: "numeric" };