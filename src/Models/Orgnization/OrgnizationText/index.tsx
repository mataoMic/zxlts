import "./index.scss";
export const OrgnizationText = ({ data }: any) => {
  return (
    <>
      {data.map((item: any) => {
        // console.log(item);
        return (
          <div
            className="orgnizationText-container"
            key={Math.floor(Math.random() * 10000 + 1)}
          >
            <div>
              <div className="orgnizationText-title-icon"  style={{background: item.background}}/>
            </div>
            <div>
              <div className="orgnizationText-value-title">{item.title}</div>
              <div className="orgnizationText-value-number-percentage">
                <div className="orgnizationText-value-number-percentage-number">{item.number}</div>
                <div className="orgnizationText-value-number-percentage-line">|</div>
                <div>{item.percentage + "%"}</div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
