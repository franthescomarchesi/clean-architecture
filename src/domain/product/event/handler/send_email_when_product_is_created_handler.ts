import EventHandlerInterface from "../../../shared/event/event_handler_interface";
import ProductCreatedEvent from "../product_created_event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {

    handle(event: ProductCreatedEvent): void {
        console.log(`Sending email to ...`);
    }

}