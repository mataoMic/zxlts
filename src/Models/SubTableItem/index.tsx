import * as _ from "lodash-es";
import DataItem from "../../Components/DataItem";
import { Progress } from "@arco-design/mobile-react";
import "./index.scss";
import Card from "../../Components/Card";
export default function subTableItem({ data }: any) {
  console.log(data);
  return (
    <>
      <div className="active-tabs-container">
        {data.tabsList && data.tabsList.map((item:any) => {
          return <div className="active-tabs-item">{item}</div>
        })}
      </div>
      {data.processList && data.processList.map((item: any, index: Number) => {
        return (
          <DataItem
            style={
              data.length > 1 && index !== 0
                ? { borderTop: "1px solid #ddd" }
                : {}
            }
            noCrevice={true}
            key={Math.floor(Math.random() * 10000 + 1)}
            label={
              item.subLabel ? (
                <>
                  <span className="subTable-label">{item.label}</span>
                  <span className="subTable-subLabel">{item.subLabel}</span>
                </>
              ) : (
                <span className="subTable-label">{item.label}</span>
              )
            }
            value={
              <div className="subTable-progress-container">
                {item.value && item.progressColor && (
                  <Progress
                    style={{ width: "2rem", whiteSpace: "nowrap" }}
                    percentage={item.value}
                    progressColor={item.progressColor}
                    trackStroke={8}
                  />
                )}
              </div>
            }
          >
            {item.children && (
              <Card style={{ background: "#F6F7FB", margin: 0 }}>
                {item.children.map((_item: any) => {
                  return (
                    <DataItem
                      key={Math.floor(Math.random() * 10000 + 1)}
                      label={_item.label}
                      value={
                        <div className="subTable-progress-container">
                          <div
                            className="number"
                            style={{ color: _item.progressColor }}
                          >
                            {_item.number}
                          </div>
                          <Progress
                            style={{ width: "2rem", whiteSpace: "nowrap" }}
                            progressColor={_item.progressColor}
                            trackColor={_item.trackColor}
                            percentage={_item.value}
                            trackStroke={8}
                          />
                        </div>
                      }
                    />
                  );
                })}
              </Card>
            )}
          </DataItem>
        );
      })}
    </>
  );
}
