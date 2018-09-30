export default function buildErrorMessage(error, prefix) {
    console.log(5555566666);
    let message = '';
    if (prefix) message += `${prefix} -> `;
    if (error instanceof Error || typeof error === 'string') {
      message += error;
    } else {
      message += JSON.stringify(error);
    }
    console.log(message);
    return message;
  }