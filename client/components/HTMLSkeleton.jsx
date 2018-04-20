import React from 'react';
import PropTypes from 'prop-types';

const HTMLSkeleton = ({manifest, title, children}) => (
  <html lang='pl'>
    <head>
      <meta charSet='UTF-8' />
      <title>{title}</title>  
    </head>

    <body>
      {children}
      {manifest && manifest['main.js'] && (
        <script src={manifest['main.js']} />
      )}
    </body>
  </html>
);

HTMLSkeleton.displayName = 'HTMLSkeleton';

HTMLSkeleton.propTypes = {
  title: PropTypes.string,
  manifest: PropTypes.objectOf(PropTypes.string),
};

HTMLSkeleton.defaultProps = {
  title: 'Test app',
  manifest: {},
};

export default HTMLSkeleton;

