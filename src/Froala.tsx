import React from 'react'

// froala
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';

interface FroalaProps {


}

// mentionはなさそう
// https://github.com/froala/react-froala-wysiwyg/issues/56

export const Froala: React.FC<FroalaProps> = ({}) => {
    return (
          <div>
            <span>froala</span>
            <FroalaEditorComponent tag='textarea' />
          </div>
    );
}