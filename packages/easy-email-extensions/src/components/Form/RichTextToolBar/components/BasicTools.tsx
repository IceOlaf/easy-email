import { IconFont, useBlock, useFocusIdx } from 'easy-email-editor';
import { useAddToCollection } from '@extensions/hooks/useAddToCollection';
import { getParentIdx } from 'easy-email-core';
import React from 'react';
import { ToolItem } from './ToolItem';

export function BasicTools() {
  const { copyBlock, removeBlock } = useBlock();
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { modal, setModalVisible } = useAddToCollection();

  const handleAddToCollection = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setModalVisible(true);
  };

  const handleCopy: React.MouseEventHandler<any> = (ev) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    copyBlock(focusIdx);
  };

  const handleDelete = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    removeBlock(focusIdx);
  };

  const handleSelectParent = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setFocusIdx(getParentIdx(focusIdx)!);
  };

  return (
    <div style={{ marginRight: 40 }}>
      <ToolItem icon={<span>Text</span>} />
      <ToolItem
        onClick={handleSelectParent}
        title='Select parent block'
        icon={<IconFont iconName='icon-back-parent' />}
      />
      <ToolItem
        onClick={handleCopy}
        title='Copy'
        icon={<IconFont iconName='icon-copy' />}
      />
      <ToolItem
        onClick={handleAddToCollection}
        title='Add to collection'
        icon={<IconFont iconName='icon-collection' />}
      />
      <ToolItem
        onClick={handleDelete}
        title='Delete'
        icon={<IconFont iconName='icon-delete' />}
      />
      {modal}
    </div>
  );
}
