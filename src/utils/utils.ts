export const triggerTodoListRefreshNeededEvent = (): void => {
    const event = new CustomEvent('todoListRefreshNeeded')
    document.dispatchEvent(event)
}