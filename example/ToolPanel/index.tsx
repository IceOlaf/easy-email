import React from 'react';
import styles from './index.module.scss';
import { Collapse } from 'antd';
import {
  CustomerServiceOutlined,
  VideoCameraOutlined,
  PictureOutlined,
  LayoutOutlined,
  FontSizeOutlined,
  MergeCellsOutlined,
  FormOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import { BlockIcon } from './components/BlockIcon';
import { BasicType } from '@/constants';
import { ColumnBlockIconPanel } from './components/ColumnBlockIcon';

const { Panel } = Collapse;

export const ToolPanel = function () {
  return (
    <div className={styles.container}>
      <Collapse className={styles.collapse} defaultActiveKey={['1', '2', '3']}>
        <Panel header='布局组件' key='2'>
          <div style={{ padding: '10px 20px' }}>
            <ColumnBlockIconPanel />
          </div>

        </Panel>
        <Panel header='基础组件' key='1'>
          <div className={styles.list}>
            <BlockIcon
              text='Wrapper'
              type={BasicType.WRAPPER}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text='行'
              type={BasicType.SECTION}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text='列'
              type={BasicType.COLUMN}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text='分组'
              type={BasicType.GROUP}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text='图片'
              type={BasicType.IMAGE}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text='文本'
              type={BasicType.TEXT}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text='Button'
              type={BasicType.BUTTON}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text='Divider'
              type={BasicType.DIVIDER}
              icon={<FormOutlined />}
            />
          </div>
        </Panel>

      </Collapse>
    </div>
  );
};
