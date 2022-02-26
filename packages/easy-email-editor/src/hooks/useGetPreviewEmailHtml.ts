import { useEffect, useState } from 'react';

import { JsonToMjml } from 'easy-email-core';
import mjml from 'mjml-browser';
import { useEditorContext } from '@/hooks/useEditorContext';
import { cloneDeep, isString } from 'lodash';
import { useEditorProps } from '@/hooks/useEditorProps';
import { useMemo } from 'react';
import { HtmlStringToPreviewReactNodes } from '@/utils/HtmlStringToPreviewReactNodes';

export function useGetPreviewEmailHtml() {
  const { pageData } = useEditorContext();
  const { onBeforePreview, mergeTags, previewInjectData } = useEditorProps();
  const [errMsg, setErrMsg] = useState('');
  const [html, setHtml] = useState('');

  const injectData = useMemo(() => {
    if (previewInjectData) {
      return previewInjectData;
    }
    if (mergeTags) return mergeTags;
    return {};
  }, [mergeTags, previewInjectData]);

  useEffect(() => {
    let parseHtml = mjml(
      JsonToMjml({
        data: pageData,
        mode: 'production',
        context: pageData,
        dataSource: cloneDeep(injectData),
      })
    ).html;
    if (onBeforePreview) {
      try {
        const result = onBeforePreview(parseHtml, injectData);
        if (isString(result)) {
          parseHtml = result;
        } else {
          result.then((resHtml) => {
            parseHtml = resHtml;
          });
        }

        setErrMsg('');
      } catch (error: any) {
        setErrMsg(error?.message || error);
      }
    }
    setHtml(parseHtml);
  }, [injectData, onBeforePreview, pageData]);

  const htmlNode = useMemo(() => HtmlStringToPreviewReactNodes(html), [html]);

  return {
    errMsg,
    html,
    htmlNode
  };
}
