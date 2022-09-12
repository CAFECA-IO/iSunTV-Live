import React, {Component} from 'react';
import update from 'immutability-helper';
import './contact.scss';

class Contact extends Component {
  // A constructor is used to inherit the value (prop) from upper class
  /**
   * @param props means value from the upper class
   */
  constructor(props) {
    super(props);

    this.state = {
      input: {
        name: '',
        phone: '',
        email: '',
        comment: '',
      },
      message: '送出',
      messageClass: '',
    };
  }

  // A function is used to detect the onchange event of the name element
  /**
   * @param e means event
   */
  nameChange(e) {
    this.setState(
      update(this.state, {
        input: {
          name: {$set: e.target.value},
        },
      })
    );
  }

  // A function is used to detect the onchange event of the phone element
  /**
   * @param e means event
   */
  phoneChange(e) {
    this.setState(
      update(this.state, {
        input: {
          phone: {$set: e.target.value},
        },
      })
    );
  }

  // A function is used to detect the onchange event of the email element
  /**
   * @param e means event
   */
  emailChange(e) {
    this.setState(
      update(this.state, {
        input: {
          email: {$set: e.target.value},
        },
      })
    );
  }

  // A function is used to detect the onchange event of the email element
  /**
   * @param e means event
   */
  commentChange(e) {
    this.setState(
      update(this.state, {
        input: {
          comment: {$set: e.target.value},
        },
      })
    );
  }

  // A function is used to submit the message (send email)
  /**
   * @param input means input information from the user
   */
  submit(input) {
    // if user didn't miss the required input content, send email req
    if (input.name !== '' && input.phone !== '' && input.email !== '' && input.comment !== '') {
      // need to put this to sendmail api
      const DATA = {
        comment: `<h3>姓名：${input.name}</h3>
                          <h3>手機：${input.phone}</h3>
                          <h3>Email：${input.email}</h3>
                          <h3>意見：${input.comment}</h3>`,
      };

      // put send mail in redux
      fetch('/api/v1/sendmail', {
        method: 'POST',
        body: JSON.stringify(DATA),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(() => {
        // set 送出成功 message to the button
        this.setState(
          update(this.state, {
            input: {
              name: {$set: ''},
              phone: {$set: ''},
              email: {$set: ''},
              comment: {$set: ''},
            },
            message: {$set: '送出成功'},
          }),
          () => {
            // return the 送出 message to let user know it's time that the system can send the msg
            setTimeout(() => {
              this.setState(
                update(this.state, {
                  message: {$set: '送出'},
                })
              );
            }, 2500);
          }
        );
      });
    } else {
      // set 欄位未完成 message to the button
      this.setState(
        update(this.state, {
          message: {$set: '欄位未完成'},
          messageClass: {$set: 'error'},
        }),
        () => {
          // return the 送出 message to let user know it's time that the system can send the msg
          setTimeout(() => {
            this.setState(
              update(this.state, {
                message: {$set: '送出'},
                messageClass: {$set: ''},
              })
            );
          }, 2500);
        }
      );
    }
  }

  // A function render the contact element
  /**
   * show the contact block and it's info
   */
  render() {
    const MESSAGE = this.state.message;
    const MESSAGE_CLASS = this.state.messageClass;

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
                <input
                  value={this.state.input.name}
                  onChange={e => {
                    this.nameChange(e);
                  }}
                />
                <div>電話</div>
                <input
                  type="tel"
                  value={this.state.input.phone}
                  onChange={e => {
                    this.phoneChange(e);
                  }}
                />
                <div>電子郵件</div>
                <input
                  type="email"
                  value={this.state.input.email}
                  onChange={e => {
                    this.emailChange(e);
                  }}
                />
              </div>
            </div>
            <div className="userInfoRight">
              <div className="comment">
                <div>意見</div>
                <textarea
                  value={this.state.input.comment}
                  onChange={e => {
                    this.commentChange(e);
                  }}
                  ref={input => {
                    this.comment = input;
                  }}
                />
              </div>
              <div className="submit">
                <button
                  onClick={() => {
                    this.submit(this.state.input);
                  }}
                >
                  <div className={MESSAGE_CLASS}>{MESSAGE}</div>
                </button>
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
