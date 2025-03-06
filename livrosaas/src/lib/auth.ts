// lib/auth.ts
import nodemailer from "nodemailer"

export async function sendPasswordResetEmail(email: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const resetLink = `https://seusite.com/reset-password?token=seu-token-aqui`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Recuperação de Senha",
        html: `<p>Clique no link abaixo para redefinir sua senha:</p><a href="${resetLink}">${resetLink}</a>`,
    });
}