import React from 'react';
import { Tabs } from '@arco-design/mobile-react';

export default function TabsDemo({ tabData }:any) {
    return (
        <Tabs
            tabs={tabData.labels}
            type="line-divide"
            defaultActiveTab={0}
            tabBarHasDivider={false}
            onAfterChange={(tab, index) => {
                // console.log('[tabs]', tab, index);
            }}
            translateZ={false}
        >
            {
              tabData.values.map((item:any) => {
                return <div key={Math.floor(Math.random()*10000+1)} className="demo-tab-content">{item}</div>
              })
            }
        </Tabs>
    );
}