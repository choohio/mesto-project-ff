export const renderLoading = (isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') => {
  button.textContent = isLoading ? loadingText : buttonText;
};

export function handleSubmit(request, evt, loadingText = 'Сохранение...') {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch(err => console.log(err))
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}