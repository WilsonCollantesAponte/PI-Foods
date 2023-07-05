import { Link } from "react-router-dom";
import m from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={m.mainDiv}>
      <Link to="/Home">
        <button> Ir a página principal </button>
      </Link>
    </div>
  );
}
