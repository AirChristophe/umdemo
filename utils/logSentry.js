import Sentry from 'sentry-expo';
import buildErrorMessage from './buildErrorMessage';

export const logException = (e, pathname) => {
  const error = buildErrorMessage(e, pathname);
  return Sentry.captureException(error);
};
export const logError = (m, pathname) => {
    const error = buildErrorMessage(m, pathname);
    return Sentry.captureMessage(error);
};
export const logUser = (email) => {
    Sentry.setUserContext({ email });
};
