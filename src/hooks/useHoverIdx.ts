import { useCallback, useContext } from 'react';
import { HoverIdxContext } from '@/components/HoverIdxProvider';
import { debounce } from 'lodash';

export function useHoverIdx() {
  const { hoverIdx, setHoverIdx } = useContext(HoverIdxContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setHoverIdxDebounce = useCallback(debounce(setHoverIdx), [setHoverIdx]);

  return {
    hoverIdx,
    setHoverIdx: setHoverIdxDebounce,
  };
}
