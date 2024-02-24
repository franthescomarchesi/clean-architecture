import Notification from "../notification/notification";
import NotificationError from "../notification/notification_error";

export default abstract class Entity {

    protected CONTEXT: string
    protected id: string
    protected notification: Notification;

    constructor() {
        this.notification = new Notification()
    }

    protected addError(error: string) {
        this.notification.addError({
            context: this.CONTEXT,
            message: error
        })
    }

    protected hasErrors() {
        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.errors)
        }
    }

    getNotification(): Notification {
        return this.notification
    }

}