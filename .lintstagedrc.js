module.exports = {
  'features/**/*.js?(x)': (filenames) =>
    `next lint --no-cache --fix --file ${filenames
      .map((file) => file.split(process.cwd())[1])
      .join(' --file ')}`,
}