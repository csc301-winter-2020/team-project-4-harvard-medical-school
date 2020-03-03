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



/**
 * For templates customization
 */

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
export const getItemStyle = (isDragging:boolean, draggableStyle:any) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    textAlign: "right",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle
  };
};

export const getQuestionListStyle = (isDraggingOver:boolean) => ({
  background: isDraggingOver ? "lightblue" : "#efefef",
  padding: 8,
  width: 350
});

export const getAnswerListStyle = (isDraggingOver:boolean) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 4,
  width: 250
});