import Advantage from "./component/Advantage";
import Enrich from "./component/Enrich";
import Footer from "./component/Footer";
import Industries from "./component/Industries";
import Main from "./component/Main";
import MainEvents from "./component/MainEvents";
import Partners from "./component/Partners";

export default function Home() {

  return (
    <div>
      <div className="main">
        <Main />
      </div>
      <Partners />
      <MainEvents />
      <Industries />
      <Advantage />
      
    </div>
  )
}
