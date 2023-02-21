import { format } from "date-fns";


export const baseAPI = 'https://script.google.com/macros/s/AKfycbyy_JR7AM_AAnUB2DB_AnKXqsdqlIPJoBc-7CKW-S2In2_OslstV1XSz0Ex2MWobh9w/exec?path=';

const h = window.innerHeight;
export const graphHeight = h/3.75;

 {/* @ts-ignore */ }
export const dateFormatter = date => {
    return format(new Date(date), "MMM yyyy");
};

  {/* @ts-ignore */ }
export const decimalFormatter = (value) => {
    let num = (value * 100).toFixed(1);
    let label = `${num}%`;
    return label;
};

export const options = { month: "long", year: "numeric" };