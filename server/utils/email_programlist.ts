/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import Imap from 'imap';
import fs from 'fs';
const {Base64Decode} = require('base64-stream');

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
        const prefix = '(#' + seqno + ') ';

        msg.on('body', function (stream) {
          let buffer = '';

          stream.on('data', function (chunk) {
            buffer += chunk.toString('utf8');
          });

          stream.once('end', function () {
            // console.log(prefix + 'Parsed header: %s', inspect(Imap.parseHeader(buffer)));
          });
        });
        msg.once('attributes', function (attrs) {
          const attachments = EmailService.getAttachmentParts(attrs.struct, []);
          for (let i = 0, len = attachments.length; i < len; ++i) {
            const attachment = attachments[i];
            const f = mailServer.fetch(attrs.uid, {
              //do not use imap.seq.fetch here
              bodies: [attachment.partID],
              struct: true,
            });
            //build function to process attachment message
            f.on('message', EmailService.downloadAttachment(attachment));
          }
        });
        msg.once('end', function () {
          // nothing to do
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

  // test download related function

  /**
   * getEmailAttachment function is used to get email attachment details
   * @returns attachment list
   */
  static getAttachmentParts(struct, attachments): any {
    attachments = attachments || [];
    for (let i = 0, len = struct.length, r; i < len; ++i) {
      if (Array.isArray(struct[i])) {
        this.getAttachmentParts(struct[i], attachments);
      } else {
        if (
          struct[i].disposition &&
          ['INLINE', 'ATTACHMENT'].indexOf(struct[i].disposition.type.toUpperCase()) > -1
        ) {
          attachments.push(struct[i]);
        }
      }
    }
    return attachments;
    return ['attachment_file1', 'attachment_file2'];
  }

  /**
   * downloadAttachment function is used to download attachment
   * @param attachment attachment from mail
   * @returns UID
   */
  static downloadAttachment(attachment: any): any {
    const filename = attachment.params.name;
    const encoding = attachment.encoding;

    return function (msg, seqno) {
      const prefix = '(#' + seqno + ') ';
      msg.on('body', function (stream, info) {
        //Create a write stream so that we can stream the attachment to file;
        const writeStream = fs.createWriteStream(process.cwd() + '/temp/' + filename);
        writeStream.on('finish', function () {
          // nothing to do
        });

        //stream.pipe(writeStream); this would write base64 data to the file.
        //so we decode during streaming using
        if (encoding.toUpperCase() === 'BASE64') {
          //the stream is base64 encoded, so here the stream is decode on the fly and piped to the write stream (file)
          stream.pipe(new Base64Decode()).pipe(writeStream);
        } else {
          //here we have none or some other decoding streamed directly to the file which renders it useless probably
          stream.pipe(writeStream);
        }
      });
      msg.once('end', function () {
        // nothing to do
      });
    };
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
