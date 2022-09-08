import {React} from 'react';
import './footer.scss';

// use function component to pass the footer text
const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <div>
            <img src="/asset/img/logotype-tideisun.svg" alt="tideiSun" />
          </div>
          <div>Copyright © 2022 TideiSun Group 泰德陽光集團. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
