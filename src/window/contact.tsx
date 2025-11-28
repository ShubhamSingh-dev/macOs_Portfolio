import windowWrapper from "../hoc/windowWrapper";
import { socials } from "../constants";
import { WindowControls } from "../components";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2 className="font-bold text-sm text-center w-full text-gray-700 dark:text-gray-300">Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src="/images/adrian.jpg"
          alt="adrian"
          className="w-20 rounded-full"
        />

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Lets Connect</h3>
        <p className="text-gray-700 dark:text-gray-300">Got an Idea? A bug to report? Just want to say hi? Im in.</p>
        <p className="text-gray-700 dark:text-gray-300">mine.shubhamsingh@gmail.com</p>

        <ul className="flex items-center gap-3 p-5">
          {socials.map(({ id, text, icon, bg, link }) => (
            <li
              key={id}
              ref={(el) => {
                if (el) el.style.backgroundColor = bg;
              }}
              className="rounded-lg p-3 w-60 hover:-translate-y-0.5 hover:scale-105 origin-center transition-all duration-300 shadow-md"
            >
              <a href={link} target="_blank" rel="noopener noreferrer" className="space-y-5 block">
                <img src={icon} alt={text} className="size-5" />
                <p className="font-semibold text-sm text-white">{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const contactWrapper = windowWrapper(Contact, "contact");

export default contactWrapper;
