import {
  EyeOutlined,
  EyeInvisibleOutlined,
  RightOutlined,
  DownOutlined,
  CopyOutlined,
  CloseOutlined
} from '@ant-design/icons';
import React, { useCallback, useMemo, useState } from 'react';
import { useEditorContext } from '@/hooks/useEditorContext';
import { IBlockData } from '@/typings';
import {
  findBlockByType,
  getChildIdx,
  getNodeIdxClassName,
  getNodeTypeClassName,
  getPageIdx,
} from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { BasicType, BLOCK_HOVER_CLASSNAME } from '@/constants';
import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import styles from './index.module.scss';
import { classnames } from '@/utils/classnames';
import { findBlockNodeByIdx } from '@/utils/findBlockNodeByIdx';
import { useDropBlock } from '@/hooks/useDropBlock';

export function BlockLayerManager() {
  const { setRef } = useDropBlock();
  const { pageData } = useEditorContext();
  return (
    <div ref={setRef}>
      <BlockLayerItem blockData={pageData} idx={getPageIdx()} />
      <style>
        {`

          .block-selected {
            color:#fff;
            background:  rgba(59,151,127,0.9) !important;
          }

          .block-dragover {
            color:#fff;
            background:  rgba(208,2,27,0.9) !important;
          }

          .block-tangent {
            color:#fff;
            background:  rgba(245,144,35,0.9) !important;
          }


          `}
      </style>
    </div>
  );
}

const BlockLayerItem = ({
  blockData,
  idx,
  indent,
}: {
  blockData: IBlockData;
  idx: string;
  indent?: React.ReactNode;
}) => {
  const { setFocusIdx, focusIdx } = useBlock();
  const [visible, setVisible] = useState(true);
  const title = findBlockByType(blockData.type)?.name;
  const noChild = blockData.children.length === 0;

  const onToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible((v) => !v);
  }, []);

  const subIcon = useMemo(() => {
    if (noChild)
      return (
        <div style={{ visibility: 'hidden' }}>
          <DownOutlined />
        </div>
      );
    if (visible) {
      return <DownOutlined onClick={onToggle} />;
    }
    return <RightOutlined onClick={onToggle} />;
  }, [noChild, onToggle, visible]);

  const onFocus = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setFocusIdx(idx);
      const node = findBlockNodeByIdx(idx);
      node?.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    },
    [idx, setFocusIdx]
  );

  const onMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const blockNode = findBlockNodeByIdx(idx);
      if (blockNode) {
        blockNode.classList.add(BLOCK_HOVER_CLASSNAME);
      }
    },
    [idx]
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const blockNode = findBlockNodeByIdx(idx);
      if (blockNode) {
        blockNode.classList.remove(BLOCK_HOVER_CLASSNAME);
      }
    },
    [idx]
  );

  const listItem = (
    <li
      key={idx}
      className={classnames(
        styles.blockItem,
        focusIdx === idx && styles.blockItemSelected,
        'email-block',
        getNodeIdxClassName(idx!),
        getNodeTypeClassName(blockData.type)
      )}
      onClick={onFocus}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Stack.Item fill>
        <Stack distribution='equalSpacing'>
          <Stack spacing='tight'>
            {indent}
            <EyeIcon idx={idx} blockData={blockData} />
            <TextStyle>{title}</TextStyle>
          </Stack>
          <Stack>
            <ShortcutTool idx={idx} blockData={blockData} />
            {subIcon}
          </Stack>
        </Stack>
      </Stack.Item>
    </li>
  );

  if (noChild) return listItem;
  return (
    <>
      {listItem}
      {visible && (
        <ul className={classnames(styles.blockList)}>
          {blockData.children.map((item, index) => (
            <BlockLayerItem
              key={index}
              indent={
                <Stack spacing='none'>
                  {indent}
                  <div style={{ width: 16, height: '100%' }} />
                </Stack>
              }
              blockData={item}
              idx={getChildIdx(idx, index)}
            />
          ))}
        </ul>
      )}
    </>
  );
};

function EyeIcon({ idx, blockData }: { idx: string; blockData: IBlockData; }) {
  const { setValueByIdx } = useBlock();

  const onToggleVisible = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      blockData.data.hidden = !blockData.data.hidden;
      setValueByIdx(idx, blockData);
    },
    [blockData, idx, setValueByIdx]
  );

  if (blockData.type === BasicType.PAGE) return null;

  return blockData.data.hidden ? (
    <EyeInvisibleOutlined onClick={onToggleVisible} />
  ) : (
    <EyeOutlined onClick={onToggleVisible} />
  );
}

function ShortcutTool({
  idx,
  blockData,
}: {
  idx: string;
  blockData: IBlockData;
}) {
  const { copyBlock, removeBlock } = useBlock();

  const enHanceHandler = useCallback((handler: (...rest: any) => void) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      handler();
    };
  }, []);

  if (blockData.type === BasicType.PAGE) return null;
  return (
    <Stack>
      <CopyOutlined onClick={enHanceHandler(() => copyBlock(idx))} />
      <CloseOutlined onClick={enHanceHandler(() => removeBlock(idx))} />
    </Stack>
  );
}
