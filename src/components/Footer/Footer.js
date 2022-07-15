import { React } from "react";
import './Footer.scss';

// use function component to pass the footer text
const FOOTER = (props) => {    

    return (

        <footer>
            <div>
                <div>
                    <div><img src="/asset/img/logotype-tideisun.svg" alt="tideiSun" /></div>
                    <div>Copyright © 2022 TideiSun Group 泰德陽光集團. All rights reserved.</div>
                </div>
            </div>
        </footer>
    
    );

}

export default FOOTER;