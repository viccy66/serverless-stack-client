import * as Sentry from "@sentry/browser";

const isLocal = process.env.NODE_ENV === "development";

export function initSentry() {
  if (isLocal) {
    return;
  }

  Sentry.init({dsn: "https://4741c84b6f034f5da3b0dda1c1edb605@o417672.ingest.sentry.io/5318699"});
}

export function logError(error, errorInfo = null) {
  if (isLocal) {
    return;
  }

  Sentry.withScope((scope) => {
    errorInfo && scope.setExtras(errorInfo);
    Sentry.captureException(error);
  });
}

/*
export function onError(error) {
  let message = error.toString();
  
  // Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }
  
  alert(message);
}*/

export function onError(error) {
  let errorInfo = {};
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    errorInfo = error;
    message = error.message;
    error = new Error(message);
    // API errors
  } else if (error.config && error.config.url) {
    errorInfo.url = error.config.url;
  }

  logError(error, errorInfo);

  console.log("______________", error, "______________");
  alert(message);
}