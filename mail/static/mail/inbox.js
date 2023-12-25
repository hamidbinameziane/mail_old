document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  document.querySelector('#compose-form').onsubmit = send_email;

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#display-email').style.display = 'none'
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#display-email').style.display = 'none'
  document.querySelector('#display-email').innerHTML = ""
  

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;


  
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Print emails
      //console.log(emails);
      emails.forEach(element => {
        console.log(element);
        const divs = document.createElement('div');
        const divs2 = document.createElement('div');
        const spans = document.createElement('span');
        const spans2 = document.createElement('span');
        const spans3 = document.createElement('span');
        const spans4 = document.createElement('span');
        const spans5 = document.createElement('span');
        const spans6 = document.createElement('span');
        const spans7 = document.createElement('span');
        const spans8 = document.createElement('span');
        const spans9 = document.createElement('span');
        const spans10 = document.createElement('span');
        const spans11 = document.createElement('span');
        const div3 = document.createElement('div');
        const replay_b = document.createElement('button');
        spans.innerHTML = element.sender;
        spans.style.fontWeight = 'bold'
        divs.append(spans)
        spans2.innerHTML = element.subject;
        divs.append(spans2)
        spans3.innerHTML = element.timestamp;
        spans3.style.float = 'right';
        spans3.classList.add('text-muted')
        divs.append(spans3)
        if (element.read === true) {
          divs.style.backgroundColor = 'lightgray';

        }
        divs.addEventListener('click', function() {
          document.querySelector('#display-email').style.display = 'block'
          document.querySelector('#emails-view').style.display = 'none'
          fetch(`/emails/${element.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                read: true
            })
          })
          fetch(`/emails/${element.id}`)
          .then(response => response.json())
          .then(email => {
            spans4.innerHTML = 'From: ';
            spans4.style.fontWeight = 'bold'
            divs2.append(spans4)
            spans5.innerHTML = `${element.sender}<br>`;           
            divs2.append(spans5)
            spans6.innerHTML = 'To: ';
            spans6.style.fontWeight = 'bold'
            divs2.append(spans6)
            spans7.innerHTML = `${element.recipients}<br>`;           
            divs2.append(spans7)
            spans8.innerHTML = 'Subject: ';
            spans8.style.fontWeight = 'bold'
            divs2.append(spans8)
            spans9.innerHTML = `${element.subject}<br>`;           
            divs2.append(spans9)
            spans10.innerHTML = 'Timestamp: ';
            spans10.style.fontWeight = 'bold'
            divs2.append(spans10)
            spans11.innerHTML = `${element.timestamp}<br>`;           
            divs2.append(spans11)
            replay_b.innerHTML = 'Replay'
            replay_b.setAttribute('class', 'btn btn-sm btn-outline-primary');
            divs2.append(replay_b)
            div3.innerHTML = `<hr>${element.body}`;           
            divs2.append(div3)
            // Print email
            console.log(email);
            document.querySelector('#display-email').append(divs2);
              // ... do something else with email ...
          });
        });
        document.querySelector('#emails-view').append(divs);
        
      });
  
      // ... do something else with emails ...
  });
}

function send_email() {
  const rcps = document.querySelector('#compose-recipients').value;
  console.log(rcps);
  const sbjt = document.querySelector('#compose-subject').value;
  const bd = document.querySelector('#compose-body').value;
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: rcps,
        subject: sbjt,
        body: bd
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
  });
  load_mailbox('sent')
  return false;

}
