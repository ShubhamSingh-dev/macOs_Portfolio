import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import WindowFrame from "../WindowFrame";

const Contact = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      link: "https://github.com/shubham-singh",
      color: "bg-gray-800",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      link: "https://linkedin.com/in/shubham-singh",
      color: "bg-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      link: "https://twitter.com/shubham_singh",
      color: "bg-sky-500",
    },
    {
      name: "Email",
      icon: Mail,
      link: "mailto:hello@shubham-singh.com",
      color: "bg-red-500",
    },
  ];

  return (
    <WindowFrame id="contact" title="Contact Me" defaultWidth={500} defaultHeight={400}>
      <div className="h-full bg-white dark:bg-[#1e1e1e] flex flex-col items-center justify-center p-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4 overflow-hidden">
            <img src="/images/avatar.jpg" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Shubham Singh</h2>
          <p className="text-gray-500 dark:text-gray-400">Full Stack Developer</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${social.color} text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg`}
            >
              <social.icon className="w-6 h-6" />
              <span className="font-medium text-sm">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
};

export default Contact;
