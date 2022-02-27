import { Delta } from 'quill';
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuilProps {

}

// quill image upload custom
// https://jpdebug.com/p/237288

const ToolFooter = () => {
  // const insertStar = () => {
  //   const cursorPosition = 
  // }
  return (
    <div id="footer">
      <button className="send">send</button>
    </div>
  )
}

// const modules = [
//   toolbar: {}
// ]

const CustomToolbar = () => (
  <div id="toolbar">
    {/* <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option selected />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select> */}
    <button className="ql-insertStar">
      <span className="octicon octicon-star" />
    </button>
  </div>
);

const Editor = () => {
  const [input, setInput] = useState('')
  const handleInput = (v: string, delta: Delta, source: string, a: any) => {
    console.log(delta)
    console.log(source)
    console.log(a)
    console.log(v);
    setInput(v)
  }

  const insertStar = () => {
    setInput((old) => {
      return old + '星'
    })
  }

  const modules = {
    // toolbar: [
    //   // [{ 'header': [1, 2, false] }],
    //   ['bold'],
    //   // [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    //   ['link', 'image'],
    // ],
    toolbar: {
      container: "#toolbar",
      handlers: {
        insertStart: insertStar
      }
    },
    clipboard: {
      matchVisual: false,
    }
  }

  const formats = [
    "header",
  // "font",
  // "size",
  // "bold",
  // "italic",
  // "underline",
  // "strike",
  // "blockquote",
  // "list",
  // "bullet",
  // "indent",
  // "link",
  // "image",
  // "color",
  ]

    return (
      <div className="editor">

        <ReactQuill value={input} onChange={handleInput}
          // modules={modules}
          // formats={formats}
        />
        {/* <CustomToolbar /> */}
      </div>  
    );
}


export const Quil: React.FC<QuilProps> = ({}) => {
  return <div>
    {/* <span>{input}</span> */}
    <span>Quil</span>
    <Editor />
  </div>
}