// Return `hh:mm`
export const getFormattedTime = (date) =>
    date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })
