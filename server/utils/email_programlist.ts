/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import Imap from 'imap';
const inspect = require('util').inspect;

class EmailService {
  constructor() {
    // nothing to do
  }

  /**
   * getEmailAttachment function is used to get email attachment
   * @param user google client id
   * @param password google client password
   * @returns get mail attachment status
   */
  static getMailAttachment(user, password): boolean {
    const mailServer = new Imap({
      user: user,
      password: password,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized: false,
      },
      authTimeout: 3000,
    }).once('error', function () {
      // need to do
    });
    const getInboxEmail = this.getInboxEmail;
    mailServer.once('ready', function () {
      mailServer.openBox('INBOX', true, function (err) {
        if (err) throw err;
      });

      getInboxEmail(mailServer);
    });

    mailServer.connect();

    return true;
  }

  /**
   * getInboxEmail function is used to get email inbox
   * @param mailServer mailServer
   * @returns get email is finshed or not
   */
  static getInboxEmail(mailServer: any): boolean {
    mailServer.openBox('INBOX', true, function (err) {
      if (err) throw err;

      const f = mailServer.seq.fetch('1:*', {
        bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
        struct: true,
      });

      f.on('message', function (msg, seqno) {
        // console.log('Message #%d', seqno);
        // const prefix = '(#' + seqno + ') ';

        msg.on('body', function (stream) {
          let buffer = '';

          stream.on('data', function (chunk) {
            buffer += chunk.toString('utf8');
          });

          stream.once('end', function () {
            // console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
          });
        });
      });

      f.once('error', function () {
        // console.log('Fetch error: ' + err);
      });

      f.once('end', function () {
        // console.log('Done fetching all messages!');
      });
    });

    return true;
  }

  /**
   * getEmailAttachment function is used to get email attachment details
   * @returns attachment list
   */
  static getAttachmentParts(attrs: any): string[] {
    const attr = attrs;
    attr;
    return ['attachment_file1', 'attachment_file2'];
  }

  /**
   * downloadAttachment function is used to download attachment
   * @param attachment attachment from mail
   * @returns UID
   */
  static downloadAttachment(attachment: any): string {
    const downloaded_attachment = attachment;
    downloaded_attachment;

    return 'UID';
  }

  /**
   * attachmentChecker function is used to check file named uid and move attachment to xls folder
   * @param attachment attachment from mail
   * @returns if attachment is downloaded ok
   */
  static attachmentChecker(uid: any): boolean {
    const file_uid = uid;
    file_uid;
    return true;
  }
}

export default EmailService;
