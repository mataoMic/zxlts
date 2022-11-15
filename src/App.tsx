import Card from "./Components/Card";
import * as _ from 'lodash-es';
import DataItem from "./Components/DataItem";
import { useState, useMemo, useEffect } from "react";
import { json, useParams } from "react-router-dom";
import {
  Cell,
  DropdownMenu,
  Button,
  DatePicker,
} from "@arco-design/mobile-react";
import "./App.scss";
import "./restructure.scss";
import { options, dashboardData } from "./api";
import { functionOptionFn, orgnizationOptionFn } from "./api/pieOptions";
import Tabs from "./Models/Tabs";
import SubTableItem from "./Models/SubTableItem";
import SubTablePie from "./Models/subTablePie";
import Orgnization from "./Models/Orgnization";
import useGetData from "./hooks/useRequest";
import {
  LoadingModal,
  loading as startLoading,
  alert,
} from "./Components/Modal";
import Empty from "./Models/Empty";
import { Toast } from "@arco-design/mobile-react";
export default function Dashboard() {
  const [rand] = useState(Math.random());
  const [selectItem, setSelectItem] = useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() < 10
        ? "0" + (new Date().getMonth() + 1)
        : new Date().getMonth() + 1)
  );
  const [pickerVisible, setPickerVisible] = useState(false);
  const [selectStartTime, setSelectStartTime] = useState(true);
  const [startTime, setStartTime]:any = useState(
    new Date().getTime()
  );
  const [endTime, setEndTime]:any = useState(
    new Date().getTime()
  );
  // const [orgnizationOption, setOrgnizationOption] =
  //   useState(orgnizationOptionFn);
  console.log(selectItem, rand);
  const [data, loading, error, code]: any = useGetData(
    dashboardData,
    selectItem,
    [selectItem]
  );
  if (error) {
    // console.log(error)
    alert("数据错误！");
  }
  useEffect(()=>{
    _.get(data,'toast') && toast('toast', {
      content: data.toast,
      duration: 2000
  })
  },[data])
  return (
    <>
      <Card full={true}>
        <div className="top-container">
          <div className="top-text">Quick Select</div>
          <div className="select-style">
            <DropdownMenu
              options={options()}
              onOptionClick={(value, item) => {
                console.info("click");
              }}
              onOptionChange={(value: any, item: any) => {
                setSelectItem(item.label);
                console.info(value, item);
              }}
            />
          </div>
        </div>
        <div className="top-container">
          <div className="top-text">Month Select</div>
          <div className="top-button-container">
          <Button inline size="small" className="top-date-button" onClick={()=>{
            setSelectStartTime(true)
            setPickerVisible(true)
            // console.log('刷新')
          }}>
            { new Date(startTime).getFullYear() + '-' +  (new Date(startTime).getMonth()+1)}
            <i className="iconfont icon-date" style={{marginLeft:'0.5rem'}} />
          </Button>
          <div>~</div>
          <Button inline size="small" className="top-date-button" onClick={()=>{
            setSelectStartTime(false)
            setPickerVisible(true)
            // console.log('刷新')
          }}>
            {  new Date(endTime).getFullYear() + '-' +  (new Date(endTime).getMonth()+1)}
            <i className="iconfont icon-date" style={{marginLeft:'0.5rem'}} />
          </Button>
          <Button inline size="small" className="top-reflash-button" onClick={()=>{
          console.log(`${startTime},${endTime}`)
          setSelectItem(`${startTime},${endTime}`)
          }}>
            Refresh
          </Button>
          </div>
        </div>
      </Card>
      {loading ? (
        <LoadingModal shown={true} text={"loading"} />
      ) : !data.toast ? (
        <>
          <Card full={true}>
            <div className="top-sub-container">
              <div className="top-sub-container-icon">
                <i className="iconfont icon-tips" />
              </div>
              <div>
                You could view the usage data by select month,quaterly and
                fiscal year.
              </div>
            </div>
          </Card>
          <Orgnization
            option={data.orgnizationOption}
            data={data.orgnizationText}
            orgnizationTextList={data.orgnizationTextList}
          />
          <Card style={{ padding: 0 }}>
            <SubTableItem data={data.subordinateDashboard} />
          </Card>
          {/* <Card>
          <Tabs
            tabData={{
              labels: isCochat ? activelabels : coChatlabels,
              values: isCochat
                ? [
                    <SubTableItem data={subList} />,
                    <SubTablePie
                      data={subTablePieList}
                      option={functionOption}
                    />,
                  ]
                : [
                    <SubTableItem data={subListCoChat} />,
                    <SubTableItem data={subListNoCoChat} />,
                  ],
            }}
          />
        </Card> */}
        </>
      ):<Empty />}
      <DatePicker
        visible={pickerVisible}
        maskClosable
        disabled={false}
        currentTs={selectStartTime?startTime:endTime}
        typeArr={['year','month']}
        // mode="date"
        // minTs={startTime}
        onHide={() => {
          setPickerVisible(false);
        }}
        onChange={(timestamp, obj) => {
          console.info("---demo on change",timestamp, obj);
          if (selectStartTime) {
            setStartTime(timestamp);
          }else {
            setEndTime(timestamp);
          }
        }}
        onOk={(timestamp, obj) => {
          console.info("----- time onok demo date", obj, timestamp);
          console.log(selectStartTime)
        }}
        formatter={(value, type): any => {
          if (type === "year") {
            return `${value}年`;
          } else if (type === "month") {
            return `${value}月`;
          }
        }}
      />
    </>
  );
}
function toast(func:any, options:any) {
  if (!!(window as any).toastInstance) {
    (window as any).toastInstance.close();
  }
  (window as any).toastInstance = (Toast as any)[func](options);
}