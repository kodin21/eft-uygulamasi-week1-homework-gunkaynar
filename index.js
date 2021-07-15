import { getElementsByTagName } from "domutils";
import { Account } from "./Account";

let buton;

const accounts = [
    new Account("Hesap1", 1200),
    new Account("Hesap2", 2000),
    new Account("Hesap3", 100),
    new Account("Hesap4", 50)
]
accounts.forEach(account => {
    let acc = document.createElement("option");
    acc.innerText = `${account.name}: ${account.money}$`

    document.getElementById("accounts").append(acc);
})


let date = new Date(Date.now()+120000);
setInterval(() => {
    let now = new Date();
    let diff = new Date(date - now);

    document.getElementById("timer").innerText = `${diff.getMinutes()}:${diff.getSeconds()}`

    if (diff.getMinutes() <= 0 && diff.getSeconds() <= 0) {
        alert("Oturumunuz sonlanmıştır, lütfen tekrar deneyiniz!");
        window.location.reload();
    }
}, 1000)

function update() {
    let val = document.getElementById('accounts').value;
    let money = val.split(" ")[1];
    
    money = money.substring(0, money.length - 1);

    money = parseInt(money);

    let kacPara = document.getElementById("kacpara").value;

    if(money < kacPara){
        document.getElementById("button").disabled = true;
    }
    else {
        if(document.getElementById("iban").value != "" && document.getElementById("kacpara").value != ""){
            document.getElementById("button").disabled = false;
        } else if (document.getElementById("iban").value == "" || document.getElementById("kacpara").value == "" || buton) {
            document.getElementById("button").disabled = true;
        }
    }   
}



document.getElementById("iban").onkeyup = function() {
    update();
}

document.getElementById("kacpara").onkeyup = function() {
    update();
}

function updateAccounts() {

}

updateAccounts();

document.getElementById('accounts').onchange = update;

document.getElementById("button").onclick = paraGonder;

let deneme = 0;

function paraGonder(){
    let para = document.getElementById("kacpara").value
    if(para <= 500) {
        alert("Para gönderimi başarılı");
    location.reload();
    }
    else {
        date = new Date(Date.now()+120000);
        let ui = document.createElement("input");
        ui.type = "text"
        ui.maxLength = 4;
        document.getElementsByTagName("body")[0].append(ui)

        ui.onkeyup = function(e)  {
            let kod = ui.value;

            if (e.keyCode == 13) {

                if(kod=="1234"){
                    alert("Para gönderimi başarılı")
                    location.reload();
                }
                else{
                    if (deneme == 3) {
                        alert("Hesabınız bloke olmuştur!")

                    } else {
                        alert("Yanlış kod girdiniz.")
                        deneme++;
                    }
                    
                }
            }

        }

        //let kod = prompt("Telefonunuza gelen kodu giriniz");

    }   
}