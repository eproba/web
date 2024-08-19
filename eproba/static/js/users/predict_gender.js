async function predict_gender(name) {
    const response = await fetch(`https://api.genderize.io/?name=${name}&country_id=PL`);
    const data = await response.json();
    return data.gender;
}

document.addEventListener('DOMContentLoaded', function () {
    let firstNameInput
    let genderSelect
    try {
        firstNameInput = document.getElementById('id_first_name');
        genderSelect = document.getElementById('id_gender');
    } catch (e) {
        return; // This page doesn't have the required elements
    }

    let genderManuallySet = genderSelect.value !== "";


    firstNameInput.addEventListener('change', async function () {
            if (genderManuallySet) {
                return;
            }
            genderSelect.parentElement.classList.add('is-loading');
            const name = firstNameInput.value;
            try {
                const gender = await predict_gender(name);
                if (!genderManuallySet) { // Check again, because it could have been set while waiting for the response
                    genderSelect.value = gender === "male" ? "0" : "1";
                }
            } catch (e) {
                console.error(e);
            }
            genderSelect.parentElement.classList.remove('is-loading');
        }
    );


    genderSelect.addEventListener('change', function () {
        genderManuallySet = true;
    });

    if (firstNameInput.value !== "") {
        firstNameInput.dispatchEvent(new Event('change'));
    }

});