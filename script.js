const scriptURL = 'https://script.google.com/macros/s/あなたのGASのURL/exec'; // GASのURLに差し替え
const liffId = '2007744995-kMOg452M'; // LIFF IDに差し替え

document.addEventListener("DOMContentLoaded", async () => {
  await liff.init({ liffId });

  if (!liff.isLoggedIn()) {
    liff.login();
    return;
  }

  const profile = await liff.getProfile();
  const userName = profile.displayName;

  const form = document.getElementById('orderForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.username = userName;

    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(data)
      });

      alert("注文が送信されました！");
      liff.closeWindow();
    } catch (error) {
      alert("送信エラー：" + error);
    }
  });
});
