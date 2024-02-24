import EventInterface from "../../shared/event/event_interface";

export default class CustomerCreatedEvent implements EventInterface{

    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }

}