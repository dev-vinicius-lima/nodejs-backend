import fs from 'fs';
import util from 'util';

class Writer {
  constructor() {
    this.writer = util.promisify(fs.writeFile);
  }

  async Write(filename, data) {
    try {
      return await this.writer(filename, data)
      return true
    } catch (error) {
      console.log(error);
      return false
    }
  }
}

export default Writer