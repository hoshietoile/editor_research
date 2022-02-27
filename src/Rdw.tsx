import React, { useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from 'react-draft-wysiwyg'
import { EditorState } from 'draft-js';

// https://zenn.dev/rinda_1994/articles/a91498f1c8f108
// https://www.npmjs.com/package/react-draft-wysiwyg

interface RdwProps {

}

export const Rdw: React.FC<RdwProps> = ({}) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const onEditorStateChange = (value: EditorState) => {
    setEditorState(value)
  }
    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        mention={{
      separator: ' ',
      trigger: '@',
      suggestions: [
        { text: 'APPLE', value: 'apple', url: 'apple' },
        { text: 'BANANA', value: 'banana', url: 'banana' },
        { text: 'CHERRY', value: 'cherry', url: 'cherry' },
        { text: 'DURIAN', value: 'durian', url: 'durian' },
        { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
        { text: 'FIG', value: 'fig', url: 'fig' },
        { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
        { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
      ],
    }}
        // toolbar={{
        //   options: ["inline", "blockType", "list", "textAlign", "link", "image"],
        //   inline: {
        //     options: ["bold", "strikethrough"],
        //   },
        //   blockType: {
        //     inDropdown: false,
        //     options: ["H2"],
        //   },
        //   list: {
        //     options: ["unordered"],
        //   },
        //   textAlign: {
        //     options: ["center"],
        //   },
        //   link: {
        //     options: ["link"],
        //   },
        // }}
        
      />
    );
}