import { format } from "date-fns";
import { Text } from 'recharts';

// imports for CustomTooltip util:
import { createElement } from "react";
var _DefaultTooltipContent = require("recharts/lib/component/DefaultTooltipContent");

// Google Sheets API base url
export const baseAPI = 'https://script.google.com/macros/s/AKfycbyy_JR7AM_AAnUB2DB_AnKXqsdqlIPJoBc-7CKW-S2In2_OslstV1XSz0Ex2MWobh9w/exec?path=';

// format date as MMM YYYY
{/* @ts-ignore */ }
export const dateFormatter = date => {
    return format(new Date(date), "MMM yyyy");
};

// format date as Q# YYYY
{/* @ts-ignore */ }
export const quarterlyFormatter = epoch => {
    return (new Date(epoch)).getFullYear() + " Q" + (Math.floor(((new Date(epoch)).getMonth() + 3) / 3));
};

// convert decimals to percents
{/* @ts-ignore */ }
export const decimalFormatter = (value) => {
    let num = (value * 100).toFixed(0);
    let label = `${num}%`;
    return label;
};

{/* @ts-ignore */ }
export const oneDecimalFormatter = (value) => {
    let num = (value * 100).toFixed(1);
    let label = `${num}%`;
    return label;
};

// add commas to values
export const commaFormatter = (value) => {
    return value.toLocaleString("en-US");
};

// format number as dollar value with commas
export const dollarFormatter = (value) => {
    return ('$' + Math.round(value).toLocaleString("en-US"));
};

// convert a number to an ordinal, est 1 -> 1st, 2 -> 2nd, 3 -> 3rd
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

// custom tick for word-wrap labels
export const CustomXAxisTick = ({ x, y, payload }) => {
    if (payload && payload.value) {
        return (
            <Text
                fontSize={"14px"}
                width={"14px"}
                x={x}
                y={y}
                textAnchor="middle"
                verticalAnchor="start"
            >{payload.value}</Text>
        );
    }
    return null;
};

// only display values greater than 0 in tooltip
export const CustomTooltip = (props) => {

    // create deep copy of props. a shallow copy (let propsVar = props;) is read only.
    let propsVar = { ...props };

    // filter the data payload property in propsVar
    const nonZeroPayload = propsVar.payload.filter(data => data.value > 0);

    //  reassign the payload property in propsVar
    propsVar.payload = nonZeroPayload

    //  create tooltip element using Rechart's default tooltip content + our new propsVar
    if (props.active && props.payload && props.payload.length) {
        return createElement(_DefaultTooltipContent.DefaultTooltipContent, propsVar);
    }

    return null;
};

// aquire the key of the maximum value in an object 
// ex: obj {A: 13, B: 4, C: 37}
// maxKey(obj) returns c
export const maxKey = (obj) => {
    return Object.keys(obj).slice(0,-1).reduce((a, b) => obj[a] > obj[b] ? a : b);
}