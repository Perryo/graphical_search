import Node from "./Node";

class Direction {
    left = false // 0
    right = false // 1

    constructor({predetermined = false}) {
        if (predetermined) {
            const value = Math.floor((Math.random() * 100)/70)
            if (value) {
                this.right = true
            } else {
                this.left = true
            }
        } else {
            const value = Math.floor(Math.random() * 100)
            if (value > 80){
                return
            }
            else if (value > 45) {
                this.right = true
            }
            else {
                this.left = true
            }
        }
    }
}

export default class Tree {
    root: Node | null
    predetermined: Array<Direction>
    nodeMatrix: Record<string, Node>

    constructor({depth = 6}) {
        this.nodeMatrix = {}
        this.predetermined = []
        this.root = null
        this.generateTree(depth)
    }

    private predetermine (depth: number) {
        let determinedDirections = 0;
        while(determinedDirections < depth) {
            this.predetermined.push(new Direction({predetermined: true}))
            determinedDirections++
        }
    }


    private generateTree (depth: number) {
        // Predetermine our max depth branch, leave others to chance.
        this.predetermine(depth)
        let id = 0
        this.root = new Node({level: 0, column: 0, id})
        const queue = [this.root]
        id++
        while(queue.length > 0) {
            const node = queue.shift()
            const direction = new Direction({predetermined: false})
            if(!node){ break }
            if(node.level >= depth) { continue }
            if(!node.left) {
                let level = node.level + 1
                let column = node.column - 1
                const key = `${level}-${column}`
                if(this.nodeMatrix.hasOwnProperty(key)) {
                    node.left = this.nodeMatrix[key]
                }
                else if(this.predetermined[0]?.left) {
                    this.predetermined.pop()
                    const newNode = new Node({level, column, id})
                    node.left = newNode
                    queue.push(newNode)
                    id++
                    this.nodeMatrix[key] = newNode
                } else if (direction.left) {
                    const newNode = new Node({level, column, id})
                    node.left = newNode
                    queue.push(newNode)
                    id++
                    this.nodeMatrix[key] = newNode
                }
            }
            if(!node.right) {
                let level = node.level + 1
                let column = node.column + 1
                const key = `${level}-${column}`
                if(this.nodeMatrix.hasOwnProperty(key)) {
                    node.right = this.nodeMatrix[key]
                }
                else if(this.predetermined[0]?.right) {
                    this.predetermined.shift()
                    const newNode = new Node({level, column, id})
                    node.right = newNode
                    queue.push(newNode)
                    id++
                    this.nodeMatrix[key] = newNode
                } else if (direction.right) {
                    const newNode = new Node({level, column, id})
                    node.right = newNode
                    queue.push(newNode)
                    id++
                    this.nodeMatrix[key] = newNode
                }
            }
        }
    }
}