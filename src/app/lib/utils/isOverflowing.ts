export function isOverflowX(element: HTMLElement) {
    return element.scrollHeight != Math.max(element.offsetHeight, element.clientHeight)
}