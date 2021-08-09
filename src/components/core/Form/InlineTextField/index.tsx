import React, { useCallback, useEffect } from 'react';
import { findBlockNodeByIdx, getShadowRoot } from '@/utils/findBlockNodeByIdx';
import { getEditContent, getEditNode } from '@/utils/getEditNode';
import { useBlock } from '@/hooks/useBlock';
import { FIXED_CONTAINER_ID } from '@/constants';

export interface InlineTextProps {
  idx: string;
  children?: React.ReactNode;
  onChange: (content: string) => void;
}

export function InlineText({ idx, onChange, children }: InlineTextProps) {
  const { focusBlock } = useBlock();

  const textContainer = findBlockNodeByIdx(idx);

  const onTextChange = useCallback(
    (text: string) => {
      if (focusBlock?.data.value.content !== text) {
        onChange(text);
      }
    },
    [focusBlock?.data.value.content, onChange]
  );

  useEffect(() => {
    if (!textContainer) return;

    const container = getEditNode(textContainer);

    if (container) {
      let focusTarget: HTMLElement | null = null;
      const root = getShadowRoot();

      const onClick = (ev: Event) => {
        ev.stopPropagation();
        focusTarget = ev.target as HTMLElement;
        const fixedContainer = document.getElementById(FIXED_CONTAINER_ID);
        if (textContainer?.contains(focusTarget)) return;

        if (fixedContainer && fixedContainer.contains(focusTarget)) return;
        if (fixedContainer?.contains(document.activeElement)) return;

        onTextChange(getEditContent(textContainer));
      };

      const onPaste = (e: ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain') || '';
        document.execCommand('insertHTML', false, text);
      };
      const stopDrag = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };

      container.addEventListener('paste', onPaste as any, true);
      container.addEventListener('dragstart', stopDrag);

      document.addEventListener('mousedown', onClick);
      root.addEventListener('mousedown', onClick);

      return () => {
        container.removeEventListener('paste', onPaste as any, true);
        container.removeEventListener('dragstart', stopDrag);

        document.removeEventListener('mousedown', onClick);
        root.removeEventListener('mousedown', onClick);
      };
    }
  }, [onTextChange, textContainer]);

  return <>{children}</>;
}
