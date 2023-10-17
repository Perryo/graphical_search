import Tree from "./models/Tree";
import Node from "./models/Node";

const onQueue = (queue: Array<Node>, node: Node): boolean => {
    const foundNode = queue.find((n:Node) => {
        return n.id === node.id
    })
    return foundNode !== undefined
}

export const bfs = (tree: Tree): Tree | undefined => {
    const queue = []
    const rootNode = tree.root
    let position = 0
    if (!rootNode) { return }
    rootNode.visited = true

    queue.push(rootNode)
    while(queue.length > 0) {
        let node = queue.shift() as Node
        if(!node) {
            return
        }
        node.visited = true
        node.position = position
        position++
        // A quirk of vanilla BFS would check nodes that share different parents twice,
        // as they may have already been queued by another parent. We can avoid this by checking the queue.
        if (node.left && !node.left.visited && !onQueue(queue, node.left)) {
            queue.push(node.left)
        }
        if (node.right && !node.right.visited && !onQueue(queue, node.right)) {
            queue.push(node.right)
        }
    }
    return tree
}

export const dfs = (tree: Tree): Tree | undefined => {
    const stack = []
    const node = tree.root
    let position = 0
    if (!node) { return }
    node.visited = true

    stack.unshift(node)
    while(stack.length > 0) {
        let node = stack.shift() as Node
        if (!node) {
            break
        }
        node.visited = true
        node.position = position
        position++
        if (node.left && !node.left.visited) {
            stack.unshift(node.left)
        }
        if (node.right && !node.right.visited) {
            stack.unshift(node.right)
        }
    }
    return tree
}