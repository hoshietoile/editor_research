import React from 'react';
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
    </div>
  );
}

export default App;
