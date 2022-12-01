// Import stylesheets
import './style.css';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');
// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  await liff.init({ liffId: '1657675439-MjwR4rAY' });

  if (!liff.isLoggedIn()) {
    const destinationUrl = window.location.href;
    liff.login({ redirectUri: destinationUrl });
  }
  const urlParams = new URLSearchParams(window.location.search);
  const paramter = urlParams.get('param');
  const name_p = urlParams.get('name');
  console.log(paramter);
  console.log(name_p);
  // otp = document.querySelector('#result').append(urlParams.get('param'));
  // document.querySelector('#otp').append(urlParams.get('param'));
  // document.querySelector('#result2').append(urlParams.get('name'));
  liff.ready.then(() => {
    if (liff.getOS() === 'android') {
      body.style.backgroundColor = '#d1f5d3';
    }
    if (!liff.isInClient()) {
      if (liff.isLoggedIn()) {
        btnLogIn.style.display = 'none';
        btnLogOut.style.display = 'block';
        btnShare.style.display = 'block';
        getUserProfile();
      } else {
        btnLogIn.style.display = 'block';
        btnLogOut.style.display = 'none';
      }
    } else {
      btnSend.style.display = 'block';
      btnShare.style.display = 'block';
      getUserProfile();
    }
  });

  // 1.Initialize LIFF app)
  await liff.init({ liffId: '1657675439-MjwR4rAY' });

  if (liff.isInClient() && liff.getOS() === 'android') {
    btnScanCode.style.display = 'block';
  }
  btnOpenWindow.style.display = 'block';
}
main();

async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
  email.innerHTML = '<b>email:</b> ' + liff.getDecodedIDToken().email;
}

async function sendMsg() {
  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'text',
        text: 'This message was sent by sendMessages()',
      },
    ]);
    alert('Message sent');
  }
}
btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};
btnSend.onclick = () => {
  sendMsg();
};

async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: 'image',
      originalContentUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
      previewImageUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
    },
  ]);
}

btnShare.onclick = () => {
  shareMsg();
};

async function scanCode() {
  const result = await liff.scanCode();
  code.innerHTML = '<b>Code: </b>' + result.value;
}
btnScanCode.onclick = () => {
  scanCode();
};
btnOpenWindow.onclick = () => {
  getData();
};
function getData() {
  const http = new XMLHttpRequest();

  http.open('GET', 'https://171.100.141.54:5001/api/Otp/GetAllOtp');
  http.send();

  http.onload = () => console.log(http.responseText);
}
