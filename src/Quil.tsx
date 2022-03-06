import { Delta } from 'quill';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import MagicUrl from 'quill-magic-url'
interface QuilProps {

}

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
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
    </select>
    <button className="ql-link" />
    <button className="ql-insertStar">
      <span className="octicon octicon-star" />
    </button>
  </div>
);


const Editor = () => {
  Quill.register('modules/magicUrl', MagicUrl)
  const quill = useRef(null);
  const [input, setInput] = useState('')
  const handleInput = (v: string, delta: Delta, source: string, a: any) => {
    console.log(delta)
    console.log(source)
    console.log(a)
    console.log(v);
    setInput(v)
  }
  // https://stackoverflow.com/questions/68742814/how-to-access-reactquill-api
  // https://quilljs.com/docs/api/
  useEffect(() => {
    const q = quill.current as any;
    q.editor.formatText(0, 10, 'link', 'http://hoge.com')
  }, [])

  const [selection, setSelection] = useState({index: 0, length: 0})
  const [isOpen, setIsOpen] = useState(false)
  const [linkVal, setLinkVal] = useState('')

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinkVal(e.target.value);
  }

  const linkValSet = () => {
    const q = quill.current as any;
    q.editor.formatText(selection.index, selection.length, 'link', linkVal)
  }

  const handleSelection = (a: any, b: any, c: any) => {
    console.log(a)
    console.log(b)
    console.log(c)
  }
  const onFocus = (a: any,b: any,c: any) => {
    console.log(a)
    console.log(b)
    console.log(c)
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: {
          // https://quilljs.com/docs/modules/toolbar/
          'link': function(value: any) {
            const q = quill.current as any;
            const selection = q.editor.getSelection()
            setSelection(selection)
            setIsOpen(true)
            // console.log('link', selection.index, selection.length)
            // if (value) {
            //   q.editor.formatText(selection.index, selection.length, 'link', 'hoge')
            //   // l.format('link', href);
            // } else {
            //   // l.format('link', false);
            // }
          }
        },
        
      },
      magicUrl: {
        // Regex used to check URLs during typing
        urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(tel:[\S]+)/g,
        // Regex used to check URLs on paste
        globalRegularExpression: /(https?:\/\/|www\.|tel:)[\S]+/g,
      },
    }
  }, [])

  return (
    <div className="editor">

      <ReactQuill ref={quill} value={input} onChange={handleInput}
        modules={modules}
        // formats={formats}
        placeholder={'This is a placeholder'}
        onChangeSelection={handleSelection}
        onFocus={onFocus}
      />
      <CustomToolbar />

      {isOpen && <>
        <input type="text" value={linkVal} onChange={onInput} />
        <button type="button" onClick={linkValSet}>Link</button>
      </>}
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