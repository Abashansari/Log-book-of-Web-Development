document.getElementById('nameMode').addEventListener('change', function () {
    document.getElementById('locationSelect').style.display = 'block'; 
    document.getElementById('coordinateInputs').style.display = 'none'; 
});

document.getElementById('coordinateMode').addEventListener('change', function () {
    document.getElementById('locationSelect').style.display = 'none'; 
    document.getElementById('coordinateInputs').style.display = 'block'; 
});


document.getElementById('weatherForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const isNameMode = document.getElementById('nameMode').checked;
    const isCoordinateMode = document.getElementById('coordinateMode').checked;
    const location = document.getElementById('locationSelect').value;
    const latitude = document.getElementById('latitudeInput').value;
    const longitude = document.getElementById('longitudeInput').value;
    const seasonElement = document.getElementById('season');
    const seasonImage = document.getElementById('seasonImage');


    seasonElement.textContent = '';
    seasonImage.style.display = 'none';
    seasonImage.src = '';

    try {
        let apiUrl;

        if (isCoordinateMode && latitude && longitude) {
            apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max&timezone=auto`;
        } else if (isNameMode && location) {
            
            const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/search?q=${location}&format=json&limit=1`);
            const geocodeData = await geocodeResponse.json();
            if (geocodeData.length === 0) throw new Error('Location not found.');
            const { lat, lon } = geocodeData[0];
            apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&timezone=auto`;
        } else {
            throw new Error('Please select a mode and provide the required inputs.');
        }

      
        const response = await fetch(apiUrl);
        const data = await response.json();

        
        const maxTemp = data.daily.temperature_2m_max[0];
        let season = '';
        let imageSrc = '';

        if (maxTemp > 30) {
            season = 'Summer';
            imageSrc ="./img/sun.jpg"; 
        } else if (maxTemp > 20) {
            season = 'Spring';
            imageSrc = './img/spring.jpg'; 
        } else if (maxTemp > 10) {
            season = 'Autumn';
            imageSrc = './img/autumn.jpg';
        } else {
            season = 'Winter';
            imageSrc = './img/winter.jpg'; 
        }

    
        seasonElement.textContent = `Season: ${season}`;
        seasonImage.src = imageSrc;
        seasonImage.style.display = 'block';
    } catch (error) {
        seasonElement.textContent = error.message;
    }
});
