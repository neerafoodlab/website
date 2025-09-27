import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return <ContactForm />
}

export async function generateMetadata() {
  return {
    title: 'Contact Neera Food Lab - Get in Touch',
    description: 'Have questions about recipes or want to collaborate? Get in touch with Neera Food Lab. We\'d love to hear from you!',
    openGraph: {
      title: 'Contact Neera Food Lab - Get in Touch',
      description: 'Have questions about recipes or want to collaborate? Get in touch with us!',
      url: 'https://www.neerafoodlab.com/contact',
    },
  }
}
