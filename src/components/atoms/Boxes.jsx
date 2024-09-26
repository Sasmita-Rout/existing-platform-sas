export function Boxes({ boxes = [] }) {
  return (
    <div className="box-main">
      {boxes?.map((label, i) => (
        <div
          className="box-parent"
          key={i}
          style={{ borderColor: label.color }}
        >
          <span className="percent">
            <down-arrow />
            2.3
          </span>
          <h4>{label.titleNum}</h4>
          <p>{label.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Boxes;
