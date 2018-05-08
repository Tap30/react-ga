/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

export default function GoogleTagManagerIframe(props) {
  return (
    <noscript>
      <iframe
        title={'googleTagManagerIframe'}
        src={`https://${props.gtmHost}/ns.html?id=${props.gtmTrackingId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

GoogleTagManagerIframe.propTypes = {
  gtmHost: PropTypes.string,
  gtmTrackingId: PropTypes.string.isRequired
};

GoogleTagManagerIframe.defaultProps = {
  gtmHost: 'www.googletagmanager.com'
};
