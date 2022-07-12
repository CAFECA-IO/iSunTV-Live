import React from 'react';
import './About.scss';

class About extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render()
    {
        return (
            <div className="c_about">
                <div>
                    <div className="title">關於我們</div>
                </div>
                <section>
                    <div className="part">
                        <div className="rectangle">
                            <div className="rect" />
                            <div className="subTitle">衛視簡介</div>
                            <div className="content">陽光衛視是全球唯一一家華語獨立言論及紀錄片電視頻道。<br />
                              陽光衛視2000年創辦于中國香港，為24小時全天候中文衛星頻道，以香港、北京、台北為節目核心製作基地，以製作歷史、人文、財經、時政節目和記錄片為主要內容，為公民話語、學者思想提供開放空間和獨立平臺。<br />
                              新聞報導評論，匯集全球時政要聞，挖掘中國深度新聞，解釋世俗之疑，辨照是非之理，尊崇獨立思考，相容天下言論；紀錄片以全球化視野，本土化關懷，以獨立的姿態，盡力展現社會真實之面貌，還曆史以真相。<br />
                              陽光衛視以重建包括大陸港澳臺在內的全球華人社會的主體價值論述為己任，坚持真话，真相，真知，思考國家民族的未來發展方向和模式，重民生，為民主，求自由，全力而為。
                            </div>
                        </div>

                        <div className="rectangle">
                            <div className="rect" />
                            <div className="subTitle">精品推薦</div>
                            <div className="content">《論衡》<br />
                              阳光衛視強檔對話欄目《論衡》由陽光衛視董事長、特約評論員陳平先生擔綱主持，與國內外一流學者嘉賓對陣。坐而論道，衡之於左右。《論衡》，解釋世俗之疑，辨照是非之理，尊崇獨立思考，和而不同，堅持中立立場，相容天下言論。《論衡》自開播伊始，在海內外傳播日廣，其中諸多專題在華人社會被持續關注廣泛討論。
                            </div>
                        </div>
                    </div>

                    <div className="part">
                        <div className="rectangle">
                            <div className="rect" />
                            <div className="subTitle">精品欄目</div>
                            <div className="content">深度言論欄目<br />
                              《子夜》、《論衡》、《陽光書坊》、《說文解字》、《春秋》<br />
                              紀錄片與專題片欄目（自製/自有版權）
                              《中華人文地理》、《鄉土中國》、《零點院線》、《國殤》、《陽光天下行》、《立言者》、《百年婚戀》、《真實的故事》、《睦鄰》、《兄弟》、《北美掠影》、《國寶背後的故事》、《親歷》、《人生線上》
                            </div>
                        </div>

                        <div className="rectangle">
                            <div className="rect" />
                            <div className="subTitle">接收陽光衛視</div>
                            <div className="content">
                              陽光衛視在亞洲衛星9號（東經122.0度）C波段上播出。訊號接收參數為：下行頻率04180、符號率30.83Msps、極性"垂直"、類型DVB-S2。
                            </div>
                        </div>

                        <div className="rectangle">
                            <div className="content">
                                <img alt="" src="/asset/img/boss@2x.png" />
                                <div>陽光衛視董事長 陳平 先生</div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}

export default About;
