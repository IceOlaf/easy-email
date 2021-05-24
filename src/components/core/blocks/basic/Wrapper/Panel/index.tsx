import React from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Background } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Background';
import { Stack } from '@/components/UI/Stack';
import { TextAlign } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/TextAlign';
import { TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';

import { useFocusIdx } from '@/hooks/useFocusIdx';
export function Panel() {
  const { focusIdx } = useFocusIdx();
  return (
    <Stack>
      <Padding />
      <Background />
      <TextAlign />
      <Stack vertical>
        <TextField
          label='Border'
          name={`${focusIdx}.attributes.border`}
          inline
          quickchange
        />
        <TextField
          label='Background border radius'
          name={`${focusIdx}.attributes.border-radius`}
          inline
          quickchange
        />
      </Stack>
    </Stack>
  );

}