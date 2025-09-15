export interface MessagesInterface {
  [key: string]: { [key: string]: string };
}

export const messages: MessagesInterface = {
  error: {
    canceled: "The request was canceled.",
    serverError: "A server error occurred. Please try again later.",
    notFound: "The requested resource could not be found.",
    unauthorized: "You are not authorized. Please log in again.",
    timeout: "The request timed out. Please try again.",
    noInternet: "No internet connection. Please check your network.",
    unexpected: "An unexpected error occurred. Please try again.",
  },
  success: {
    default: "Action completed successfully.",
    saved: "Your changes have been saved.",
    deleted: "Item has been deleted successfully.",
    updated: "Update completed successfully.",
  },
  info: {
    loading: "Loading, please wait...",
  },
  warning: {
    unsaved: "You have unsaved changes.",
  },
};
