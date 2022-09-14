/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import Imap from 'imap';
import fs from 'fs';
import ProgramlistLoader from './program_list_loader_service';
import Common from './common';

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
  static async getMailAttachment(
    user: string,
    password: string,
    temp_path: string,
    uidList?: string[]
  ): Promise<string[]> {
    return new Promise<string[]>(resolve => {
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
      }).once('error', function (err) {
        // need to do
      });
      const getInboxEmail = this.getInboxEmail;
      let uid;
      mailServer.once('ready', async () => {
        mailServer.openBox('INBOX', true, async err => {
          if (err) throw err;
        });

        uid = await getInboxEmail(mailServer, uidList, temp_path);
      });

      mailServer.connect();
    });
  }

  /**
   * getInboxEmail function is used to get email inbox
   * @param mailServer mailServer
   * @returns get email is finshed or not
   */
  static async getInboxEmail(
    mailServer: any,
    uidList: string[],
    temp_path: string
  ): Promise<string[]> {
    return new Promise<string[]>(resolve => {
      mailServer.openBox('INBOX', true, function (err) {
        if (err) throw err;

        // set 'SINCE' date
        const currentDate = new Date();
        const dateBeforeOneWeek = currentDate.setDate(currentDate.getDate() - 7);

        // get email in a week
        mailServer.search([['ALL'], ['SINCE', dateBeforeOneWeek]], function (err, results) {
          if (err) throw err;

          const f = mailServer.fetch(results, {
            bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
            struct: true,
          });

          f.on('message', function (msg) {
            msg.once('attributes', function (attrs) {
              if (uidList.includes(attrs.uid)) {
                // do nothing
              } else {
                // fetch and download attachment
                const attachments = EmailService.getAttachmentParts(attrs.struct, []);
                for (let i = 0, len = attachments.length; i < len; ++i) {
                  const attachment = attachments[i];
                  const f = mailServer.fetch(attrs.uid, {
                    //do not use imap.seq.fetch here
                    bodies: [attachment.partID],
                    struct: true,
                  });
                  //build function to process attachment message
                  f.on(
                    'message',
                    EmailService.downloadAttachment(attachment, attrs.uid, temp_path)
                    // download 全數完成再回傳 (如何判斷cron job 已經執行完成)
                  );
                }
                // push uidList
                uidList.push(attrs.uid);
              }
            });

            msg.once('end', () => {
              // console.log(prefix + 'Finished');
            });
          });

          f.once('error', err => {
            // console.log('Fetch error: ' + err);
          });

          f.once('end', () => {
            mailServer.end();
            resolve(uidList);
          });
        });
      });
    });
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
  }

  /**
   * downloadAttachment function is used to download attachment
   * @param attachment attachment from mail
   * @returns UID
   */
  static downloadAttachment(attachment: any, uid: string, temp_path: string): any {
    const filename = attachment.params.name;

    // const fileExtension =
    //   filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;

    const encoding = attachment.encoding;

    return function (msg) {
      msg.on('body', function (stream) {
        let writeStream;
        //Create a write stream so that we can stream the attachment to file;
        if (filename.includes('.xls')) {
          // deal with xls file
          writeStream = fs.createWriteStream(temp_path + uid + '.xls');

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
        }
      });

      msg.once('end', function () {
        // one attachment is downloaded
      });
    };
  }

  /**
   * attachmentChecker function is used to check file named uid and move attachment to xls folder
   * @param attachment attachment from mail
   * @returns if attachment is downloaded ok
   */
  static async attachmentChecker(temp_path: string, xls_path: string): Promise<boolean> {
    return new Promise<boolean>(async resolve => {
      const programlist = await ProgramlistLoader.getLatestProgramListWithCurrentTempFile(
        temp_path
      );

      // get file's first column
      const filename = (
        await Common.getFormatedDate(new Date(programlist.list[0]['PlayTime'] + ' UTC'), 'YYYYMMDD')
      ).toString();

      // copy file to xls folder
      fs.copyFile(
        temp_path + programlist.currentWeekTempFile,
        xls_path + filename + 'chinasuntv.xls',
        err => {
          if (err) throw err;
          // console.log('File was copied to destination');
        }
      );

      resolve(true);
    });
  }
}

export default EmailService;
