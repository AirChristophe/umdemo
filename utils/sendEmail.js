export default async function sendEmail(datas) {
    return await fetch(
        'https://www.toutemapharmacie.com/public/scan/new2.php', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: datas.email,
            firstname: datas.firstname,
            lastname: datas.lastname,
            secu: datas.secu,
            phone: datas.phone,
            comment: datas.comment, 
            pregnant: datas.pregnant, 
            breastfeed: datas.breastfeed, 
            pharmacie: datas.pharmacie, 
            url: datas.url
          })
        }
      );
      if (response.status !== 200) {
        throw new Error(`Got back HTTP status ${response.status}`);
      }
}

