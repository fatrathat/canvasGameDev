const a={canvas:document.querySelector("#myCanvas")},t=a.canvas.getContext("2d");let e=a.canvas.width/2,c=a.canvas.height-30,h=2,n=-2,l=(a.canvas.width-75)/2;setInterval((()=>{t.clearRect(0,0,a.canvas.width,a.canvas.height),t.beginPath(),t.arc(e,c,10,0,2*Math.PI),t.fillStyle="#0095DD",t.fill(),t.closePath(),t.beginPath(),t.rect(l,a.canvas.height-10,75,10),t.fillStyle="#0095DD",t.fill(),t.closePath(),(e+h>a.canvas.width-10||e+h<10)&&(h=-h),(c+n>a.canvas.height-10||c+n<10)&&(n=-n),e+=h,c+=n}),10);
//# sourceMappingURL=index.7d023e9c.js.map