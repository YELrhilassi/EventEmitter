import EventEmitter from "emittevent";

// TO DO

const em = new EventEmitter();

em.addListener("click", () => console.log("click event"));

console.log(em);
