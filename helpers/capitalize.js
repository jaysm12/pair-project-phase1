module.exports = (str) => {
  let misal = str.split('_').map((one) => one.charAt(0).toUpperCase() + one.substr(1)).join(' ')
  console.log(misal);
  return misal
}