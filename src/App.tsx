import React, { useState} from 'react';
import './App.css';
import Tree from "./models/Tree";
import DisplayNode from "./components/DisplayNode";
import {bfs, dfs} from "./search";

function App() {
  const [tree, setTree] = useState<Tree | undefined>(new Tree({depth: 10}))

  if(!tree) {
    return <></>
  }
  const doBFS = (t: Tree) => {
    const _tree = Object.assign({}, bfs(t));
    setTree(_tree)
  }

  const doDFS = (t: Tree) => {
    const _tree = Object.assign({}, dfs(t));
    setTree(_tree)
  }

  const reset = () => {
    window.location.reload()
  }

  return (
      <div>
        <div className={'buttons'}>
          <div className={'button-container'}>
            <div className={'button'} onClick={()=>doBFS(tree)}>BFS</div>
          </div>
          <div className={'button-container'}>
            <div className={'button'}  onClick={()=>doDFS(tree)}>DFS</div>
          </div>
          <div className={'button-container'}>
            <div className={'button'}  onClick={reset}>Reset</div>
          </div>
        </div>
        <div className={'tree'}>
          <DisplayNode node={tree.root}/>
        </div>
      </div>
  );
}

export default App;
