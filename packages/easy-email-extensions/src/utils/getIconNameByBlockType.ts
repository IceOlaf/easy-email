import { BasicType, AdvancedType } from 'easy-email-core';
import { get } from 'lodash';

const iconsMap = {
  [BasicType.TEXT]: 'icon-text',
  [BasicType.SECTION]: 'icon-section',
  [BasicType.COLUMN]: 'icon-column',
  [BasicType.DIVIDER]: 'icon-divider',
  [BasicType.IMAGE]: 'icon-img',
  [BasicType.BUTTON]: 'icon-button',
  [BasicType.GROUP]: 'icon-group',
  [BasicType.PAGE]: 'icon-page',
  [BasicType.WRAPPER]: 'icon-wrapper',
  [BasicType.NAVBAR]: 'icon-navbar',
  [BasicType.HERO]: 'icon-hero',
  [BasicType.SPACER]: 'icon-spacing',
  [BasicType.SOCIAL]: 'icon-social',
  [BasicType.CAROUSEL]: 'icon-carousel',
  [BasicType.ACCORDION]: 'icon-accordion',

  [AdvancedType.TEXT]: 'icon-text',
  [AdvancedType.DIVIDER]: 'icon-divider',
  [AdvancedType.IMAGE]: 'icon-img',
  [AdvancedType.BUTTON]: 'icon-button',
  [AdvancedType.NAVBAR]: 'icon-navbar',
  [AdvancedType.SPACER]: 'icon-spacing',
  [AdvancedType.SOCIAL]: 'icon-social',
  [AdvancedType.CAROUSEL]: 'icon-carousel',
  [AdvancedType.ACCORDION]: 'icon-accordion',
};

export function getIconNameByBlockType(type: string) {
  return get(iconsMap, type) || 'icon-number';
}
