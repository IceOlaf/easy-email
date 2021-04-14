import React, { useEffect, useRef, useState } from 'react';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  FontSizeOutlined,
  FontColorsOutlined,
  BgColorsOutlined,
  StopOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  MinusOutlined,
  AlignRightOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  CloseOutlined
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { Stack } from '../Stack';
import { Button, Drawer, Tooltip } from 'antd';
import styles from './index.module.scss';
import { ColorPicker } from '../core/Form/ColorPicker';
import { TextStyle } from '../TextStyle';
import { ToolItem } from './components/ToolItem';
import { Link } from './components/Link';
import { FontSizeList } from './components/FontSizeList';
import { Heading } from './components/Heading';

export interface RichTextProps {
  content: string;
  containerStyle: React.CSSProperties;
  onChange: (content: string) => any;
}

export function RichText(props: RichTextProps) {
  const { containerStyle } = props;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [initialValue] = useState(props.content);
  const editorRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [range, setRange] = useState<Range | null | undefined>(null);

  useEffect(() => {
    const onSelectionChange = () => {
      const range = document.getSelection()?.getRangeAt(0);
      if (container?.contains(range?.commonAncestorContainer!)) {
        setRange(range);
      } else if (
        !editorRef.current?.contains(range?.commonAncestorContainer!)
      ) {
        // console.log(
        //   'editorRef.current?.contains(range?.commonAncestorContainer!)',
        //   editorRef.current?.contains(range?.commonAncestorContainer!),
        //   range?.commonAncestorContainer!
        // );
        // setRange(null);
      }
    };

    const onBlur = () => { };

    document.addEventListener('selectionchange', onSelectionChange);
    document.addEventListener('click', onBlur);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChange);
      document.removeEventListener('click', onBlur);
    };
  }, [container]);

  const execCommand = (cmd: string, val?: any) => {
    if (!container) return;

    if (range) {
      let selection = window.getSelection()!;
      const newRange = document.createRange();
      newRange.selectNodeContents(container);
      newRange.setStart(range.startContainer, range.startOffset);
      newRange.setEnd(range.endContainer, range.endOffset);
      selection.removeAllRanges();
      selection.addRange(newRange);

      if (cmd === 'createLink') {
        const uuid = uuidv4();
        const url = val.link;
        const target = val.target;
        document.execCommand(cmd, false, uuid);
        const link = document.querySelector(`a[href="${uuid}"`)!;
        if (target) {
          link.setAttribute('target', '_blank');
        }
        link.setAttribute('href', url);
      } else {
        document.execCommand(cmd, false, val);
      }

      const html = container.innerHTML;
      props.onChange(html);
    }
  };

  const handleInput = (event: any) => {
    if (props.onChange) {
      props.onChange(event.target.innerHTML);
    }
  };

  const content = (
    <div className={styles.contaner} ref={editorRef}>
      <Stack vertical spacing='tight'>
        <Stack spacing='extraTight'>
          <Tooltip color='#fff' title={<FontSizeList onChange={(val) => execCommand('fontSize', val)} />}>
            <Button size='small' icon={<FontSizeOutlined />} />
          </Tooltip>
          <Tooltip color='#fff' title={<Heading onChange={(val) => execCommand('formatBlock', val)} />}>
            <Button size='small' icon={<TextStyle variation="strong">H</TextStyle>} />
          </Tooltip>
          <ToolItem onClick={() => execCommand('bold')} icon={<BoldOutlined />} title="Bold" />
          <ToolItem onClick={() => execCommand('italic')} icon={<ItalicOutlined />} title="Italic" />
          <ColorPicker
            label=''
            onChange={(color) => execCommand('foreColor', color)}
          >
            <ToolItem icon={<FontColorsOutlined />} title="Text color" />
          </ColorPicker>
          <ColorPicker
            label=''
            onChange={(color) => execCommand('hiliteColor', color)}
          >
            <ToolItem icon={<BgColorsOutlined />} title="Background color" />
          </ColorPicker>
          <Link key={props.content} onChange={(url) => execCommand('createLink', url)} />
          <ToolItem onClick={() => execCommand('unlink')} icon={<StopOutlined />} title="Unlink" />
          <ToolItem onClick={() => execCommand('removeFormat')} icon={<CloseOutlined />} title="Remove format" />
        </Stack>

        <Stack spacing='extraTight'>
          <ToolItem onClick={() => execCommand('justifyLeft')} icon={<AlignLeftOutlined />} title="Align left" />
          <ToolItem onClick={() => execCommand('justifyCenter')} icon={<AlignCenterOutlined />} title="Align center" />
          <ToolItem onClick={() => execCommand('justifyRight')} icon={<AlignRightOutlined />} title="Align right" />
          <ToolItem onClick={() => execCommand('strikeThrough')} icon={<StrikethroughOutlined />} title="StrikethroughOutlined" />
          <ToolItem onClick={() => execCommand('underline')} icon={<UnderlineOutlined />} title="UnderlineOutlined" />
          <ToolItem onClick={() => execCommand('insertOrderedList')} icon={<OrderedListOutlined />} title="Orderlist" />
          <ToolItem onClick={() => execCommand('insertUnorderedList')} icon={<UnorderedListOutlined />} title="Unorderlist" />

          <ToolItem onClick={() => execCommand('insertHorizontalRule')} icon={<MinusOutlined />} title="Line" />
          {
            isFullScreen
              ? <Button size="small" onClick={() => setIsFullScreen(false)} icon={<FullscreenExitOutlined />} title="Exit fullscreen" />
              : <Button size="small" onClick={() => setIsFullScreen(true)} icon={<FullscreenOutlined />} title="Fullscreen" />
          }

        </Stack>
        <div className={styles.editorWrapper} style={{ backgroundColor: containerStyle.backgroundColor }}>
          <div
            contentEditable
            ref={setContainer}
            style={{ ...containerStyle, backgroundColor: undefined, minHeight: 100 }}
            dangerouslySetInnerHTML={{ __html: initialValue }}
            onInput={handleInput}
          />
        </div>
      </Stack>
    </div>
  );

  return (

    <>
      {content}
      <Drawer
        width="100vh"
        title="Basic Drawer"
        placement="right"
        closable={false}
        visible={isFullScreen}
        onClose={() => setIsFullScreen(false)}
      >
        {content}
      </Drawer>
    </>
  );
}

