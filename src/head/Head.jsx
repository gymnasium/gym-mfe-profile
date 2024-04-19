import React from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import { timestamp } from '@edx/gym-frontend';

import messages from './messages';

const getBaseUrl = () => getConfig().MARKETING_SITE_BASE_URL;
const getSiteName = () => getConfig().SITE_NAME;
const getFaviconUrl = () => getConfig().FAVICON_URL;
const getStyles = () => `${getBaseUrl()}/css/mfe.css?${timestamp}`;

const Head = ({ intl }) => (
  <Helmet>
    <title>
      {intl.formatMessage(messages['profile.page.title'], { siteName: getSiteName() })}
    </title>
    <link rel="shortcut icon" href={ getFaviconUrl() } type="image/x-icon" />
    <link rel="stylesheet" href={ getStyles() } />
  </Helmet>
);

Head.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Head);
