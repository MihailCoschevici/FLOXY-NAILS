const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendContactEmail = async (formData, file) => {
  try {
    const msg = {
      to: 'info@floxynails.it', // Email di destinazione
      from: process.env.SENDGRID_FROM_EMAIL, // L'email verificata su SendGrid
      subject: `Nuovo Messaggio da ${formData.name} - ${formData.reason}`,
      html: `
        <h3>Hai ricevuto un nuovo messaggio dal sito!</h3>
        <p><strong>Nome:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Motivo:</strong> ${formData.reason}</p>
        <hr/>
        <p><strong>Messaggio:</strong></p>
        <p>${formData.message}</p>
        ${
          file && file.path
            ? `<p><strong>CV caricato:</strong> <a href="${file.path}" target="_blank">Apri CV</a></p>`
            : ''
        }
      `,
    };

    await sgMail.send(msg);
    console.log('✅ Email inviata con successo.');
    
  } catch (error) {
    console.error('--- ❌ ERRORE DA SENDGRID ---');
    if (error.response) {
      console.error(error.response.body);
    } else {
      console.error(error.message);
    }
    throw new Error('Errore durante l’invio dell’email.');
  }
};

module.exports = { sendContactEmail };