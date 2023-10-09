import style from "./style.module.css";

export default function Loader({color = "black"}) {
  return (
    <div className={style.loader}>
      <div style={{background: color}}></div>
      <div style={{background: color}}></div>
      <div style={{background: color}}></div>
      <div style={{background: color}}></div>
    </div>
  );
}
