import Card from "../../Components/Card";
import ECharts from "../ECharts";
import './index.scss';
const Orgnization = ({option}:any) => {
  return (
    <Card>
      <div className="orgnization-container-pie" style={{width:'100%'}}>
        <ECharts option={option}/>
        <div>123</div>
      </div>
      <div className="orgnization-container-title">Your Orgnization</div>
      <Card style={{ background: "#F6F7FB" }}>
        <div className="orgnization-container">
          <div className="orgnization-container-icon">
            <i className="iconfont icon-people icon-people-transparent" />
          </div>
          <div>
            <div className="orgnization-bottom-container-title">
              Monthly Active Uer
            </div>
            <div className="orgnization-bottom-container-value">123/232</div>
          </div>
        </div>
      </Card>
    </Card>
  );
};
export default Orgnization;
