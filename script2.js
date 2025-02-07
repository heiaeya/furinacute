// Konstanta dan variabel umum
const RESOURCE_PER_ROLL = 160; // Resource 2 dan 3, 1 roll = 160
const DAILY_BONUS_PER_DAY = 60; // Daily mission, 60 resource per hari
const STARDUST_EXCHANGE_BONUS = 5; // Stardust exchange, 5 setiap bulan
const SPIRAL_ABYSS_BONUS = 800; // Spiral Abyss, 800 setiap tanggal 16
const WELKIN_BLESSING_PER_DAY = 90; // Blessing of the Welkin, 90 primogems per hari
const IMAGINARIUM_THEATER_BONUS = 800; // Imaginarium Theater, 800 setiap tanggal 1

// Fungsi untuk menghitung roll dari resource
function calculateRolls(resource) {
    return Math.floor(resource / RESOURCE_PER_ROLL);
}

// Fungsi utama untuk perhitungan
function calculateResults() {
    const resource2 = parseInt(document.getElementById("resource2").value) || 0;
    const resource3 = parseInt(document.getElementById("resource3").value) || 0;
    const resource4 = parseInt(document.getElementById("resource4").value) || 0;

    const dailyCheckbox = document.getElementById("dailyCheckbox");
    const stardustCheckbox = document.getElementById("stardustCheckbox");
    const spiralAbyssCheckbox = document.getElementById("spiralAbyssCheckbox");
    const welkinCheckbox = document.getElementById("welkinCheckbox");
    const imaginariumTheaterCheckbox = document.getElementById("imaginariumTheaterCheckbox");
    const customDateInput = document.getElementById("customDate");

    const today = new Date(); // Tanggal hari ini
    const selectedDate = new Date(customDateInput.value); // Tanggal yang dipilih oleh user

    // Validasi input tanggal
    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
        alert("Pilih tanggal yang valid dan tidak kurang dari hari ini.");
        return;
    }

    // Hitung total resource awal
    const totalResourceBefore = resource2 + resource3 + (resource4 * RESOURCE_PER_ROLL);
    let dailyBonus = 0;
    let stardustBonus = 0;
    let spiralAbyssBonus = 0;
    let welkinBonus = 0;
    let imaginariumTheaterBonus = 0;

    // Hitung daily mission jika dicentang
    if (dailyCheckbox.checked) {
        const diffInTime = selectedDate.getTime() - today.getTime();
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // Selisih hari
        dailyBonus = DAILY_BONUS_PER_DAY * diffInDays;
    }

    // Hitung stardust exchange jika dicentang
    if (stardustCheckbox.checked) {
        const diffInMonths = (selectedDate.getFullYear() - today.getFullYear()) * 12 +
            (selectedDate.getMonth() - today.getMonth());
        stardustBonus = STARDUST_EXCHANGE_BONUS * (diffInMonths + 1);
    }

    // Hitung Spiral Abyss jika dicentang
    if (spiralAbyssCheckbox.checked) {
        let spiralCount = 0;
        const currentDate = new Date(today);

        // Iterasi dari hari ini ke selected date
        while (currentDate <= selectedDate) {
            if (currentDate.getDate() >= 15) {
                spiralCount++;
                currentDate.setMonth(currentDate.getMonth() + 1);
                currentDate.setDate(15);
            } else {
                currentDate.setDate(15); // Lompat ke tanggal 16 di bulan ini
            }
        }
        spiralAbyssBonus = spiralCount * SPIRAL_ABYSS_BONUS;
    }

    // Hitung Blessing of the Welkin jika dicentang
    if (welkinCheckbox.checked) {
        const diffInTime = selectedDate.getTime() - today.getTime();
        const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // Selisih hari
        welkinBonus = WELKIN_BLESSING_PER_DAY * diffInDays;
    }

    // Hitung Imaginarium Theater jika dicentang
    if (imaginariumTheaterCheckbox.checked) {
        let imaginariumCount = 0;
        const currentDate = new Date(today);

        // Iterasi dari hari ini ke selected date
        while (currentDate <= selectedDate) {
            if (currentDate.getDate() >= 1) {
                imaginariumCount++;
                currentDate.setMonth(currentDate.getMonth() + 1);
                currentDate.setDate(1);
            } else {
                currentDate.setDate(1); // Lompat ke tanggal 1 di bulan ini
            }
        }
        imaginariumTheaterBonus = imaginariumCount * IMAGINARIUM_THEATER_BONUS;
    }

    // Total resource akhir
    const totalResourceAfter = totalResourceBefore + dailyBonus + welkinBonus + imaginariumTheaterBonus;
    const totalRollsAfter = calculateRolls(totalResourceAfter) + stardustBonus + (spiralAbyssBonus / RESOURCE_PER_ROLL) + (imaginariumTheaterBonus / RESOURCE_PER_ROLL);

    // Update output di HTML
    document.getElementById("totalResourceBefore").innerText = `${totalResourceBefore} (${calculateRolls(totalResourceBefore)} pull)`;
    document.getElementById("totalRollsAfter").innerText = `${totalRollsAfter.toFixed(0)} pull`;
    document.getElementById("dailyBonus").innerText = `+${dailyBonus} (${calculateRolls(dailyBonus)} pull)`;
    document.getElementById("stardustBonus").innerText = `+${stardustBonus} pull`;
    document.getElementById("spiralAbyssBonus").innerText = `+${spiralAbyssBonus} (${calculateRolls(spiralAbyssBonus)} pull)`;
    document.getElementById("welkinBonus").innerText = `+${welkinBonus} (${calculateRolls(welkinBonus)} pull)`;
    document.getElementById("imaginariumTheaterBonus").innerText = `+${imaginariumTheaterBonus} (${calculateRolls(imaginariumTheaterBonus)} pull)`;
}
