import EventHandlerInterface from "./event_handler_interface";
import EventInterface from "./event_interface";

export default interface EventDispatcherInterface {

    notify(event: EventInterface): void;
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unregister(eventName: string, eventHandler: EventHandlerInterface): void;
    unregisterAll(): void;

}