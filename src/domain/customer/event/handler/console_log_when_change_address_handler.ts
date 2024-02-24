import EventHandlerInterface from "../../../shared/event/event_handler_interface";
import ChangeAdressEvent from "../change_address_event";

export default class ConsoleLogWhenChangeAdressHandler implements EventHandlerInterface<ChangeAdressEvent> {

    handle(event: ChangeAdressEvent): void {
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.endereco}`);
    }

}