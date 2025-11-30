//Pizza árkalkulátor
function calculatePrice() {
    let totalPrice = 0;

    // Méret árának lekérdezése
    const sizeElement = document.querySelector('input[name="size"]:checked');
    if (sizeElement) {
        totalPrice += parseInt(sizeElement.value);
    }

    // Szósz árának hozzáadása
    const sauceElement = document.getElementById('base');
    if (sauceElement) {
        totalPrice += parseInt(sauceElement.value);
    }

    // Feltétek árának hozzáadása
    const toppings = document.querySelectorAll('input[name="topping"]:checked');
    toppings.forEach(function(topping) {
        totalPrice += parseInt(topping.value);
    });

    // Eredmény kiírása
    const finalPriceElement = document.getElementById('finalPrice');
    if (finalPriceElement) {
        finalPriceElement.innerText = totalPrice;
    }
}

// SLIDER CSÍPŐSSÉG KIJELZŐ
function updateSpicinessDisplay(val) {
    const display = document.getElementById('spicinessValue');
    let text = "";
    if (val < 4) text = "Enyhe";
    else if (val < 8) text = "Közepes";
    else text = "Brutális";
    
    if (display) {
        display.innerText = `${text} (${val})`;
    }
}

// IDŐVÁLASZTÓ MEGJELENÍTÉSE & ELREJTÉSE
function toggleTimeSelector() {
    const checkbox = document.getElementById('immediateDelivery');
    const timeBox = document.getElementById('customTimeSelector');

    if (checkbox && timeBox) {
        if (checkbox.checked) {
            timeBox.style.display = 'none';
        } else {
            timeBox.style.display = 'block';
        }
    }
}

// ŰRLAP VALIDÁLÁS ÉS RENDELÉS
function validateForm(event) {
    event.preventDefault(); 

    let isValid = true;
    
    // Név ellenőrzése
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    
    if (nameInput) {
        if (nameInput.value.trim().length < 3) {
            nameError.innerText = "A névnek legalább 3 karakternek kell lennie!";
            nameError.style.display = "block";
            nameInput.style.border = "2px solid red";
            isValid = false;
        } else {
            nameError.style.display = "none";
            nameInput.style.border = "1px solid #ccc";
        }
}

    // Email ellenőrzése
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailValue = emailInput.value;

    if (emailInput) {
        if (!emailValue.includes('@') || !emailValue.includes('.')) {
            emailError.innerText = "Kérlek valós email címet adj meg!";
            emailError.style.display = "block";
            emailInput.style.border = "2px solid red";
            isValid = false;
        } else {
            emailError.style.display = "none";
            emailInput.style.border = "1px solid #ccc";
        }
}

    //Telefonszám ellenőrzése
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');

    // Csak számok lehetnek, legalább 9 karakter
    const phoneRegex = /^[0-9+]{9,}$/;  

    if (phoneInput) {
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneError.innerText = "Helyes telefonszámot adj meg (pl. 06301234567)!";
            phoneError.style.display = "block";
            phoneInput.style.border = "2px solid red";
            isValid = false;
        } else {
            phoneError.style.display = "none";
            phoneInput.style.border = "1px solid #ccc";
        }
    }

    //Cím ellenőrzése
    const addressInput = document.getElementById('address');
    const addressError = document.getElementById('addressError');

    if (addressInput) {
        if (addressInput.value.trim().length < 5) {
            addressError.innerText = "A cím túl rövid, kérlek pontosítsd!";
            addressError.style.display = "block";
            addressInput.style.border = "2px solid red";
            isValid = false;
        } else {
            addressError.style.display = "none";
            addressInput.style.border = "1px solid #ccc";
        }
    }

    //Feltétek ellenőrzése (Legalább 1 feltét)
    const checkedToppings = document.querySelectorAll('input[name="topping"]:checked');
    const toppingsContainer = document.querySelector('.checkbox-group.grid-layout');

    if (checkedToppings.length === 0) {
        // Ha nincs semmi kiválasztva
        alert("Kérlek válassz legalább egy feltétet a pizzádra!");
        if (toppingsContainer) {
            toppingsContainer.style.border = "2px solid red";
            toppingsContainer.style.padding = "10px";
        }
        isValid = false;
    } else {
        // Ha van választva, eltűnik a piros keret
        if (toppingsContainer) {
            toppingsContainer.style.border = "none"; 
        }
    }

    // Időpont logika
    const immediateCheckbox = document.getElementById('immediateDelivery');
    let veglegesIdopont = "";

    if (immediateCheckbox && immediateCheckbox.checked) {
        veglegesIdopont = "Azonnali szállítás (kb. 45 perc)";
    } else {
        const hour = document.getElementById('hour').value;
        const minute = document.getElementById('minute').value;
        const ampm = document.getElementById('ampm').value;
        veglegesIdopont = `${hour}:${minute} ${ampm}`;
    }

    if (!isValid) {
        return false;
    }

    // SIKERES RENDELÉS (Zöld ablak)
    const form = document.getElementById('pizzaForm');
    form.style.display = 'none';

    const finalPrice = document.getElementById('finalPrice').innerText;
    const mainContainer = document.querySelector('main.container');
    const successMessage = document.createElement('div');

    // Biztonsági ellenőrzés: ha nincs addressInput, nem írja ki, hogy undefined
    const addressDisplay = addressInput ? addressInput.value : "Az étteremben";
    
    successMessage.innerHTML = `
        <div style="text-align: center; padding: 40px; background: #e8f5e9; border-radius: 8px; border: 2px solid #4caf50; margin-top: 2rem;">
            <h2 style="color: #2e7d32; margin-bottom: 20px;">✅ Rendelésed sikeresen rögzítettük!</h2>
            <p style="font-size: 1.1rem;">Kedves <strong>${nameInput.value}</strong>, köszönjük a rendelést.</p>
            <p>Szállítási cím: <strong>${addressDisplay}</strong></p>
            <hr style="border: 0; border-top: 1px solid #a5d6a7; margin: 20px 0; width: 50%; margin-left: auto; margin-right: auto;">
            <div style="font-size: 1.1rem; color: #333;">
                <p><strong>Választott időpont:</strong><br> ${veglegesIdopont}</p>
                <p><strong>Fizetendő összeg:</strong><br> <span style="font-size: 1.8rem; color: #d35400; font-weight: bold;">${finalPrice} Ft</span></p>
            </div>
            <button onclick="location.reload()" class="btn" style="margin-top:20px; background-color: #4caf50;">Új rendelés leadása</button>
        </div>
    `;

    mainContainer.appendChild(successMessage);
    return true;
}

//SZÁMLÁLÓ, HÍRLEVÉL

// Hírlevél feliratkozás
function subscribeNewsletter(event) {
    event.preventDefault();
    alert("Köszönjük a feliratkozást! A kupont elküldtük emailben.");
}

// Dinamikus számláló animáció
// Csak akkor fut le, ha az oldal betöltött
document.addEventListener("DOMContentLoaded", function() {
    
    const counters = document.querySelectorAll('.counter-number');
    
    if (counters.length > 0) {
        // figyeli, hogy a számláló látható-e a képernyőn
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const speed = 40; // Minél nagyobb, annál lassabb
                    
                    const updateCount = () => {
                        const count = +counter.innerText; // hol tart most a számláló
                        const inc = target / speed; // increment

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 20); // Rekurzió, frissítési sebesség: 20 ezred másodperc
                        } else {
                            // Ha nagy szám, teszünk mögé +-t
                            counter.innerText = target + (target > 100 ? "+" : ""); 
                        }
                    };
                    updateCount();
                    observer.unobserve(counter); // Csak egyszer fusson le
                }
            });
        }, { threshold: 0.5 }); // Akkor indul, ha 50%-ban látszik

        counters.forEach(counter => {
            observer.observe(counter);
        }); // az observer a counters listát figyelje
    }
});