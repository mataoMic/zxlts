import Card from "../../Components/Card";
import ECharts from "../ECharts";
import { OrgnizationText } from "./OrgnizationText";
import './index.scss';
const Orgnization = ({option, data, orgnizationTextList}:any) => {
  // console.log(option,data)
  return (
    <Card>
      <div className="container-title orgnization-container-title">Your Orgnization</div>
      <div className="orgnization-container-pie" style={{width:'100%'}}>
        <ECharts option={option}/>
        <div className="orgnization-container-pie-text">
          <div>
            <OrgnizationText data={data}/>
          </div>
        </div>
      </div>
      <Card style={{ background: "#F6F7FB",padding:"10px", margin:"10px" }}>
        <div className="orgnization-container">
          <div className="orgnization-container-icon">
            <i className="iconfont icon-people icon-people-transparent" />
          </div>
          <div>
            <div className="orgnization-bottom-container-title">
              Monthly Active Uer
            </div>
            <div className="orgnization-bottom-container-value">{`${orgnizationTextList.activeUserSum}/${orgnizationTextList.totalUserSum}`}</div>
          </div>
        </div>
      </Card>
    </Card>
  );
};
export default Orgnization;
