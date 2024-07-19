import fs from 'fs';
import util from 'util';


class Reader {
  constructor() {
    this.reader = util.promisify(fs.readFile);
  }
  async read(filePath) {
    try {
      return await this.reader(filePath, 'utf8')
    } catch (error) {
      console.log(error);
    }
  }
}

export default Reader