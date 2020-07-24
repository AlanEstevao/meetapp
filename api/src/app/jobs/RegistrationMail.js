import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { organizer, meetup, user, formattedDate } = data;

    console.log('A fila executou');

    await Mail.sendMail({
      to: `${organizer.name} <${organizer.email}>`,
      subject: 'Nova inscrição',
      template: 'new_registration',
      context: {
        organizer: organizer.name,
        meetup: meetup.title,
        user: user.name,
        email: user.email,
        date: formattedDate,
      },
    });
  }
}

export default new RegistrationMail();
