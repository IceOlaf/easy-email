import { IframeComponent } from '@/components/UI/IframeComponent';
import React, { useCallback, useEffect, useState } from 'react';
import { useDomScrollHeight } from '@/hooks/useDomScrollHeight';
import { useActiveTab } from '@/hooks/useActiveTab';
import { PreviewEmail } from '../PreviewEmail';

export function DesktopEmailPreview() {
  const { scrollHeight } = useDomScrollHeight();
  const { activeTab } = useActiveTab();
  const [scrollEle, setScrollEle] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollEle) return;

    if (scrollEle) {
      scrollEle.scrollTo(0, scrollHeight.current);
    }
  }, [activeTab, scrollEle, scrollHeight]);

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const target = event.target as HTMLDivElement;
      scrollHeight.current = target.scrollTop;
    },
    [scrollHeight]
  );

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <IframeComponent
        height='100%'
        width='100%'
        style={{ border: 'none', overflow: 'hidden' }}
      >
        <div
          className='preview-container'
          onScroll={onScroll}
          ref={setScrollEle}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 40,
            paddingBottom: 40,
            boxSizing: 'border-box',
            height: '100vh',
            overflow: 'auto',
            margin: 'auto',
          }}
        >
          <PreviewEmail />
          <style>{`

          .preview-container::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 8px;
          }
          .preview-container::-webkit-scrollbar-thumb {
            background-color: rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
            -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
          }
          `}
          </style>
        </div>
      </IframeComponent>
    </div>
  );
}
