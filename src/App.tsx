import React, { useState } from 'react';
import './App.css';
import GenericComponent, { WithId, WithoutId } from './GenericComponent';
import { WysiwygTest } from './WysiwygTest'

// ====== ReturnType =======
type RetType<T> = T extends (..._: any[]) => infer K ? K : never;

const fn = (hoge: string) : number => {
  return parseInt(hoge, 10);
}

type Fn = RetType<typeof fn>;
// ====== ReturnType =======

function App() {
  // const cb1 = () => console.log('cb1');
  // const cb2 = () => console.log('cb2');
  // const cb3 = () => console.log('cb3');
  // const cb4 = () => console.log('cb4');
  // const cb5 = () => console.log('cb5');
  // const cb6 = (id: string) => console.log('cb6' + id);
  // const cb7 = (id: string) => console.log('cb7' + id);
  // const cb8 = (id: string) => console.log('cb8' + id);
  // const options = [
  //   { id: '1', label: 'label1', value: '1', cb: cb1 },
  //   { id: '2', label: 'label2', value: '2', cb: cb2 },
  //   { id: '3', label: 'label3', value: '3', cb: cb3 },
  //   { id: '4', label: 'label4', value: '4', cb: cb4 },
  //   { id: '5', label: 'label5', value: '5', cb: cb5 },
  // ]

  // const rows = [
  //   { id: '1', label: "item1" },
  //   { id: '2', label: "item2" },
  //   { id: '3', label: "item3" },
  // ]

  // const idOptions = [
  //   { id: '6', label: 'label6', value: '6', cb: cb6 },
  //   { id: '7', label: 'label7', value: '7', cb: cb7 },
  //   { id: '8', label: 'label8', value: '8', cb: cb8 },
  // ]
  const [show, setShow ] = useState(false)
  const showHeart = () => {
    setShow(true)
  }
  const hideHeart = () => {
    setShow(false)
  }
  return (
    <div className="App">
      {/* <div className="section">
        <GenericComponent<WithoutId> options={options} />
      </div>
      <div className="section">
        {rows.map((row) => (
          <div key={row.id}>
            {row.label}
            <GenericComponent<WithId> id={row.id} options={idOptions} />
          </div>
        ))}
      </div> */}
      <WysiwygTest />
      {/* <button onClick={showHeart}>ShowHeart</button>
      <button onClick={hideHeart}>HideHeart</button>
      {show && <div className="heart-icon-container">
        <div className="heart-icon-impact3"></div>
        <div className="heart-icon-impact2"></div>
        <div className="heart-icon-wrap"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="heart-icon" style={{color: 'pink', width: '100px', height: '100px'}} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
      </div>} */}

    </div>
  );
}

export default App;
