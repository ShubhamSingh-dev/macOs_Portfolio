import { WindowControls } from "../components";
import windowWrapper from "../hoc/windowWrapper";
import useWindowStore from "../store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;
  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5 bg-white overflow-auto max-h-screen">
        <div className="flex flex-col lg:flex-row gap-6">
          {image ? (
            <div className="lg:w-2/5 shrink-0">
              <img
                src={image}
                alt={name}
                className="w-full h-auto rounded sticky top-0"
              />
            </div>
          ) : null}

          <div className="flex-1 space-y-6">
            {subtitle ? (
              <h3 className="text-lg font-semibold">{subtitle}</h3>
            ) : null}

            {Array.isArray(description) && description.length > 0 ? (
              <div className="space-y-3 leading-relaxed text-base text-gray-800">
                {description.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

const textWrapper = windowWrapper(Text, "txtfile");

export default textWrapper;
