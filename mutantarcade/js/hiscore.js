var hiscore = {};

hiscore.upload = function(name, email, score, func) {
  let n = encodeURIComponent(name);
  let e = encodeURIComponent(email);
  let s = parseInt(score);
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      let res = null;
      if (this.status == 200)
        res = this.responseText;
      func(res);
    }
  };
  xmlhttp.open("POST", "hiscore.php", true);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send("&n="+n+"&e="+e+"&s="+s);
}

hiscore.download = function(email, page, func) {
  let e = encodeURIComponent(email);
  let p = parseInt(page);
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      let res = null;
      if (this.status == 200)
        res = this.responseText;
      func(res);
    }
  };
  xmlhttp.open("GET", "hiscore.php?p="+p+"&e="+e, true);
  xmlhttp.setRequestHeader("Content-Type", "text/xml");
  xmlhttp.send();
}
