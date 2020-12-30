/* eslint-disable no-console */
// const URL = 'http://localhost:3000';
const URL = 'https://ahj-7-1-helpdesk.herokuapp.com/';

document.forms.createTicket.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  formData.set('id', null);
  formData.set('method', 'createTicket');

  const xhr = new XMLHttpRequest();

  xhr.open('POST', URL);

  xhr.addEventListener('load', () => {
    if (xhr.status >= '200' && xhr.status < '300') {
      console.log(xhr.responseText);
    } else {
      console.error('Status:', xhr.status);
      console.error('Response text:', xhr.responseText);
    }
  });

  xhr.addEventListener('error', () => {
    console.error('Connection error!');
  });

  xhr.send(formData);
});

function createGETRequest({ method, id }) {
  const params = new URLSearchParams();

  params.append('method', method);
  if (id) params.append('id', id);

  const xhr = new XMLHttpRequest();

  xhr.open('GET', `${URL}/?${params}`);

  xhr.addEventListener('load', () => {
    if (xhr.status >= '200' && xhr.status < '300') {
      try {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error('Status:', xhr.status);
      console.error('Response text:', xhr.responseText);
    }
  });

  xhr.addEventListener('error', () => {
    console.error('Connection error!');
  });

  xhr.send();
}

document.getElementsByClassName('form__btn-get-by-id')[0]
  .addEventListener('click', (event) => {
    event.preventDefault();
    const id = document.getElementsByClassName('form__value-ticket-ID')[0].value;
    createGETRequest({ method: 'ticketById', id });
  });

document.getElementsByClassName('form__btn-get-all-tickets')[0]
  .addEventListener('click', (event) => {
    event.preventDefault();
    createGETRequest({ method: 'allTickets' });
  });
