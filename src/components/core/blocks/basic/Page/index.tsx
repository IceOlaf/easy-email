import { Panel } from './Panel';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type IPage = IBlockData<{
  'background-color'?: string;
  width?: string;
}, {
  breakpoint?: string;
  'font-family': string;
  'text-color': string;
  headAttributes: string;
  fonts: string[];
}>;

export const Page: IBlock<IPage> = {
  name: 'Page',
  type: BasicType.PAGE,
  Panel,
  createInstance,
  validChildrenType: [
    BasicType.SECTION,
    BasicType.WRAPPER,
    BasicType.HERO,
  ],
};
