class Processor {
  static Process(data) {
    const lines = data.split('\n',);
    const rows = []

    lines.forEach((row) => {
      const arr = row.split(',');
      rows.push(arr);
    })

    return rows;
  }
}

export default Processor