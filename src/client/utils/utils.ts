import { contentType, Class, userData } from "./types";
import _ from "underscore";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

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

export function textToDownloadFile(text: string, fileName: string): void {
  // Learned from: https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react/44661948
  const element = document.createElement("a");
  const file = new Blob([text], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = fileName;
  document.body.appendChild(element);
  element.click();
}

export function printAndDownloadElementToPDF(elementID: string, pdfName: string) {
  const element = document.getElementById(elementID);
  const mmElement = document.getElementById('mmDummy');
  const mmByPixels = 100 / mmElement.clientWidth;
  const mmWidth = Math.round(element.clientWidth * mmByPixels);
  const mmHeight = Math.round(element.clientHeight * mmByPixels);

  html2canvas(element)
    .then((canvas: HTMLCanvasElement) => {
      const imgData: any = canvas.toDataURL('image/png');
      const pdf: any = new (jsPDF as any)({
        orientation: 'landscape',
        // Warning: 'in' is supposed to give inches but it randomly does it
        // in pixels. I don't know if the library is busted since multiple
        // unique runs can give differing results, so I guess I'll try pixels
        // and pray this works. It might be defaulting to 'mm' actually, which
        // would explain why [4, 2] is so small. What I'll do is make it in mm
        // and hope.
        unit: 'mm',
        // And to make matters more fun, apparently the millimeters is off by
        // a factor of 4. I have no idea if this only is for my computer or if
        // it breaks on other computers... this needs to be seriously tested.
        format: [mmWidth * 4, mmHeight * 4]
      });
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(pdfName);
    });
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


export const initialClass:Class = {
  id: -1,
  help_enabled: false,
  name: "DEFAULT_CLASS_NAME",
  instructor_id: -1,
}

export const dummyData: userData = {
  id: -1,
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  year: 0,
  user_type: "Student",
  avatar_url: defaultAvatar,
  default_mode: "Typing",
  default_sidebar: true,
  location: "Nowhere",
};