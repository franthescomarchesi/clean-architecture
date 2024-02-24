import EventInterface from "../../shared/event/event_interface";

export default class ChangeAdressEvent implements EventInterface {

    dataTimeOccurred: Date;
    eventData: input;

    constructor(eventData: input) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }

}

type input = {
    id: string,
    name: string,
    endereco: string
}