export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    readonly errors: NotificationErrorProps[] = []

    addError(error: NotificationErrorProps) {
        this.errors.push(error)
    }

    messages(context?: string): string {
        return this.errors
            .filter((error) => {
                if (context == undefined) {
                    return true
                }
                return error.context === context
            })
            .map((error) => `${error.context}: ${error.message}`)
            .join(", ")
    }

    hasErrors(): boolean {
        return this.errors.length > 0
    }
}