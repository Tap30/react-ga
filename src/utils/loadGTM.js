export default function (gaTrackingId, options) {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/
  /* eslint-disable */
  (function(w,d,s,l,i,k,m,g){
    w[l]=w[l]||[];
    w[g]=function(){w[l].push(arguments)};
    w[g]({'gtm.start':new Date().getTime(),event:'gtm.js'});
    w[g]('config', k);
    var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
    j.async=true;
    j.src=m+'?id='+i+dl;
    f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer', options && options.gtmTrackingId, gaTrackingId, options && options.gtmAddress ? options.gtmAddress : 'https://www.googletagmanager.com/gtm.js','gtag');
  /* eslint-enable */
}
