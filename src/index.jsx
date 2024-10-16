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
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';

import React from 'react';
import ReactDOM from 'react-dom';

import { GymFooter as FooterSlot, GymHeader as Header } from '@openedx/gym-frontend';

import messages from './i18n';
import configureStore from './data/configureStore';

import './GymApp.scss';
import Head from './head/Head';

import AppRoutes from './routes/AppRoutes';

import {Intercom, boot, update } from "@intercom/messenger-js-sdk";

const INTERCOM_APP_ID = () => getConfig().INTERCOM_APP_ID;

subscribe(APP_READY, () => {
  if (INTERCOM_APP_ID()) {
    try {
      Intercom({app_id: INTERCOM_APP_ID()});

      const INTERCOM_SETTINGS = {
        email: getAuthenticatedUser().email,
        user_id: getAuthenticatedUser().username,
      }
    
      update(INTERCOM_SETTINGS);
    } catch (error) {
      logError(error);
    }
  }

  ReactDOM.render(
    <AppProvider store={configureStore()}>
      <Head />
      <Header secondaryNav="dashboard" activeLink="profile" />
      <main id="main">
        <AppRoutes />
      </main>
      <FooterSlot />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        COLLECT_YEAR_OF_BIRTH: process.env.COLLECT_YEAR_OF_BIRTH,
        ENABLE_SKILLS_BUILDER_PROFILE: process.env.ENABLE_SKILLS_BUILDER_PROFILE,
      }, 'App loadConfig override handler');
    },
  },
});
