import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR,
  APP_READY,
  getConfig,
  initialize,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import {
  AppProvider,
  ErrorPage,
} from '@edx/frontend-platform/react';

import React from 'react';
import ReactDOM from 'react-dom';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Helmet } from 'react-helmet';

import appMessages from './i18n';
import configureStore from './data/configureStore';

import './index.scss';
import messages from './head/messages';


import GymSettings, { GymFooter, GymHeader } from './gym-frontend-components';
const timestamp = Date.now();
const settings = await GymSettings;
const root = settings.urls.root; // should be same as marketing URL
const config = getConfig();
const css = `${root}${settings.css.mfe}?${timestamp}`;
const title = `Profile | ${getConfig().SITE_NAME}`;

import AppRoutes from './routes/AppRoutes';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <Helmet>
        <title>Profile</title>
        <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
        <link rel="stylesheet" href={css} />
      </Helmet>
      <GymHeader secondaryNav="dashboard" activeLink="profile" />
      <main>
        <div className="container">
          <AppRoutes />
        </div>
      </main>
      <GymFooter />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    appMessages
  ],
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        COLLECT_YEAR_OF_BIRTH: process.env.COLLECT_YEAR_OF_BIRTH | false,
        ENABLE_SKILLS_BUILDER_PROFILE: process.env.ENABLE_SKILLS_BUILDER_PROFILE | false,
      }, 'App loadConfig override handler');
    },
  },
});
