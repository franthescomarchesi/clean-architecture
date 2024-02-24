import EventHandlerInterface from "../../../shared/event/event_handler_interface";
import CustomerCreatedEvent from "../customer_created_event";

export default class SegundoConsoleLogWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log(`Esse é o segundo console.log do evento: CustomerCreated`);
    }

}