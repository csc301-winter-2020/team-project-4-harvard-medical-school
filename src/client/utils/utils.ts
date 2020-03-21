import { contentType } from "./types";
import _ from "underscore";

const dateFormat = require("dateformat");
const dateStringFull = "mmmm d, yyyy";
const dateStringCompact = "m/d/yyyy";


/**
 * Formats the date to a string like this: "12/31/2018"
 * @param date The date as an int (in milliseconds)
 */
export function dateFormatCompact(date: number): string {
  return dateFormat(new Date(date), dateStringCompact);
}

/**
 * Formats the date to a string like this: "January 6, 1970"
 * @param date The date as an int (in milliseconds)
 */
export function dateFormatFull(date: number): string {
  return dateFormat(new Date(date), dateStringFull);
}

/**
 * Return the max of two numbers.
 * @param a The first number
 * @param b The second number
 */
export function max(a: number, b: number): number {
  if (a < b) {
    return b;
  }
  return a;
}

/**
 * Get the current time in milliseconds.
 */
export function now(): number {
  return new Date().getTime();
}

export const numberToYearStr: {[key: number]:  string} = {
  1: "1st",
  2: "2nd",
  3: "3rd",
  4: "4th"
}

export const defaultAvatar: string = "https://i1.rgstatic.net/ii/profile.image/273584577880065-1442239054184_Q512/Danny_Heap.jpg";

export type inputMode = "Both" | "Writing" | "Typing";

export function canvasInit(mode: inputMode):boolean{
  return mode === "Both" || mode === "Writing";
}

export function textInit(mode:inputMode):boolean{
  return mode === "Both" || mode === "Typing";
}

/**
 * Reorders a genericly typed list.
 * @param list The list to reorder
 */
export function reorder<T> (list:T[], startIndex:number, endIndex:number):T[] {
  const result:T[] = Array.from(list);
  const [removed]:T[] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 6;
export const getItemStyle = (isDragging:boolean, draggableStyle:any, highlight: boolean) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    textAlign: "left",

    // change background colour if dragging
    background: highlight ? "#00ffd9" : (isDragging ? "lightgreen" : "white"),

    // styles we need to apply on draggables
    ...draggableStyle
  };
};

export const getQuestionListStyle = (isDraggingOver:boolean) => ({
  background: isDraggingOver ? "lightblue" : "#efefef",
  padding: 8,
  width: "calc(100% - 18px)"
});

export const getAnswerListStyle = (isDraggingOver:boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 4,
  marginTop: 10,
  width: "calc(100% - 40px)",
});

export const urlToName: { [url: string]: contentType } = {
  "demographics": "Demographics",
  "cchpi": "Chief Complaint & History of Present Illness",
  "pastmedical": "Past Medical History",
  "social": "Social History",
  "family": "Family History",
  "reviewofsystems": "Review of Systems",
  "physical": "Physical Examination",
  "imaging": "Imaging Results",
  "lab": "Lab Results",
  "assessment": "Assessment & Plan",
};

export const nameToUrl: {[name in contentType]: string} = _.invert(urlToName);

export function scrollIntoView(id: string){
  document.querySelector(`#${id}-draggable`).scrollIntoView();
}