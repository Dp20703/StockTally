import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ─── Transporter ──────────────────────────────────────────────────────── */
const createTransporter = () =>
    nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,   // Gmail → use App Password, not account password
        },
    });

/* ─── Template engine (no dependencies) ───────────────────────────────── */
/**
 * Reads an HTML template and replaces {{key}} placeholders with values.
 * @param {string} templateName  filename inside /templates/  (e.g. "welcomeEmail.html")
 * @param {Record<string,string>} variables  key-value pairs to inject
 * @returns {string} rendered HTML
 */
const renderTemplate = (templateName, variables = {}) => {
    const templatePath = path.join(__dirname, "../templates", templateName);
    let html = fs.readFileSync(templatePath, "utf-8");

    Object.entries(variables).forEach(([key, value]) => {
        const regex = new RegExp(`{{${key}}}`, "g");
        html = html.replace(regex, value ?? "");
    });

    return html;
};

/* ─── Generic send helper ──────────────────────────────────────────────── */
/**
 * @param {{ to: string, subject: string, html: string, text?: string }} options
 */
export const sendEmail = async ({ to, subject, html, text }) => {
    const transporter = createTransporter();

    const info = await transporter.sendMail({
        from: `"StockTally" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]+>/g, ""), // fallback plain-text
    });

    console.log(`[Mailer] Email sent → ${to} | msgId: ${info.messageId}`);
    return info;
};

/* ─── Welcome email ────────────────────────────────────────────────────── */
/**
 * Sends the welcome / registration confirmation email.
 *
 * @param {{
 *   to:        string,
 *   firstName: string,
 *   fullName:  string,
 *   userName:  string,
 *   email:     string,
 * }} params
 */
export const sendWelcomeEmail = async ({ to, firstName, fullName, userName, email, }) => {
    const html = renderTemplate("welcomeEmail.html", {
        firstName,
        fullName,
        userName,
        email,
        registeredAt: new Date().toLocaleString("en-IN", {
            dateStyle: "long",
            timeStyle: "short",
            timeZone: "Asia/Kolkata",
        }),
        dashboardUrl: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/trade/dashboard` : "#",
        supportUrl: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/support` : "#",
        privacyUrl: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/privacy` : "#",
        unsubscribeUrl: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/unsubscribe` : "#",
        year: String(new Date().getFullYear()),
    });

    return sendEmail({
        to,
        subject: `Welcome to StockTally, ${firstName}! 🎉`,
        html,
    });
};
