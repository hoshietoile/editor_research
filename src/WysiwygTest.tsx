import React from 'react'

import { Froala } from './Froala'
import { Quil } from './Quil'
import { Draft } from './Draft'
import { Rdw } from './Rdw'

interface WysiwygTestProps {

}

export const WysiwygTest: React.FC<WysiwygTestProps> = ({}) => {
    return (
      <div id="wysiwyg-wrapper">
        <span>WysiwygTest</span>
        <div id="wysiwyg-container">
          {/* <Froala />
          <Draft /> */}
          <Quil />
          {/* <Rdw /> */}
        </div>
      </div>
    );
}