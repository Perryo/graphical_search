import React, {useEffect, useState} from "react";
import Node from '../models/Node'
import './DisplayNode.css'

interface Props {
    node: Node | null
}

const verticalShift = 40
const horizontalShift = 100

const DisplayNode = ({node = new Node({})} : Props) => {
    const [_node, _setNode] = useState(node)
    const [visible, setVisible] = useState(false)
    const [visitedStyle, setVisitedStyle] = useState('')
    const timeout = (_node?.position || .5) * 500

    useEffect(() => {
        _setNode(node)
    }, [node])

    useEffect(() => {
        setTimeout(() => {
            setVisitedStyle(_node?.visited ? ' visited' : '')
        }, timeout)
    }, [_node, timeout])

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, (_node?.level || 1) * 100)
    }, [ _node])


    if(!_node) {
        return <></>
    }
    return (
        <div className={`node${visitedStyle}${visible ? ' visible' : ' hidden'}`} style={{bottom: `${verticalShift}px`}} id={`${node?.id}`}>
            {_node.left && (
                <div className={'left'} style={{right: `${horizontalShift}px`}}>
                    <div className={'left-line'}/>
                    <DisplayNode node={_node.left} />
                </div>
            )}
            {_node.right && (
                <div className={'right'} style={{left: `${horizontalShift}px`}}>
                    <div className={'right-line'}/>
                    <DisplayNode node={_node.right} />
                </div>
            )}
            {_node.value}
                </div>
    )

}

export default DisplayNode