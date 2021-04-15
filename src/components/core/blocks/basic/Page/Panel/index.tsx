import React from 'react';
import { useBlock } from '@/hooks/useBlock';
import { Stack } from '@/components/Stack';
import { ColorPickerField, TextField } from '@/components/core/Form';

export function Panel() {
  const { focusIdx, focusBlock } = useBlock();

  if (!focusBlock) return null;
  return (
    <Stack>
      <TextField label='Subject' name={'subject'} inline />
      <TextField label='SubTitle' name={'subTitle'} inline />
      <ColorPickerField
        label='Background color'
        name={`${focusIdx}.attributes.background-color`}
        inline
      />
      <TextField
        label='Breakpoint'
        name={`${focusIdx}.data.value.breakpoint`}
        inline
      />
    </Stack>
  );
}
