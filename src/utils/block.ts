import { BlockType } from './../constants';
import { IPage } from '@/components/core/blocks/basic/Page';
import { IBlock, IBlockData } from '@/typings';
import { get } from 'lodash';
import { BlocksMap } from '../components/core/blocks';

export function getPageIdx() {
  return 'content';
}

export function getChildIdx(idx: string, index: number) {
  return `${idx}.children.[${index}]`;
}

export function getNodeIdxClassName(idx: string) {
  return `node-idx-${idx}`;
}

export function getNodeTypeClassName(type: string) {
  return `node-type-${type}`;
}

export function getNodeIdxFromClassName(classList: DOMTokenList) {
  return Array.from(classList)
    .find((item) => item.includes('node-idx-'))
    ?.replace('node-idx-', '');
}

export function getNodeTypeFromClassName(
  classList: DOMTokenList
): BlockType | null {
  return Array.from(classList)
    .find((item) => item.includes('node-type-'))
    ?.replace('node-type-', '') as BlockType;
}

export function findBlockByType(type: BlockType): IBlock {
  return BlocksMap.findBlockByType(type);
}

export const getIndexByIdx = (idx: string) => {
  return Number(/\.\[(\d+)\]$/.exec(idx)?.[1]) || 0;
};

export const getParentIdx = (idx: string) => {
  return /(.*)\.children\.\[\d+\]$/.exec(idx)?.[1];
};

export const getValueByIdx = <T extends IBlockData>(
  values: { content: IPage },
  idx: string
): T | null => {
  return get(values, idx);
};

export const getParentByIdx = <T extends IBlockData>(
  values: { content: IPage },
  idx: string
): T | null => {
  return get(values, getParentIdx(idx) || '');
};

export const getSiblingIdx = (sourceIndex: string, num: number) => {
  return sourceIndex.replace(/\[(\d+)\]$/, (_, index) => {
    if (Number(index) + num < 0) return '[0]';
    return `[${Number(index) + num}]`;
  });
};

export const getParentByType = <T extends IBlockData>(
  context: { content: IPage },
  idx: string,
  type: BlockType
): T | null => {
  if (!idx) return null;
  let parentIdx = getParentIdx(idx);
  while (parentIdx) {
    const parent = get(context, parentIdx) as T;
    if (parent && parent.type === type) return parent;
    parentIdx = getParentIdx(idx);
  }

  return null;
};
