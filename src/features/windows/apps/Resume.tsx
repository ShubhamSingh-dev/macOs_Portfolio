import WindowFrame from "../WindowFrame";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const Resume = () => {
  return (
    <WindowFrame id="resume" title="Resume.pdf" defaultWidth={600} defaultHeight={800}>
      <div className="h-full bg-gray-100 dark:bg-gray-900 flex justify-center overflow-y-auto p-8">
        <Document file="/resume.pdf" className="shadow-2xl">
          <Page pageNumber={1} scale={1.0} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </div>
    </WindowFrame>
  );
};

export default Resume;
