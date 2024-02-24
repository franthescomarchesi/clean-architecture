import EventHandlerInterface from "../../../shared/event/event_handler_interface";
import CustomerCreatedEvent from "../customer_created_event";

export default class PrimeiroConsoleLogWhenCustomerIsCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent> {

    handle(event: CustomerCreatedEvent): void {
        console.log(`Esse é o primeiro console.log do evento: CustomerCreated`);
    }

}