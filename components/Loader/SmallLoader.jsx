import style from "./style_small.module.css";

export default function SmallLoader({color = "black"}) {
  return (
    <div className={style.loader}>
      <div style={{background: color}}></div>
      <div style={{background: color}}></div>
      <div style={{background: color}}></div>
      <div style={{background: color}}></div>
    </div>
  );
}
