import React, { useCallback, useMemo, useState } from 'react'
import {Editor, EditorState, DraftEditorCommand, RichUtils, convertFromRaw} from 'draft-js';

import PEditor, { createEditorStateWithText } from '@draft-js-plugins/editor'
import createLinkifyPlugin from '@draft-js-plugins/linkify'

import createEmojiPlugin from '@draft-js-plugins/emoji'
import '@draft-js-plugins/emoji/lib/plugin.css';

import createMentionPlugin, {
  defaultSuggestionsFilter, MentionData
} from '@draft-js-plugins/mention'
import mentions from './Mentions'
import '@draft-js-plugins/mention/lib/plugin.css';

const linkifyPlugin = createLinkifyPlugin({
  theme: {
    link: 'test-link-class'
  }
});

const emojiPlugin = createEmojiPlugin(
  {
    useNativeArt: true,
  }
);
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const mentionPlugin = createMentionPlugin();
const { MentionSuggestions } = mentionPlugin;

interface DraftProps {

}
// とは
// https://speakerdeck.com/mottox2/react-dot-js-draft-dot-jsdezuo-ru-ritutitekisutoedeitakai-fa-ru-men?slide=18
// https://www.wantedly.com/companies/wantedly/post_articles/28285

// tip
// https://www.to-r.net/media/draftjs-tips/
// entity
// https://qiita.com/yanamura/items/a2b9bf1798e6e15ceeb9
// https://qiita.com/y-hira18/items/796048296a15e9d8f4d9

// file-paste?
// https://daveteu.medium.com/draftjs-insert-paste-images-into-your-content-820159025258

// custom-block
// https://qiita.com/yanamura/items/caa4896b183f269d7d95

// link-plugin
// https://stackoverflow.com/questions/62321505/how-to-add-link-in-draft-js-no-plugins

// https://qiita.com/YudaiTsukamoto/items/264f333e90a1edb818a3

// image
// https://www.draft-js-plugins.com/

const initData = convertFromRaw({
  blocks: [
    {
      key: "16d03",
      text: "なんでもないテキスト。",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    
    {
      key: "16d04",
      text: "なんでもないテキスト。。。。。",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [
        {
          length: 2,
          offset: 0,
          style: "BOLD",
        }
      ],
      entityRanges: [],
      data: {},
    },
    {
      key: "98peb",
      text: "https://dummyimage.com/100x100/fff/000",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 1,
        },
      ],
      data: {},
    },
    {
      key: "98ped",
      text: "draftjsリンク",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 3,
          key: 2,
        },
      ],
      data: {},
    },
    {
      key: "98pea",
      text: "https://dummyimage.com/100x100/000/fff",
      type: "atomic",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
  ],
  // 画像を表示したり、テキストにリンク要素を追加するには、 editorState に含まれる entityMap にメタ情報を追加します。
  entityMap: {
    0: {
      type: "image",
      mutability: "IMMUTABLE",
      data: { src: "https://dummyimage.com/100x100/000/fff" },
    },
    1: {
      type: "image",
      mutability: "IMMUTABLE",
      data: { src: "https://dummyimage.com/100x100/fff/000" },
    },
    2: {
      type: "LINK",
      mutability: "MUTABLE",
      data: { url: "https://www.draft-js-plugins.com/plugin/image" },
    },
  },
});

export const Draft: React.FC<DraftProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions)
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(initData))
  const onChange = (value: EditorState) => {
    console.log(value)
    setEditorState(value)
  }

  const handleKeyCommand = (command: DraftEditorCommand, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled'
  }

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'))
  }

  const onOpenChange = useCallback((_open: boolean) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }: { value: string }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);

  const Image = (props: any) => {
    const handleImageClick = () => {
      console.log('image clicked', props)
    }
    return (
      <div className="image__wrapper">
        <span className="image__remover" onClick={handleImageClick}>x</span>
        <img src={props.src} alt="" />
      </div>
    )
  }

  const Media = (props: any) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    const type = entity.getType();

    let media;
    if (type === "image") {
      media = <Image src={src} />;
    }

    return media;
  };

  const myBlockRenderer = (block: any) => {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
      };
    }

    return null
  }

  return (
        <div>
          <span>Draft</span>
          <div className="editor">
            <PEditor
              editorKey="SimpleInlineToolbarEditor"
              handleKeyCommand={handleKeyCommand}
              editorState={editorState}
              onChange={onChange}
              blockRendererFn={myBlockRenderer}
              // readOnly
              plugins={[linkifyPlugin, emojiPlugin, mentionPlugin]}
            />
            <div className="editor__toolbar">
              <div className="editor__toolitem">
                <button className="editor__button" onClick={onBoldClick}>+</button>
              </div>
              <div className="editor__toolitem">
                <button className="editor__button" onClick={onBoldClick}>B</button>
              </div>
              <div className="editor__toolitem">
                <button className="editor__button" onClick={onBoldClick}>I</button>
              </div>
              <div className="editor__toolitem">
                <button className="editor__button" onClick={onBoldClick}>$</button>
              </div>
              <div className="editor__spacer"></div>
              <div className="editor__send">
                <button className="editor__button">&gt;</button>
              </div>
            </div>
            <MentionSuggestions
              open={open}
              onOpenChange={onOpenChange}
              suggestions={suggestions}
              onSearchChange={onSearchChange}
              onAddMention={(test: MentionData) => {
                // get the mention object selected
                console.log(test)
              }}
            />
          </div>
              <div className="editor__toolitem">
                <EmojiSuggestions />
                <div className="options">
                  <EmojiSelect />
                </div>
              </div>
        </div>
  );
}