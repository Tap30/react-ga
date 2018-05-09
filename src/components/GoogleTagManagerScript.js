/* eslint-disable react/jsx-filename-extension,max-len,react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

export const getGoogleTagManagerScript = (gtmHost, gtmTrackingId) => `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://${gtmHost}/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmTrackingId}');`;

export default function GoogleTagManagerScript(props) {
  return (
    <script dangerouslySetInnerHTML={{ __html: getGoogleTagManagerScript(props.gtmHost, props.gtmTrackingId) }} />
  );
}

GoogleTagManagerScript.propTypes = {
  gtmHost: PropTypes.string,
  gtmTrackingId: PropTypes.string.isRequired
};

GoogleTagManagerScript.defaultProps = {
  gtmHost: 'www.googletagmanager.com'
};
