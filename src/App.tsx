import Card from "./Components/Card";
import DataItem from "./Components/DataItem";
import { useState, useMemo } from "react";
import { Cell, DropdownMenu, Button } from "@arco-design/mobile-react";
import "./App.scss";
import "./restructure.scss";
import {
  subList,
  options,
  subTablePieList,
  activelabels,
  coChatlabels,
  subListCoChat,
  subListNoCoChat
} from "./api";
import { functionOptionFn,orgnizationOptionFn } from "./api/pieOptions";
import Tabs from "./Models/Tabs";
import SubTableItem from "./Models/SubTableItem";
import SubTablePie from "./Models/subTablePie";
import Orgnization from "./Models/Orgnization";
export default function ButtonDemo() {
  const [isCochat, setTsCochat] = useState(true);
  const [functionOption, setFunctionOption] = useState(functionOptionFn);
  const [orgnizationOption, setOrgnizationOption] = useState(orgnizationOptionFn);
  return (
    <>
      <Card full={true}>
        <div className="top-container">
          <span className="top-text">Quick Select</span>
          <div className="select-style">
            <DropdownMenu options={options} />
          </div>
          <Button inline size="small" style={{ marginRight: 40 }}>
            Refresh
          </Button>
        </div>
      </Card>
      <Card full={true}>
        <div className="top-sub-container">
          <div className="top-sub-container-icon">
            <i className="iconfont icon-tips" />
          </div>
          <div>
            You could view the usage data by select month,quaterly and fiscal
            year.
          </div>
        </div>
      </Card>
      <Orgnization option={orgnizationOption}/>
      <Card>
        <Tabs
          tabData={{
            labels: isCochat ? activelabels : coChatlabels,
            values: isCochat
              ? [
                  <SubTableItem data={subList} />,
                  <SubTablePie data={subTablePieList} option={functionOption} />,
                ]
              : [
                <SubTableItem data={subListCoChat} />,
                <SubTableItem data={subListNoCoChat} />,
              ],
          }}
        />
      </Card>
    </>
  );
}
