import Reader from './Reader.js';
import Processor from './Processor.js';
import Table from './Table.js';
import HtmlParser from './HtmlParser.js';
import Writer from './Writer.js';
import PDFDocument from 'html-pdf';
import PDFWriter from './PDFWriter.js';

const reader = new Reader();
const writer = new Writer();
const doc = new PDFWriter();


async function main() {
  const dataFile = await reader.read('./Users.csv')
  const dataProcessed = Processor.Process(dataFile);

  const users = new Table(dataProcessed);
  const html = await HtmlParser.Parse(users);

  writer.Write(Date.now() + '.html', html)
  doc(html)
  doc.pipe(fs.createWriteStream(Date.now() + '.PDF', html))
  doc.end()

}

main();

