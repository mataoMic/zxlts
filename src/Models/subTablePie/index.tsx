import "./index.scss";
import ECharts from "../ECharts";
export default function SubTablePie({ data, option }: any) {
  return (
    <>
      <div style={{ width: "100%" }}>
        <ECharts option={option} />
      </div>

      {data.subTableList.map((item: any) => {
        return (
            <div
              className="subTablePie-container"
              key={Math.floor(Math.random() * 10000 + 1)}
            >
              <div
                className="subTablePie-title-icon"
                style={{ background: item.color }}
              />
              <div>
                <div className="subTablePie-title">{item.title}</div>
                <div className="subTablePie-value">{item.value}</div>
              </div>
            </div>
        );
      })}
    </>
  );
}
