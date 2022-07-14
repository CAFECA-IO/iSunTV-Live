import { React } from "react";
import './Footer.scss';

// because I only need to return the pure text based html, so I use function component here
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
    )

}

export default FOOTER;