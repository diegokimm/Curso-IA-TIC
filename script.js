document.addEventListener("DOMContentLoaded", function () {
    const travelForm = document.getElementById("travelForm");
    const nameInput = document.getElementById("name");
    const countryInput = document.getElementById("country");
    const personCountriesList = document.getElementById("personCountries");
    const showDataBtn = document.getElementById("showDataBtn");
    const allDataSection = document.getElementById("allDataSection");
    const allDataOutput = document.getElementById("allDataOutput");

    let peopleData = {}; // Almacena las personas y sus países visitados

    travelForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const country = countryInput.value.trim();

        // Validar que los campos no estén vacíos
        if (!name || !country) {
            alert("Por favor, ingresa tanto el nombre como el país.");
            return;
        }

        // Si no existe el nombre en peopleData, inicializamos un arreglo de países
        if (!peopleData[name]) {
            peopleData[name] = [];
        }

        // Verificar que no haya más de 10 países para la misma persona
        if (peopleData[name].length >= 10) {
            alert(`${name} ya ha registrado los 10 países permitidos.`);
            return;
        }

        // Agregar el país a la lista de países de la persona
        peopleData[name].push(country);

        // Actualizar la visualización
        updatePersonList();

        // Limpiar los campos del formulario
        nameInput.value = '';
        countryInput.value = '';
    });

    showDataBtn.addEventListener("click", function () {
        // Mostrar los datos almacenados en el contenedor correspondiente
        allDataSection.style.display = "block"; // Mostrar la sección con los datos

        // Mostrar todos los datos de personas y países en formato organizado
        allDataOutput.textContent = JSON.stringify(peopleData, null, 2);
    });

    function updatePersonList() {
        personCountriesList.innerHTML = ''; // Limpiar lista actual

        for (let name in peopleData) {
            const personEntry = document.createElement("li");
            personEntry.classList.add("person-entry");

            const personName = document.createElement("h3");
            personName.textContent = name;

            const countryList = document.createElement("ul");
            peopleData[name].forEach(country => {
                const countryItem = document.createElement("li");
                countryItem.textContent = country;
                countryList.appendChild(countryItem);
            });

            personEntry.appendChild(personName);
            personEntry.appendChild(countryList);
            personCountriesList.appendChild(personEntry);
        }
    }
});
