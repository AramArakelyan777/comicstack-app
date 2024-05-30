const nodemailer = require("nodemailer");
const path = require("path");

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Account Activation on ComicStack",
            text: "",
            html: `
                <div style="background-image: url('cid:comicBackground'); background-size: cover; padding: 20px; font-family: Arial, sans-serif; color: #333;">
                    <div style="background-color: rgb(1, 0, 32); padding: 20px; border-radius: 10px; max-width: 600px; margin: auto;">
                        <h1 style="text-align: center; color: #e74c3c;">Welcome to ComicStack!</h1>
                        <p style="font-size: 16px; line-height: 1.5; color: white">
                            Thank you for joining ComicStack! We are thrilled to have you on board. To get started, please activate your account by clicking the link below:
                        </p>
                        <p style="font-size: 14px; line-height: 1.5; color: white">
                        Շնորհակալություն ComicStack-ին միանալու համար: Մենք ոգևորված ենք, որ դուք նավի վրա ենք: Սկսելու համար խնդրում ենք ակտիվացնել ձեր հաշիվը՝ սեղմելով ստորև նշված հղումը.
                    </p>
                        <div style="text-align: center; margin: 20px 0;">
                            <a href="${link}" style="background-color: #e74c3c; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                                Activate Your Account
                            </a>
                        </div>
                        <p style="font-size: 16px; line-height: 1.5; color: white">
                            <strong>About Us:</strong><br>
                            At ComicStack, we bring the best of the comic world to your fingertips. Explore a vast collection of your favorite comics, discover new ones, and connect with a community of comic enthusiasts. Dive into the adventures and let your imagination soar with ComicStack!
                        </p>
                        <p style="font-size: 14px; line-height: 1.5; color: white">
                            <strong>Մեր Մասին:</strong><br>
                            ComicStack-ը ձեզ տրամադրում է կոմիքսների ​​աշխարհի լավագույնը: Բացահայտեք ձեր սիրած կոմիքսների հսկայական հավաքածուն, հայտնաբերեք նորերը և կապվեք կոմիքսների սիրահարների համայնքի հետ: Սուզվեք արկածների մեջ և թույլ տվեք ձեր երևակայությունը ճախրել ComicStack-ի միջոցով:
                        </p>
                    </div>
                </div>
            `,
            attachments: [
                {
                    filename: 'comicBackground.jpg',
                    path: path.join(__dirname, '../assets/comicBackground.jpg'),
                    cid: 'comicBackground' // same cid value as in the html img src
                }
            ]
        });
    }
}

module.exports = new MailService();