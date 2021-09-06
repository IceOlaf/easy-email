import { Tabs } from 'antd';
import React, { useMemo } from 'react';
import { BlockLayerManager } from './components/BlockLayerManager';
import { SourceCodeManager } from './components/SourceCodeManager';
import { AttributesManager } from './components/AttributesManager';

export function ConfigurationPanel() {
  return useMemo(
    () => (
      <Tabs tabBarStyle={{ paddingLeft: 20 }}>
        <Tabs.TabPane key='Configuration' tab='Configuration'>
          <AttributesManager />
        </Tabs.TabPane>
        <Tabs.TabPane key='Block layer' tab='Block layer'>
          <BlockLayerManager />
        </Tabs.TabPane>
        <Tabs.TabPane key='Source code' tab='Source code'>
          <SourceCodeManager />
        </Tabs.TabPane>
      </Tabs>
    ),
    []
  );
}
