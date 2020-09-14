(function (html) {
  change()
  function change () {
    var w = html.clientWidth
    var size = 100 * (w / 750).toFixed(2)
    html.style.fontSize = size + 'px'
  }
})(document.documentElement)
