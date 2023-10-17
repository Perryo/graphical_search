interface NodeParams {
    level?: number
    column?: number
    id?: number
}
export default class Node {
    visited: boolean
    left: Node | null
    right: Node | null
    value: number
    level: number
    column: number
    position: number // In terms of where it was found in search
    id: number

    constructor({level = 0, column = 0, id = 0}: NodeParams) {
        this.visited = false
        this.left = null
        this.right = null
        this.value = generateRandomNumber()
        this.level = level
        this.column = column
        this.position = 0
        this.id = id
    }
}

const generateRandomNumber = () : number => {
    return Math.floor(Math.random() * 100)
}