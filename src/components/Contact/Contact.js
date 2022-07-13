import React from 'react';
import update from 'immutability-helper';
import './Contact.scss';

class Contact extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            input: {
                name: '',
                phone: '',
                email: '',
                comment: ''
            },
            message: '送出',
            messageClass: ''
        };
    }

    nameChange(e)
    {
        this.setState(update(this.state, {
            input: {
                name: { $set: e.target.value }
            }
        }));
    }

    phoneChange(e)
    {
        this.setState(update(this.state, {
            input: {
                phone: { $set: e.target.value }
            }
        }));
    }

    emailChange(e)
    {
        this.setState(update(this.state, {
            input: {
                email: { $set: e.target.value }
            }
        }));
    }

    commentChange(e)
    {
        this.setState(update(this.state, {
            input: {
                comment: { $set: e.target.value }
            }
        }));
    }

    submit()
    {
        if (this.name.value !== '' && this.phone.value !== '' && this.email.value !== '' && this.comment.value !== '')
        {
            const data = {
                comment: `<h3>姓名：${this.name.value}</h3>
                          <h3>手機：${this.phone.value}</h3>
                          <h3>Email：${this.email.value}</h3>
                          <h3>意見：${this.comment.value}</h3>`
            };

            // chinaSuntvAction.sendMail(data, (err, res) => {
            //     if (err)
            //     {
            //         if (res.message === 'send failed')
            //         {
            //             this.setState(update(this.state, {
            //                 message: { $set: '送出失敗' },
            //                 messageClass: { $set: 'error' }
            //             }), () => {
            //                 setTimeout(() => {
            //                     this.setState(update(this.state, {
            //                         message: { $set: '送出' },
            //                         messageClass: { $set: '' }
            //                     }));
            //                 }, 2500);
            //             });
            //         }
            //     }
            //     else
            //     {
            //         this.setState(update(this.state, {
            //             input: {
            //                 name: { $set: '' },
            //                 phone: { $set: '' },
            //                 email: { $set: '' },
            //                 comment: { $set: '' }
            //             },
            //             message: { $set: '送出成功' }
            //         }), () => {
            //             setTimeout(() => {
            //                 this.setState(update(this.state, {
            //                     message: { $set: '送出' },
            //                 }));
            //             }, 2500);
            //         });
            //     }
            // });
        }
        else
        {
            this.setState( update(this.state, {
                message: { $set: '欄位未完成' },
                messageClass: { $set: 'error' }
            }), () => {
                setTimeout(() => {
                    this.setState(update(this.state, {
                        message: { $set: '送出' },
                        messageClass: { $set: '' }
                    }));
                }, 2500);
            });
        }
    }

    render()
    {
        const {
            name, phone, email, comment
        } = this.state.input;

        const { message, messageClass } = this.state;

        return (
            <div className="c_contact">
                <div className="title">
                    <div>聯繫我們</div>
                </div>
                <div className="contact">
                    <div className="message">
                        <div className="userInfo">
                            <div>
                                <div>姓名</div>
                                <input value={name} ref={(input) => { this.name = input; } } />
                                <div>電話</div>
                                <input value={phone} ref={(input) => { this.phone = input; } } />
                                <div>電子郵件</div>
                                <input value={email} ref={(input) => { this.email = input; } } />
                            </div>
                        </div>
                        <div className="userInfoRight">
                            <div className="comment">
                                <div>意見</div>
                                <textarea value={comment} ref={(input) => { this.comment = input; } } />
                            </div>
                            <div className="submit">
                                <button><div className={messageClass}>{message}</div></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="location">
                    <div>
                        <div>Hong Kong</div>
                        <div>香港</div>
                        <div>
                            <div>T. +852 2526-7818</div>
                            <div>E. info@isuncloud.com</div>
                            <div>A. 柴灣安業街1號 新華豐中心7樓</div>
                        </div>
                    </div>
                    <div>
                        <div>Taipei</div>
                        <div>台北</div>
                        <div>
                            <div>T. +886 2-2700-1979</div>
                            <div>E. info@isuncloud.com</div>
                            <div>A. 台北市大安區敦化南路2段77號21樓</div>
                        </div>
                    </div>
                    <div>
                        <div>New York</div>
                        <div>紐約</div>
                        <div>
                            <div>T. +1 (855) 593-9675</div>
                            <div>E. info@isuncloud.com</div>
                            <div>A. 222 Broadway New York NY10038</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Contact;
