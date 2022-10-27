import "./index.scss";
function Model({ children, full, style }: any) {
  return (
    <div className={`ui-card ${full&&" ui-card-full"}`} style={style}>
      <div className="ui-card-content">{children}</div>
    </div>
  );
}
export default Model;